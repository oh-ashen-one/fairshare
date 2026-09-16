const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const code=fs.readFileSync(path.join(__dirname,'../dist/motion.js'),'utf8');
function setup({reduced=false,saveData=false,blocked=false}={}){
 const handlers={},events={};let observer,plays=0,pauses=0;
 const preference={matches:reduced,addEventListener:(_,fn)=>events.preference=fn};
 const video={dataset:{src:'assets/research-flow.mp4'},poster:'assets/research-flow.jpg',paused:true,parentElement:{style:{}},addEventListener:(name,fn)=>handlers[name]=fn,play(){plays++;if(blocked)return Promise.reject(new Error('Autoplay denied'));this.paused=false;handlers.playing();return Promise.resolve();},pause(){pauses++;this.paused=true;handlers.pause();}};
 const button={hidden:true,setAttribute(name,value){this[name]=value;},addEventListener:(_,fn)=>events.click=fn};
 const overlay={hidden:true,addEventListener:(_,fn)=>events.overlay=fn};
 const doc={hidden:false,getElementById:id=>({'research-motion':video,'motion-toggle':button,'motion-overlay':overlay}[id]),addEventListener:(_,fn)=>events.visibility=fn};
 class Observer{constructor(fn){observer=fn;}observe(){}}
 vm.runInNewContext(code,{document:doc,window:{matchMedia:()=>preference,IntersectionObserver:Observer},navigator:{connection:{saveData}},IntersectionObserver:Observer});
 return {video,button,overlay,doc,events,preference,handlers,visible(ratio=1){observer([{isIntersecting:ratio>0,intersectionRatio:ratio}]);},state:()=>({plays,pauses})};
}
for(const options of [{reduced:true},{saveData:true}])test(`poster and explicit play for ${JSON.stringify(options)}`,()=>{const x=setup(options);x.visible();assert.equal(x.video.src,undefined);assert.equal(x.overlay.hidden,false);assert.equal(x.button.hidden,false);});
test('waits for half visibility and loops muted inline',()=>{const x=setup();x.visible(.3);assert.equal(x.video.src,undefined);x.visible(.5);assert.equal(x.state().plays,1);assert(x.video.loop&&x.video.muted&&x.video.defaultMuted&&x.video.playsInline);assert(x.overlay.hidden);});
test('pauses offscreen and resumes when visible',()=>{const x=setup();x.visible();x.visible(0);assert(x.video.paused);x.visible();assert.equal(x.state().plays,2);});
test('manual pause survives leaving and returning',()=>{const x=setup();x.visible();x.events.click();x.visible(0);x.visible();assert.equal(x.state().plays,1);assert(x.video.paused);x.events.overlay();assert.equal(x.state().plays,2);});
test('explicit play works with reduced motion',()=>{const x=setup({reduced:true});x.visible();x.events.overlay();assert.equal(x.state().plays,1);assert(x.overlay.hidden);});
test('blocked autoplay exposes the large play affordance',async()=>{const x=setup({blocked:true});x.visible();await Promise.resolve();assert.equal(x.overlay.hidden,false);assert.match(x.button.textContent,/Play animation/);});
test('preference change pauses active playback',()=>{const x=setup();x.visible();x.preference.matches=true;x.events.preference();assert(x.video.paused);});
test('background tab pauses and foreground resumes',()=>{const x=setup();x.visible();x.doc.hidden=true;x.events.visibility();assert(x.video.paused);x.doc.hidden=false;x.events.visibility();assert.equal(x.state().plays,2);});
test('failed media preserves poster and explains failure',()=>{const x=setup();x.handlers.error();assert(x.video.hidden);assert(x.button.disabled);assert.match(x.button.textContent,/unavailable/);assert.match(x.video.parentElement.style.backgroundImage,/research-flow.jpg/);});
