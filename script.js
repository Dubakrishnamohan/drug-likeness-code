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
    `translate(${mx-3}px,${my-3}px)`;

  tx += (mx - tx) * .12;
  ty += (my - ty) * .12;

  curT.style.transform =
    `translate(${tx-22}px,${ty-22}px)`;

  requestAnimationFrame(animateCursor);

})();

/* BACKGROUND PARTICLES */

const bgC = document.getElementById('bgC');
const bgX = bgC.getContext('2d');

let W, H;

function resizeCanvas(){
  W = bgC.width = window.innerWidth;
  H = bgC.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const pts = [];

for(let i=0; i<100; i++){

  pts.push({
    x:Math.random()*W,
    y:Math.random()*H,

    vx:(Math.random()-.5)*.35,
    vy:(Math.random()-.5)*.35,

    r:Math.random()*1.5+.5,
    a:Math.random()*.4+.15,

    hue:Math.random()<.7 ? 170 : 200
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

    bgX.arc(
      p.x,
      p.y,
      p.r,
      0,
      Math.PI*2
    );

    bgX.fillStyle =
      `hsla(${p.hue},100%,65%,${p.a})`;

    bgX.fill();

  });

  requestAnimationFrame(drawBg);

})();

/* 3D MOLECULE */

const hMol = document.getElementById('heroMol');
const hCtx = hMol.getContext('2d');

hMol.width = 520;
hMol.height = 520;

const CX = 260;
const CY = 260;

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

  const scale = 60;

  atoms.forEach(atom => {

    const x =
      atom.x * cosY -
      atom.z * sinY;

    const z =
      atom.x * sinY +
      atom.z * cosY;

    const fov = 8/(8+z);

    const sx = CX + x * scale * fov;
    const sy = CY + atom.y * scale * fov;

    const r = 10 * fov;

    hCtx.beginPath();

    hCtx.arc(
      sx,
      sy,
      r,
      0,
      Math.PI*2
    );

    hCtx.fillStyle = atom.c;
    hCtx.fill();

  });

  rotY += .01;

  requestAnimationFrame(drawMol);

})(); 