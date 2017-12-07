window.addEventListener('load', function setupWebGL(e) {
  'use strict';

  window.removeEventListener(e.type, setupWebGL, false);

  var canvas = document.querySelector('#canvas-view');
  var button = document.querySelector('#color-switcher');
  canvas.addEventListener('click', switchColor, false);
  button.addEventListener('click', switchColor, false);

  var gl;

  function switchColor() {
    if (!gl) {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        paragraph.innerHTML = 'Failed to get WebGL context.';
      }
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    var color = getRandomColor();

    gl.clearColor(color.r, color.g, color.b, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  function getRandomColor() {
    return {
      r: Math.random(),
      g: Math.random(),
      b: Math.random()
    }
  }
}, false);