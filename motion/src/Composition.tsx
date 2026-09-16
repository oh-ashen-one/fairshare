import React from 'react';
import {AbsoluteFill, Composition, Img, interpolate, useCurrentFrame, staticFile, Easing} from 'remotion';

export const ResearchFlow: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background:'#edf3ff',fontFamily:'Arial, sans-serif',color:'#14213d'}}>
    <Img src={staticFile('research-lens.webp')} style={{position:'absolute',width:800,height:534,top:-8,objectFit:'cover',scale:interpolate(frame,[0,143],[1.035,1],{extrapolateRight:'clamp',easing:Easing.bezier(.2,.8,.2,1)})}}/>
    <div style={{position:'absolute',left:48,right:48,bottom:44,display:'flex',gap:16}}>
      {['Your context','Official sources','Your shortlist'].map((label,i)=><div key={label} style={{flex:1,background:'rgba(255,255,255,.96)',border:'1px solid #dbe4f5',borderRadius:20,padding:'24px 12px',textAlign:'center',opacity:interpolate(frame,[i*25,i*25+18],[.34,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:`0 ${interpolate(frame,[i*25,i*25+20],[8,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}px`}}>
        <div style={{width:34,height:34,margin:'0 auto 16px',borderRadius:50,background:frame>i*25+18?'#285beb':'#e7edfc',color:frame>i*25+18?'white':'#607394',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:700}}>{frame>i*25+18?'✓':i+1}</div>
        <div style={{fontSize:23,fontWeight:600,letterSpacing:-.4}}>{label}</div>
      </div>)}
    </div>
  </AbsoluteFill>;
};
export const MyComposition = () => <Composition id="ResearchFlow" component={ResearchFlow} durationInFrames={144} fps={30} width={800} height={680}/>;
