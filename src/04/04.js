window.addEventListener('load', function setupWebGL (e) {
  'use strict'
  window.removeEventListener(e.type, setupWebGL, false);

  var canvas = document.querySelector('canvas');

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  gl.enable(gl.SCISSOR_TEST);
  gl.scissor(40, 20, 60, 120);

  gl.clearColor(1, 1, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}, false)