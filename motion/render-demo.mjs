import {execFileSync} from 'node:child_process';
for (const phase of ['context','search','verify','results']) {
 for (const layout of ['desktop','mobile']) {
  const id=`${phase}-${layout}`;
  execFileSync('npx',['remotion','still','src/index.ts',id,`../dist/assets/demo-${id}.jpg`,'--frame=95'],{stdio:'inherit'});
  execFileSync('npx',['remotion','render','src/index.ts',id,`../dist/assets/demo-${id}.mp4`,'--codec=h264','--crf=23','--concurrency=2'],{stdio:'inherit'});
 }
}
