var partNum = 750;
//particle number - change it!

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function between(min, max) {
  return Math.random() * (max - min) + min;
}

var istruehover = true;

var c = document.getElementById('c');
var ctx = c.getContext('2d');
//context and id of canvas

var w = window.innerWidth;
var h = window.innerHeight;
//width and height of canvas

c.width = w;
c.height = h;
//setting the width and height for canvas

var mouse = {
  x: w / 2, 
  y: h / 2
};
//mouse position

document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY;
  
  	istruehover = false;
}, false);

document.addEventListener('mouseover', function(){ 
  	istruehover = false;
}, false);
//finding the mouse position

var particles = [];
for(var x = 0; x < c.width / 80; x++) {
  for(var y = 0; y < c.height / 80; y++) {
    particles.push(new particle(x*80, y*80));
  }
}
    
//the particle function
function particle(x, y) {
  this.x = x + 40;
  this.y = y + 20;
  //setting the mouse position to the particle x and y
  
  this.vx = 0;
  this.vy = 0;
  
  this.r = 40;
  //random radius
  
  var one = 'rgba(84, 88, 88, 0.7)';
  var two = 'rgba(183, 163, 29, 0.7)';
  var colors = [one, two];
  this.color = colors[Math.round(Math.random() * 2)];
  //only random colors of the variables
}

function draw() {
  requestAnimFrame(draw);
  var img=document.getElementById("lamp");
  var pat=ctx.createPattern(img,"repeat");
  ctx.fillStyle = pat;
  // ctx.fillStyle = 'rgba(52, 52, 53, 0.75)';
  ctx.fillRect(0, 0, c.width, c.height);
  
  for(t = 0; t < particles.length; t++) {
    var p = particles[t];
    
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
    ctx.fill();
    //the context of the particle(s)
    
    var dist,
		dx = mouse.x - p.x,
		dy = mouse.y - p.y;
	
		dist = Math.sqrt(dx*dx + dy*dy);
			
  	var change = p.r - dist / 3; 
    
    p.r -= change / 7.5;
    
    if(p.r > 83) {
      p.r = 83;
    }
  }
  // alert('end');
}

draw();

function mousemove() {
  if(istruehover) {
    mouse.x = Math.random() * w;
  	mouse.y = Math.random() * h;
  }
}

setInterval(mousemove, 1000)