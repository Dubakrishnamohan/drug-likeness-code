/* =========================
   CURSOR
========================= */

const cur = document.getElementById('cur');
const curT = document.getElementById('curT');

let mx = 0;
let my = 0;

let tx = 0;
let ty = 0;

document.addEventListener('mousemove', (e) => {
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

/* =========================
   BACKGROUND PARTICLES
========================= */

const bgC = document.getElementById('bgC');
const bgX = bgC.getContext('2d');

let W;
let H;

function resizeCanvas(){

  W = bgC.width = window.innerWidth;
  H = bgC.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const particles = [];

for(let i = 0; i < 100; i++){

  particles.push({

    x: Math.random() * W,
    y: Math.random() * H,

    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,

    r: Math.random() * 1.5 + 0.5,

    a: Math.random() * 0.4 + 0.15,

    hue: Math.random() < 0.7 ? 170 : 200

  });

}

(function drawBackground(){

  bgX.clearRect(0, 0, W, H);

  particles.forEach((p) => {

    p.x += p.vx;
    p.y += p.vy;

    if(p.x < 0 || p.x > W) p.vx *= -1;
    if(p.y < 0 || p.y > H) p.vy *= -1;

    bgX.beginPath();

    bgX.arc(
      p.x,
      p.y,
      p.r,
      0,
      Math.PI * 2
    );

    bgX.fillStyle =
      `hsla(${p.hue},100%,65%,${p.a})`;

    bgX.fill();

  });

  for(let i = 0; i < particles.length; i++){

    for(let j = i + 1; j < particles.length; j++){

      const d = Math.hypot(
        particles[i].x - particles[j].x,
        particles[i].y - particles[j].y
      );

      if(d < 140){

        bgX.beginPath();

        bgX.moveTo(
          particles[i].x,
          particles[i].y
        );

        bgX.lineTo(
          particles[j].x,
          particles[j].y
        );

        bgX.strokeStyle =
          `rgba(7,255,180,${(1 - d / 140) * 0.08})`;

        bgX.lineWidth = 1;

        bgX.stroke();

      }

    }

  }

  requestAnimationFrame(drawBackground);

})();

/* =========================
   3D MOLECULE
========================= */

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
  {x:1.5,y:2.4,z:.5,e:'C',c:'#07ffb4'},
  {x:0,y:2.4,z:.4,e:'C',c:'#07ffb4'},
  {x:-.7,y:1.2,z:.2,e:'C',c:'#07ffb4'},

  {x:2.3,y:-1,z:-.3,e:'O',c:'#ff5555'},
  {x:3.8,y:-1.2,z:-.5,e:'C',c:'#07ffb4'},
  {x:4.5,y:-.2,z:0,e:'O',c:'#ff5555'},

  {x:-2.2,y:1.2,z:.3,e:'C',c:'#07ffb4'},
  {x:-3,y:2.3,z:.8,e:'O',c:'#ff5555'},
  {x:-3,y:.2,z:-.2,e:'O',c:'#ff5555'}

];

const bonds = [

  [0,1],
  [1,2],
  [2,3],
  [3,4],
  [4,5],
  [5,0],

  [1,6],
  [6,7],
  [7,8],

  [5,9],
  [9,10],
  [9,11]

];

let rotY = 0;
let rotX = 0.3;

(function drawMolecule(){

  hCtx.clearRect(0,0,520,520);

  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);

  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);

  const scale = 55;

  const projected = atoms.map((a) => {

    const cx = a.x - 1;
    const cy = a.y - 1.2;
    const cz = a.z;

    const x1 = cx * cosY - cz * sinY;
    const z1 = cx * sinY + cz * cosY;

    const y1 = cy * cosX - z1 * sinX;
    const z2 = cy * sinX + z1 * cosX;

    const fov = 8 / (8 + z2);

    return {

      sx: CX + x1 * scale * fov,
      sy: CY + y1 * scale * fov,

      z: z2,

      e: a.e,
      c: a.c,

      fov

    };

  });

  bonds.forEach(([i, j]) => {

    const a = projected[i];
    const b = projected[j];

    hCtx.beginPath();

    hCtx.moveTo(a.sx, a.sy);
    hCtx.lineTo(b.sx, b.sy);

    hCtx.strokeStyle =
      'rgba(7,220,160,0.5)';

    hCtx.lineWidth = 2;

    hCtx.stroke();

  });

  [...projected]
    .sort((a,b) => a.z - b.z)
    .forEach((p) => {

      const r =
        (p.e === 'C' ? 10 : 9)
        * p.fov * 1.4;

      const grd =
        hCtx.createRadialGradient(
          p.sx - r * .3,
          p.sy - r * .3,
          0,
          p.sx,
          p.sy,
          r * 2
        );

      grd.addColorStop(
        0,
        'rgba(255,255,255,.5)'
      );

      grd.addColorStop(
        .4,
        p.c
      );

      grd.addColorStop(
        1,
        'rgba(0,0,0,.4)'
      );

      hCtx.beginPath();

      hCtx.arc(
        p.sx,
        p.sy,
        r,
        0,
        Math.PI * 2
      );

      hCtx.fillStyle = grd;
      hCtx.fill();

      hCtx.fillStyle =
        'rgba(255,255,255,.9)';

      hCtx.font =
        `bold ${Math.max(8, r*.9)}px JetBrains Mono`;

      hCtx.textAlign = 'center';
      hCtx.textBaseline = 'middle';

      hCtx.fillText(
        p.e,
        p.sx,
        p.sy
      );

    });

  rotY += 0.008;

  rotX =
    0.3 +
    Math.sin(Date.now() * 0.0005) * 0.15;

  requestAnimationFrame(drawMolecule);

})();

/* =========================
   REVEAL ANIMATION
========================= */

const reveals =
  document.querySelectorAll(
    '.reveal,.reveal-l,.reveal-r'
  );

function revealOnScroll(){

  reveals.forEach((el) => {

    const rect =
      el.getBoundingClientRect();

    if(rect.top < window.innerHeight * 0.9){

      el.classList.add('vis');

    }

  });

}

window.addEventListener(
  'scroll',
  revealOnScroll,
  { passive:true }
);

revealOnScroll();

/* =========================
   COUNTER
========================= */

function countUp(el, target){

  let value = 0;

  function update(){

    value += target / 50;

    if(value < target){

      el.textContent =
        Math.floor(value);

      requestAnimationFrame(update);

    }else{

      el.textContent = target;

    }

  }

  update();

}

const statsSection =
  document.querySelector('.stats-section');

if(statsSection){

  const statsObserver =
    new IntersectionObserver((entries) => {

      if(entries[0].isIntersecting){

        document
          .querySelectorAll('[data-target]')
          .forEach((el) => {

            countUp(
              el,
              +el.dataset.target
            );

          });

      }

    }, { threshold:0.5 });

  statsObserver.observe(statsSection);

}

/* =========================
   RESULT BARS
========================= */

const resultCards =
  document.querySelector('.result-cards');

if(resultCards){

  const barsObserver =
    new IntersectionObserver((entries) => {

      entries.forEach((e) => {

        if(e.isIntersecting){

          e.target
            .querySelectorAll('.rc-bar-fill')
            .forEach((bar) => {

              setTimeout(() => {

                bar.style.width =
                  bar.dataset.w;

              }, 400);

            });

        }

      });

    }, { threshold:0.3 });

  barsObserver.observe(resultCards);

}