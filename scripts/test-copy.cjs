// Execute the actual event handlers against denied, missing, and successful clipboard APIs.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {test} = require('node:test');
const code = fs.readFileSync(new URL('../dist/app.js', `file://${__filename}`), 'utf8');
function setup(mode, noSelection=false) {
  const statuses = {'hero-copy-status':{},'copy-status':{}};
  let copied, focused=false, scrolled=false, selected=false;
  const buttons=Object.keys(statuses).map((id,i)=>({hidden:true,dataset:{copyStatus:id},innerHTML:`Copy ${i}`,addEventListener(_,fn){this.click=fn;}}));
  const prompt={textContent:'  public prompt\nwith all lines  ',focus(){focused=true;},scrollIntoView(){scrolled=true;}};
  const navigator=mode==='missing'?{}:{clipboard:{writeText:async text=>{if(mode==='denied')throw new Error('Denied');copied=text;}}};
  const selection=noSelection?null:{removeAllRanges(){},addRange(){selected=true;}};
  vm.runInNewContext(code, {document:{querySelector:()=>prompt,querySelectorAll:()=>buttons,getElementById:id=>statuses[id],createRange:()=>({selectNodeContents(){}})},navigator,window:{getSelection:()=>selection},setTimeout:()=>1,clearTimeout(){}});
  return {buttons,statuses,read:()=>({copied,focused,scrolled,selected})};
}
for(const i of [0,1])test(`copy action ${i+1} copies the complete prompt`,async()=>{
  const x=setup('success');let prevented=false;await x.buttons[i].click({preventDefault(){prevented=true;}});
  assert(prevented);assert.equal(x.buttons[i].hidden,false);assert.equal(x.read().copied,'public prompt\nwith all lines');assert.match(x.buttons[i].textContent,/Copied/);
});
for(const mode of ['denied','missing'])test(`${mode} clipboard makes the manual fallback reachable`,async()=>{
  const x=setup(mode);await x.buttons[0].click({preventDefault(){}});const state=x.read();
  assert(state.focused && state.scrolled && state.selected);assert.equal(state.copied,undefined);assert.match(x.statuses['copy-status'].textContent,/download/);
});
test('fallback remains useful when text selection is unavailable',async()=>{
  const x=setup('denied',true);await x.buttons[1].click({preventDefault(){}});assert(x.read().focused);assert.match(x.statuses['copy-status'].textContent,/download/);
});
