/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 工具
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */

const drawGrid = (context, color = "lightgray", stepx = 10, stepy = stepx, fillStyle = "#fff", lineWidth = 0.5) => {
  const width = context.canvas.width
  const height = context.canvas.height

  context.save()

  context.shadowColor = undefined
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0

  context.strokeStyle = color
  context.fillStyle = fillStyle
  context.lineWidth = lineWidth

  context.fillRect(0, 0, width, height)

  for (let i = stepx + 0.5; i < width; i += stepx) {
    context.beginPath()
    context.moveTo(i, 0)
    context.lineTo(i, height)
    context.stroke()
  }

  for (let i = stepy + 0.5; i < height; i += stepy) {
    context.beginPath()
    context.moveTo(0, i)
    context.lineTo(width, i)
    context.stroke()
  }

  context.restore()
}

const windowToCanvas = (canvas, x, y) => {
  let bbox = canvas.getBoundingClientRect()

  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  }
}