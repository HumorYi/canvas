/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 网格
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */
export default class Grid {
  constructor(context) {
    this.context = context
  }

  draw(color = "lightgray", stepx = 10, stepy = 10, fillStyle = "#fff", lineWidth = 0.5) {
    const context = this.context
    const width = context.canvas.width
    const height = context.canvas.height

    context.save()

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
      context.moveTo(0)
      context.lineTo(width, i)
      context.stroke()
    }

    context.restore()
  }
}