const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particle = [];
let adjustX=10;
let adjustY=10;

const mouse = {
  x: null,
  y: null,
  radius: 150
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  // console.log(mouse.x,mouse.y);
});
  console.log(canvas.width,canvas.height);

ctx.fillStyle = "white";
ctx.font ="3vw Verdana";
ctx.fillText("Ankan", 0, 25);
const textcoordinates = ctx.getImageData(0, 0, 100, 100);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forcedirectionX = dx / distance;
    let forcedirectionY = dy / distance;
    let maxdistance=mouse.radius;
    let force=(maxdistance-distance)/ maxdistance;
    let directionX=forcedirectionX*force*this.density;
    let directionY=forcedirectionY*force*this.density;
    if (distance < mouse.radius) {
      this.x=this.x-directionX;
      this.y=this.y-directionY;
    } else {
      if(this.x!== this.baseX){
        let dx=this.x-this.baseX;
        this.x-=dx/10;
      }
      if(this.y!==this.baseY){
        let dy=this.y-this.baseY;
        this.y-=dy/10;
      }
    }
  }
}

function init() {
  particle = [];
  for(let y=0,y2=textcoordinates.height;y<y2;y++){
    for(let x=0,x2=textcoordinates.width;x<x2;x++){
      if(textcoordinates.data[(y*4*textcoordinates.width)+(x*4)+3]>128){
        let positionX=x+adjustX;
        let positionY=y+adjustY;
        particle.push(new Particle(positionX*10,positionY*10));
      }
    }
  }
}
init();
// console.log(particle);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particle.length; i++) {
    particle[i].draw();
    particle[i].update();
  }
  requestAnimationFrame(animate);
}

animate();
