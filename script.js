/* CURSOR */

const cur = document.getElementById('cur');
const curT = document.getElementById('curT');

let mx = 0;
let my = 0;

let tx = 0;
let ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function animateCursor(){

  cur.style.transform =
    `translate(${mx - 3}px, ${my - 3}px)`;

  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;

  curT.style.transform =
    `translate(${tx - 22}px, ${ty - 22}px)`;

  requestAnimationFrame(animateCursor);

})();

/* BACKGROUND PARTICLES */

const bgC = document.getElementById('bgC');
const bgX = bgC.getContext('2d');

let W,H;

function resizeCanvas(){
  W = bgC.width = window.innerWidth;
  H = bgC.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const pts = [];

for(let i=0;i<100;i++){

  pts.push({
    x:Math.random()*W,
    y:Math.random()*H,
    vx:(Math.random()-.5)*.35,
    vy:(Math.random()-.5)*.35,
    r:Math.random()*1.5+.5,
    a:Math.random()*.4+.15
  });

}

(function drawBg(){

  bgX.clearRect(0,0,W,H);

  pts.forEach(p=>{

    p.x += p.vx;
    p.y += p.vy;

    if(p.x<0 || p.x>W) p.vx *= -1;
    if(p.y<0 || p.y>H) p.vy *= -1;

    bgX.beginPath();

    bgX.arc(p.x,p.y,p.r,0,Math.PI*2);

    bgX.fillStyle = `rgba(7,255,180,${p.a})`;

    bgX.fill();

  });

  requestAnimationFrame(drawBg);

})();

/* 3D MOLECULE */

const hMol = document.getElementById('heroMol');
const hCtx = hMol.getContext('2d');

const mobile = window.innerWidth < 768;

hMol.width = mobile ? 260 : 520;
hMol.height = mobile ? 260 : 520;

const CX = hMol.width / 2;
const CY = hMol.height / 2;

const atoms = [
  {x:0,y:0,z:0,e:'C',c:'#07ffb4'},
  {x:1.5,y:0,z:0,e:'C',c:'#07ffb4'},
  {x:2.2,y:1.2,z:.3,e:'C',c:'#07ffb4'},
  {x:1.5,y:2.4,z:.5,e:'C',c:'#07ffb4'}
];

let rotY = 0;

(function drawMol(){

  hCtx.clearRect(0,0,520,520);

  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);

  const scale = 55;

  const proj = atoms.map(a=>{

    const x1 = a.x*cosY - a.z*sinY;
    const z1 = a.x*sinY + a.z*cosY;

    const fov = 8/(8+z1);

    return{
      sx:CX+x1*scale*fov,
      sy:CY+a.y*scale*fov,
      e:a.e,
      c:a.c
    };

  });

  proj.forEach(p=>{

    hCtx.beginPath();

    hCtx.arc(p.sx,p.sy,12,0,Math.PI*2);

    hCtx.fillStyle = p.c;

    hCtx.fill();

  });

  rotY += 0.01;

  requestAnimationFrame(drawMol);

})();