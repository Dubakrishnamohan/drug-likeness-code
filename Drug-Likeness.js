<script>
/* CURSOR */
const cur=document.getElementById('cur'),curT=document.getElementById('curT');
let mx=0,my=0,tx=0,ty=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function animC(){
  cur.style.transform=`translate(${mx-3}px,${my-3}px)`;
  tx+=(mx-tx)*.12; ty+=(my-ty)*.12;
  curT.style.transform=`translate(${tx-22}px,${ty-22}px)`;
  requestAnimationFrame(animC);
})();

/* BACKGROUND PARTICLE NETWORK */
const bgC=document.getElementById('bgC'),bgX=bgC.getContext('2d');
let W,H;
function rz(){W=bgC.width=window.innerWidth;H=bgC.height=window.innerHeight}
rz(); window.addEventListener('resize',rz);
const pts=[];
for(let i=0;i<100;i++) pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.5+.5,a:Math.random()*.4+.15,hue:Math.random()<.7?170:200});
(function drawBg(){
  bgX.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>W) p.vx*=-1;
    if(p.y<0||p.y>H) p.vy*=-1;
    bgX.beginPath(); bgX.arc(p.x,p.y,p.r,0,Math.PI*2);
    bgX.fillStyle=`hsla(${p.hue},100%,65%,${p.a})`; bgX.fill();
  });
  for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
    const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
    if(d<140){bgX.beginPath();bgX.moveTo(pts[i].x,pts[i].y);bgX.lineTo(pts[j].x,pts[j].y);bgX.strokeStyle=`rgba(7,255,180,${(1-d/140)*.08})`;bgX.lineWidth=1;bgX.stroke()}
  }
  requestAnimationFrame(drawBg);
})();

/* 3D MOLECULE */
const hMol=document.getElementById('heroMol'),hCtx=hMol.getContext('2d');
hMol.width=520; hMol.height=520;
const CX=260,CY=260;
const atoms=[
  {x:0,y:0,z:0,e:'C',c:'#07ffb4'},{x:1.5,y:0,z:0,e:'C',c:'#07ffb4'},
  {x:2.2,y:1.2,z:.3,e:'C',c:'#07ffb4'},{x:1.5,y:2.4,z:.5,e:'C',c:'#07ffb4'},
  {x:0,y:2.4,z:.4,e:'C',c:'#07ffb4'},{x:-.7,y:1.2,z:.2,e:'C',c:'#07ffb4'},
  {x:2.3,y:-1,z:-.3,e:'O',c:'#ff5555'},{x:3.8,y:-1.2,z:-.5,e:'C',c:'#07ffb4'},
  {x:4.5,y:-.2,z:0,e:'O',c:'#ff5555'},{x:-2.2,y:1.2,z:.3,e:'C',c:'#07ffb4'},
  {x:-3,y:2.3,z:.8,e:'O',c:'#ff5555'},{x:-3,y:.2,z:-.2,e:'O',c:'#ff5555'},
];
const bonds=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,6],[6,7],[7,8],[5,9],[9,10],[9,11]];
let rotY=0,rotX=.3;
(function drawMol(){
  hCtx.clearRect(0,0,520,520);
  const ry=rotY,rx=rotX;
  const cosY=Math.cos(ry),sinY=Math.sin(ry),cosX=Math.cos(rx),sinX=Math.sin(rx);
  const scale=55;
  const proj=atoms.map(a=>{
    const cx=a.x-1,cy=a.y-1.2,cz=a.z;
    const x1=cx*cosY-cz*sinY,z1=cx*sinY+cz*cosY;
    const y1=cy*cosX-z1*sinX,z2=cy*sinX+z1*cosX;
    const fov=8/(8+z2);
    return{sx:CX+x1*scale*fov,sy:CY+y1*scale*fov,z:z2,e:a.e,c:a.c,fov};
  });
  bonds.forEach(([i,j])=>{
    const a=proj[i],b=proj[j];
    hCtx.beginPath();hCtx.moveTo(a.sx,a.sy);hCtx.lineTo(b.sx,b.sy);
    hCtx.strokeStyle=`rgba(7,220,160,0.5)`;hCtx.lineWidth=2;hCtx.stroke();
  });
  [...proj].sort((a,b)=>a.z-b.z).forEach(p=>{
    const r=(p.e==='C'?10:9)*p.fov*1.4;
    const alpha=Math.max(.3,Math.min(1,1-p.z*.15));
    const grd=hCtx.createRadialGradient(p.sx-r*.3,p.sy-r*.3,0,p.sx,p.sy,r*2);
    grd.addColorStop(0,'rgba(255,255,255,.5)');grd.addColorStop(.4,p.c);grd.addColorStop(1,'rgba(0,0,0,.4)');
    hCtx.beginPath();hCtx.arc(p.sx,p.sy,r,0,Math.PI*2);hCtx.fillStyle=grd;hCtx.globalAlpha=alpha;hCtx.fill();
    const glw=hCtx.createRadialGradient(p.sx,p.sy,r*.5,p.sx,p.sy,r*2.5);
    glw.addColorStop(0,p.c+'55');glw.addColorStop(1,'transparent');
    hCtx.beginPath();hCtx.arc(p.sx,p.sy,r*2.5,0,Math.PI*2);hCtx.fillStyle=glw;hCtx.fill();
    hCtx.globalAlpha=1;
    if(r>6){hCtx.fillStyle='rgba(255,255,255,.9)';hCtx.font=`bold ${Math.max(8,r*.9)}px JetBrains Mono,monospace`;hCtx.textAlign='center';hCtx.textBaseline='middle';hCtx.fillText(p.e,p.sx,p.sy)}
  });
  rotY+=.008; rotX=.3+Math.sin(Date.now()*.0005)*.15;
  requestAnimationFrame(drawMol);
})();

/* SCROLL REVEAL */
const allR=document.querySelectorAll('.reveal,.reveal-l,.reveal-r');
new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{if(e.isIntersecting) setTimeout(()=>e.target.classList.add('vis'),i*70)});
},{threshold:.1}).observe=((obs)=>{allR.forEach(r=>obs.observe(r));return obs})(new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{if(e.isIntersecting) setTimeout(()=>e.target.classList.add('vis'),i*70)});
},{threshold:.1}));

/* RESULT BARS */
new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.querySelectorAll('.rc-bar-fill').forEach(b=>setTimeout(()=>b.style.width=b.dataset.w,400))});
},{threshold:.3}).observe(document.querySelector('.result-cards')||document.body);

/* COUNTER */
function countUp(el,target){let v=0;const s=()=>{v+=target/50;if(v<target){el.textContent=Math.floor(v);requestAnimationFrame(s)}else el.textContent=target};s()}
new IntersectionObserver(e=>{if(e[0].isIntersecting){document.querySelectorAll('[data-target]').forEach(el=>countUp(el,+el.dataset.target))}},{threshold:.5}).observe(document.querySelector('.stats-section'));

/* FIX REVEAL - simple approach */
document.addEventListener('scroll',()=>{
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight*.9) el.classList.add('vis');
  });
},{passive:true});
setTimeout(()=>document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>{
  const r=el.getBoundingClientRect();
  if(r.top<window.innerHeight) el.classList.add('vis');
}),100);
</script>