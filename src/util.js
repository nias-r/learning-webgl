'use strict';

function getRenderingContext() {
  var canvas = document.querySelector('canvas');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    var paragraph = document.querySelector('p');
    paragraph.innerHTML = 'Failed to get WebGL context.';
    return null;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
}

function getRandomColor() {
  return [
    Math.random(),
    Math.random(),
    Math.random()
  ]
}