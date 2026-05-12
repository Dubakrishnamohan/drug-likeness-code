const particlesCanvas = document.getElementById('particles');
const ctx = particlesCanvas.getContext('2d');

let w,h;

function resize(){
  w = particlesCanvas.width = window.innerWidth;
  h = particlesCanvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize',resize);

const particles = [];

for(let i=0;i<80;i++){
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


const predictBtn = document.getElementById('predictBtn');

predictBtn.addEventListener('click', async ()=>{

const smiles = document.getElementById('smilesInput').value;

if(!smiles){
alert('Please enter SMILES string');
return;
}

// BACKEND API CALL
// Replace this URL with your Flask/FastAPI endpoint

try{

const response = await fetch('http://127.0.0.1:5000/predict',{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify({smiles})
});

const data = await response.json();

// OUTPUT UPDATE

document.getElementById('mw').textContent = data.molecular_weight;
document.getElementById('logp').textContent = data.logP;
document.getElementById('hbd').textContent = data.hbd;
document.getElementById('hba').textContent = data.hba;
document.getElementById('qed').textContent = data.qed_score;
document.getElementById('status').textContent = data.drug_like ? 'Drug-Like ✓' : 'Not Drug-Like ✗';

}
catch(err){
console.log(err);
alert('Backend not connected');
}

});