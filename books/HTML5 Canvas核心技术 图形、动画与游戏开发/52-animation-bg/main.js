/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 入口文件
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
const animateButton = document.getElementById('animateButton')
const sky = new Image()
const SKY_VELOCITY = 30

let paused = true
let lastTime = 0
let lastFpsUpdateTime = 0
let lastFpsUpdate = 0
let fps = 0
let skyOffset = 0

const draw = () => {
  context.save()

  skyOffset = skyOffset < width ? skyOffset + SKY_VELOCITY / fps : 0

  context.save()
  context.translate(-skyOffset, 0)

  context.drawImage(sky, 0, 0)
  context.drawImage(sky, sky.width - 2, 0)

  context.restore()
}

const animate = (time) => {
  if (time === undefined) {
    time = new Date().getTime()
  }

  fps = calculateFps(time, lastTime)
  lastTime = time

  if (paused) {
    return
  }

  context.clearRect(0, 0, width, height)
  draw()

  window.requestNextAnimationFrame(animate)
}

animateButton.onclick = () => {
  paused = !paused

  if (paused) {
    animateButton.value = 'Animate'
  } else {
    window.requestNextAnimationFrame(animate)
    animateButton.value = 'Pause'
  }
}

sky.src = '../shared/images/sky.png'
sky.onload = function(e) {
  draw()
}

requestNextAnimationFrame(animate)
