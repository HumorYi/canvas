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

const drawOwnText = context => drawText(context, 'HTML5', 20, 250)

const setClippingRegion = (context, radius) => {
  context.beginPath()
  context.arc(width / 2, height / 2, radius, 0, Math.PI * 2, false)
  context.clip()
}

const fillCanvas = (context, color) => {
  context.fillStyle = color
  context.fillRect(0, 0, width, height)
}

const endAnimation = (context, loop) => {
  clearInterval(loop)

  setTimeout(() => {
    context.clearRect(0, 0, width, height)
    drawOwnText(context)
  }, 1000)
}

const drawAnimationFrame = (context, radius) => {
  setClippingRegion(context, radius)
  fillCanvas(context, 'lightgray')
  drawOwnText(context)
}

const animate = context => {
  let radius = width / 2
  let loop = setInterval(() => {
    fillCanvas(context, 'charcoal')

    radius -= width / 100

    if (radius > 0) {
      context.save()
      drawAnimationFrame(context, radius)
      context.restore()
    }
    else {
      endAnimation(context, loop)
    }
  }, 16)
}

canvas.onmousedown = () => animate(context)


context.lineWidth = 0.5
context.font = '128pt Comic-sans'
drawOwnText(context)