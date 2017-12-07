window.addEventListener('load', function setupWebGL(e) {
  'use strict';

  window.removeEventListener(e.type, setupWebGL, false);

  var paragraph = document.querySelector('p');
  var canvas =  document.querySelector('canvas');

  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    paragraph.innerHTML = 'Failed to get WebGL context.';
  }

  paragraph.innerHTML = 'Your browser supports WebGL.';

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  gl.clearColor(0.0, 0.5, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);
}, false);