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
let paused = true
let frameCount = 0
let lastTime = 0
let lastFpsUpdateTime = 0
let lastFpsUpdate = 0


const drawFps = () => {
  let now = new Date().getTime()
  let fps = calculateFps()

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

const drawDisc = (context, disc) => {
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

const timeBasedMotionHandle = (discs, checked) => {
  if (checked) {
    discs.forEach(discs => {
      discs.velocityX *= 50
      discs.velocityY *= 50
    })
    return
  }

  discs.forEach(discs => {
    discs.velocityX /= 50
    discs.velocityY /= 50
  })
}

const update = (discs, context, width, height) => {
  discs.forEach(disc => {
    if (disc.x + disc.velocityX + disc.radius > width || disc.x + disc.velocityX - disc.radius < 0)
      disc.velocityX = -disc.velocityX

    if (disc.y + disc.velocityY + disc.radius > height || disc.y + disc.velocityY - disc.radius < 0)
      disc.velocityY = -disc.velocityY

    disc.x += disc.velocityX
    disc.y += disc.velocityY

    drawDisc(context, disc)
  })
}