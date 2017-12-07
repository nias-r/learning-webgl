window.addEventListener('load', function setupWebGL(e) {
  'use strict';

  window.removeEventListener(e.type, setupWebGL, false);

  var timer;
  var button = document.querySelector('#animation-onoff');
  var verb = document.querySelector('strong');

  function startAnimation(e) {
    button.removeEventListener(e.type, startAnimation, false);
    button.addEventListener('click', stopAnimation, false);
    verb.innerHTML = 'stop';
    timer = setInterval(drawAnimation, 1000);
    drawAnimation();
  }

  function stopAnimation(e) {
    button.removeEventListener(e.type, stopAnimation, false);
    button.addEventListener('click', startAnimation, false);
    verb.innerHTML = 'start';
    clearInterval(timer);
  }

  stopAnimation({type: 'click'});
  var gl;

  function drawAnimation() {
    if (!gl) {
      var canvas = document.querySelector('#canvas-view');
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        paragraph.innerHTML = 'Failed to get WebGL context.';
      }
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    var color = getRandomColor();
    gl.clearColor(color.r, color.g, color.b, 1);
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