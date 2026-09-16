const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const code=fs.readFileSync(path.join(__dirname,'../dist/motion.js'),'utf8');
function setup({reduced=false,saveData=false}={}){
 const handlers={}, events={};let observer,plays=0,pauses=0,disconnected=false;
 const preference={matches:reduced,addEventListener:(_,fn)=>events.preference=fn};
 const video={dataset:{src:'assets/research-flow.mp4'},poster:'assets/research-flow.jpg',paused:true,ended:false,parentElement:{style:{}},addEventListener:(name,fn)=>handlers[name]=fn,play(){plays++;this.paused=false;handlers.play();return Promise.resolve();},pause(){pauses++;this.paused=true;handlers.pause();}};
 const button={hidden:true,setAttribute(name,value){this[name]=value;},addEventListener:(_,fn)=>events.click=fn};
 vm.runInNewContext(code,{document:{getElementById:id=>id==='research-motion'?video:button},window:{matchMedia:()=>preference},navigator:{connection:{saveData}},IntersectionObserver:class{constructor(fn){observer=fn;}observe(){}disconnect(){disconnected=true;}}});
 return {video,button,events,preference,handlers,visible(){observer([{isIntersecting:true}]);},state:()=>({plays,pauses,disconnected,observing:!!observer})};
}
for(const options of [{reduced:true},{saveData:true}])test(`poster-only by default for ${JSON.stringify(options)}`,()=>{const x=setup(options);assert.equal(x.video.src,undefined);assert.equal(x.state().observing,false);assert.equal(x.button.hidden,false);});
test('animation waits until visible then plays once',()=>{const x=setup();assert.equal(x.video.src,undefined);x.visible();assert.equal(x.state().plays,1);assert(x.state().disconnected);assert.equal(x.video.src,'assets/research-flow.mp4');assert.match(x.button['aria-label'],/Pause/);});
test('explicit play and pause work with reduced motion',()=>{const x=setup({reduced:true});x.events.click();assert.equal(x.state().plays,1);x.events.click();assert.equal(x.state().pauses,1);});
test('enabling reduced motion pauses active playback',()=>{const x=setup();x.visible();x.preference.matches=true;x.events.preference();assert(x.video.paused);});
test('failed media preserves poster and removes broken control',()=>{const x=setup();x.handlers.error();assert(x.video.hidden);assert(x.button.hidden);assert.match(x.video.parentElement.style.backgroundImage,/research-flow.jpg/);});
