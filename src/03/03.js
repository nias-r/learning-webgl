window.addEventListener('load', function setupWebGL (e) {
  'use strict'

  window.removeEventListener(e.type, setupWebGL, false);

  var canvas = document.querySelector('canvas');
  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  var timer = setInterval(drawAnimation, 1000);

  var mask = [true, true, true];
  var redToggle = document.querySelector('#red-toggle');
  var greenToggle = document.querySelector('#green-toggle');
  var blueToggle = document.querySelector('#blue-toggle');

  redToggle.addEventListener('click', setColorMask, false);
  greenToggle.addEventListener('click', setColorMask, false);
  blueToggle.addEventListener('click', setColorMask, false);

  function setColorMask(e) {
    var index = e.target === greenToggle && 1 || e.target === blueToggle && 2 || 0;
    mask[index] = !mask[index];
    if (mask[index]) {
      e.target.innerHTML = 'On';
    } else {
      e.target.innerHTML = 'Off';
    }
    gl.colorMask(mask[0], mask[1], mask[2], true);
    drawAnimation();
  }

  function drawAnimation() {
    gl.clearColor(Math.random(), Math.random(), Math.random(), 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}, false)