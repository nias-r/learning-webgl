'use strict';
window.addEventListener('load', setupAnimation, false);

var gl,
  color = getRandomColor(),
  position;

function setupAnimation(e) {
  window.removeEventListener(e.type, setupAnimation, false);

  if (!(gl = getRenderingContext())) {
    return;
  }

  gl.enable(gl.SCISSOR_TEST);
  gl.clearColor(color[0], color[1], color[2], 1);

  position = [0, gl.drawingBufferHeight];

  var button = document.querySelector('button');
  var timer;

  function startAnimation(e) {
    button.removeEventListener(e.type, startAnimation, false);
    button.addEventListener('click', stopAnimation, false);
    timer = setInterval(drawAnimation, 17);
    drawAnimation();
  }

  function stopAnimation(e) {
    button.removeEventListener(e.type, stopAnimation, false);
    button.addEventListener('click', startAnimation, false);
    clearInterval(timer);
  }

  stopAnimation({type: 'click'});
}

var size = [60, 60];
var velocity = 3.0;

function drawAnimation() {
  gl.scissor(position[0], position[1], size[0], size[1]);
  gl.clear(gl.COLOR_BUFFER_BIT);

  position[1] -= velocity;

  if (position[1] < 0) {
    position = [
      Math.random() * (gl.drawingBufferWidth - size[0]),
      gl.drawingBufferHeight
    ];
    velocity = 1.0 + 6.0 * Math.random();
    color = getRandomColor();
    gl.clearColor(color[0], color[1], color[2], 1.0);

  }
}