'use strict'

window.addEventListener('load', setupAnimation, false)

var gl,
  rainingRect,
  scoreDisplay,
  missesDisplay

function setupAnimation (e) {
  window.removeEventListener(e.type, setupAnimation, false)
  if (!(gl = getRenderingContext())) {
    return
  }

  gl.enable(gl.SCISSOR_TEST)

  rainingRect = new Rectangle()
  window.requestAnimationFrame(drawAnimation)
  var canvas = document.querySelector('canvas')
  canvas.addEventListener('click', playerClick, false)
  canvas.addEventListener('mousemove', mouseOver, false)

  var displays = document.querySelectorAll('strong')
  scoreDisplay = displays[0]
  missesDisplay = displays[1]
}

var score = 0,
  misses = 0

function drawAnimation () {
  gl.scissor(rainingRect.position[0], rainingRect.position[1],
    rainingRect.size[0], rainingRect.size[1])

  gl.clear(gl.COLOR_BUFFER_BIT)

  rainingRect.position[1] -= rainingRect.velocity

  if (rainingRect.position[1] < 0) {
    misses += 1
    missesDisplay.innerHTML = misses
    rainingRect = new Rectangle()
  }

  window.requestAnimationFrame(drawAnimation)
}

function playerClick (e) {
  if (rainingRect.hitTest(e)) {
    score += 1
    scoreDisplay.innerHTML = score
    rainingRect = new Rectangle()
  }
}

function mouseOver (e) {
  console.log('mouse', rainingRect.hitTest(e))
  rainingRect.drawColor(rainingRect.hitTest(e))
}

function Rectangle () {
  var rect = this

  var randNums = getRandomVector()
  rect.size = [
    5 + 120 * randNums[0],
    5 + 120 * randNums[1]
  ]

  rect.position = [
    randNums[2] * (gl.drawingBufferWidth - rect.size[0]),
    gl.drawingBufferHeight
  ]

  rect.velocity = 1 + 6 * Math.random()
  rect.color = getRandomColor()
  rect.highlightColor = rect.color.map(lightenColor)

  function getRandomVector () {
    return [Math.random(), Math.random(), Math.random(), Math.random()]
  }

  function lightenColor (x) {
    return (x + 1) / 2
  }

  rect.hitTest = function (e) {
    var position = [
      e.pageX - e.target.offsetLeft,
      gl.drawingBufferHeight - (e.pageY - e.target.offsetTop)
    ]

    var diffPos = [
      position[0] - rainingRect.position[0],
      position[1] - rainingRect.position[1]
    ]

    return (diffPos[0] >= 0 && diffPos[0] < rainingRect.size[0] && diffPos[1] >= 0 && diffPos[1] < rainingRect.size[1])
  }

  rect.drawColor = function (highlight) {
    var color = highlight ? rect.highlightColor : rect.color
    gl.clearColor(color[0], color[1], color[2], 1)
  }
  rect.drawColor(false)
}