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

const rect = (x, y, w, h, direction) => {
  if (direction) {
    context.moveTo(x, y)
    context.lineTo(x, y + h)
    context.lineTo(x + w, y + h)
    context.lineTo(x + w, y)
  } else {
    context.moveTo(x, y)
    context.lineTo(x + w, y)
    context.lineTo(x + w, y + h)
    context.lineTo(x, y + h)
  }

  context.closePath()
}

const addOuterRectanglePath = () => context.rect(110, 25, 370, 335)

const addCirclePath = () => context.arc(300, 300, 40, 0, Math.PI * 2, true)

const addRectanglePath = () => rect(310, 55, 70, 35, true)

const addTrianglePath = () => {
  context.moveTo(400, 200)
  context.lineTo(250, 115)
  context.lineTo(200, 200)
  context.closePath()
}

const drawCutouts = () => {
  context.beginPath()

  addOuterRectanglePath()
  addCirclePath()
  addRectanglePath()
  addTrianglePath()

  context.fill()
}

const strokeCutoutShapes = () => {
  context.save()

  context.strokeStyle = 'rgba(0,0,0,0.7)'

  context.beginPath()
  addOuterRectanglePath()
  context.stroke()

  context.beginPath()
  addCirclePath()
  addRectanglePath()
  addTrianglePath()
  context.stroke()

  context.restore()
}

const draw = () => {
  context.clearRect(0, 0, width, height)

  drawGrid(context)

  context.save()

  context.shadowColor = 'rgba(200, 200, 0, 0.5)'
  context.shadowOffsetX = 12
  context.shadowOffsetY = 12
  context.shadowBlur = 15

  drawCutouts()
  strokeCutoutShapes()

  context.restore()
}

context.fillStyle = 'goldenrod'
draw()
