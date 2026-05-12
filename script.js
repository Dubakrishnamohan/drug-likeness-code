const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let w,h;

function resize(){
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;
}

resize();

window.addEventListener('resize',resize);

const particles = [];

for(let i=0;i<90;i++){

particles.push({
x:Math.random()*w,
y:Math.random()*h,
r:Math.random()*2,
dx:(Math.random()-.5)*0.5,
dy:(Math.random()-.5)*0.5
});

}

function animate(){

ctx.clearRect(0,0,w,h);

particles.forEach(p=>{

p.x += p.dx;
p.y += p.dy;

if(p.x<0 || p.x>w) p.dx*=-1;
if(p.y<0 || p.y>h) p.dy*=-1;

ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fillStyle='rgba(0,255,225,.7)';
ctx.fill();

});

requestAnimationFrame(animate);

}

animate();