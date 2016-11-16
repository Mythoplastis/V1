/* global requestAnimationFrame */

window.onload = function() {
  var canvas = document.querySelector("#canvas");
  var context = canvas.getContext("2d");
  var width  = canvas.width = window.innerWidth;
  var height  = canvas.height = window.innerHeight;

  var spacing = 50;
  var radius = Math.min(width, height);
  var mouseX = width / 2;
  var mouseY = height / 2;

  function clear(context, width, height) {
    context.clearRect(0, 0, width, height);
  }

  function drawArrow(context, x, y, angle, color) {
    context.save();
    
    context.translate(x, y);
    context.rotate(angle);

    context.beginPath();
    context.moveTo(20, 0);
    context.lineTo(-20, 0);
    context.moveTo(20, 0);
    context.lineTo(10, -10);
    context.moveTo(20, 0);
    context.lineTo(10, 10);

    context.lineWidth = 3;
    context.strokeStyle = color;
    context.stroke();
    
    context.restore();
  }

  function getColor(dx, dy) {
    var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    var alpha = 1 - (dist / radius);
    return "rgba(0,0,0," + Math.max(0.2, alpha) + ")";
  }

  function render() {
    clear(context, width, height);

    for(var arrowX = 0; arrowX < width; arrowX += spacing) {
      for(var arrowY = 0; arrowY < height; arrowY += spacing) {
        var dx = mouseX - arrowX;
        var dy = mouseY - arrowY;
        var angle = Math.atan2(dy, dx);
        var color = getColor(dx, dy);
        drawArrow(context, arrowX, arrowY, angle, color);
      }
    }

    requestAnimationFrame(render);
  }
  render();

  document.addEventListener("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, false);

  document.addEventListener("touchmove", function(e) {
    var touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
  });

};