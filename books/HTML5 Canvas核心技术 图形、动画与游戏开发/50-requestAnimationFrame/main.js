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
const discs = [
  {
    x: 150,
    y: 250,
    lastX: 150,
    lastY: 250,
    velocityX: -3.2,
    velocityY: 3.5,
    radius: 25,
    innerColor: 'rgba(0,255,255,0.3)',
    middleColor: 'rgba(0,255,255,0.9)',
    outerColor: 'rgba(0,255,255,0.3)',
    strokeStyle: 'slateblue'
  },
  {
    x: 50,
    y: 150,
    lastX: 50,
    lastY: 150,
    velocityX: 2.2,
    velocityY: 2.5,
    radius: 25,
    innerColor: 'rgba(225,225,225,0.1)',
    middleColor: 'rgba(225,225,225,0.9)',
    outerColor: 'rgba(225,225,225,0.3)',
    strokeStyle: 'gray'
  },
  {
    x: 150,
    y: 75,
    lastX: 150,
    lastY: 75,
    velocityX: 1.2,
    velocityY: 1.5,
    radius: 25,
    innerColor: 'orange',
    middleColor: 'yellow',
    outerColor: 'gold',
    strokeStyle: 'orange'
  }
]
const animateButton = document.getElementById('animateButton')

let paused = true
let frameCount = 0
let lastTime = 0
let lastFpsUpdateTime = 0
let lastFpsUpdate = 0

const drawFps = () => {
  let now = new Date().getTime()
  let fps = calculateFps(now, lastTime)
  lastTime = now

  // if (frameCount === 0) {
  //   console.profile('COREHTML5 Animation, basic')
  // } else if (frameCount === 100) {
  //   console.profileEnd()
  //   frameCount = -1
  // }

  if (frameCount === 100) {
    frameCount = -1
  }

  if (frameCount !== -1 && frameCount < 100) {
    frameCount++
  }

  if (now - lastFpsUpdateTime > 1000) {
    lastFpsUpdateTime = now
    lastFpsUpdate = fps
  }

  context.fillStyle = 'cornflowerblue'
  context.fillText(lastFpsUpdate.toFixed() + ' fps', 45, 50)
}

/**
 * 圆球运动轨迹和边界控制
 */
const update = () => {
  discs.forEach(disc => {
    if (disc.x + disc.velocityX + disc.radius > width || disc.x + disc.velocityX - disc.radius < 0) {
      disc.velocityX = -disc.velocityX
    }

    if (disc.y + disc.velocityY + disc.radius > height || disc.y + disc.velocityY - disc.radius < 0) {
      disc.velocityY = -disc.velocityY
    }

    disc.x += disc.velocityX
    disc.y += disc.velocityY

    disc.lastX = disc.x
    disc.lastY = disc.y

    drawDisc(disc)
  })
}

const drawDisc = disc => {
  let gradient = context.createRadialGradient(disc.x, disc.y, 0, disc.x, disc.y, disc.radius)

  gradient.addColorStop(0.3, disc.innerColor)
  gradient.addColorStop(0.5, disc.middleColor)
  gradient.addColorStop(1.0, disc.outerColor)

  context.save()

  context.beginPath()

  context.arc(disc.x, disc.y, disc.radius, 0, Math.PI * 2, false)
  context.fillStyle = gradient
  context.strokeStyle = disc.strokeStyle
  context.fill()

  context.stroke()

  context.restore()
}

const animate = () => {
  if (paused) {
    return
  }

  drawBackground(context, width, height)
  update()
  drawFps()

  window.requestNextAnimationFrame(animate)
}

context.font = '48px Helvetica'

animateButton.onclick = () => {
  paused = !paused

  if (paused) {
    animateButton.value = 'Animate'
  } else {
    window.requestNextAnimationFrame(animate)
    animateButton.value = 'Pause'
  }
}
