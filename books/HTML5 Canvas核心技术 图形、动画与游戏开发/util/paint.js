/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 画图
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */
class Paint {
  constructor(canvas, strokeStyle, fillStyle, stroked, filled, guidewired = true, guidewiresStrokeStyle = 'rgba(0,0,230,0.4)', guidewiresLineWidth = 0.5) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height

    this.drawingSurfaceImageData = null
    this.mousedown = {
      x: 0,
      y: 0
    }
    this.rubberbandRect = {
      x: 0,
      y: 0,
      left: 0,
      top: 0
    }

    this.strokeStyle = strokeStyle
    this.fillStyle = fillStyle
    this.stroked = stroked
    this.filled = filled

    this.guidewired = guidewired
    this.guidewiresStrokeStyle = guidewiresStrokeStyle
    this.guidewiresLineWidth = guidewiresLineWidth
  }

  saveDrawingSurface() {
    this.drawingSurfaceImageData = this.context.getImageData(0, 0, this.width, this.height)
  }

  restoreDrawingSurface() {
    this.context.putImageData(this.drawingSurfaceImageData, 0, 0)
  }

  updateRubberbandRectangle(x, y) {
    this.rubberbandRect.width = Math.abs(x - this.mousedown.x)
    this.rubberbandRect.height = Math.abs(y - this.mousedown.y)
    this.rubberbandRect.left = x > this.mousedown.x ? this.mousedown.x : x
    this.rubberbandRect.top = y > this.mousedown.y ? this.mousedown.y : y
  }

  drawRubberbandShape(draw) {
    this.context.save()

    draw && draw()

    this.context.strokeStyle = this.strokeStyle
    this.context.fillStyle = this.fillStyle

    this.stroked && this.context.stroke()
    this.filled && this.context.fill()

    this.context.restore()
  }

  updateRubberband(x, y, draw) {
    this.updateRubberbandRectangle(x, y)
    this.drawRubberbandShape(draw)
  }

  drawHorizontalLine(y) {
    this.context.beginPath()

    this.context.moveTo(0, y + 0.5)
    this.context.lineTo(this.width, y + 0.5)

    this.context.stroke()
  }

  drawVerticalLine(x) {
    this.context.beginPath()

    this.context.moveTo(x + 0.5, 0)
    this.context.lineTo(x + 0.5, this.height)

    this.context.stroke()
  }

  drawGuidewires(x, y) {
    if (!this.guidewired) { return }

    this.context.save()

    this.context.strokeStyle = this.guidewiresStrokeStyle
    this.context.lineWidth = this.guidewiresLineWidth

    this.drawVerticalLine(x)
    this.drawHorizontalLine(y)

    this.context.restore()
  }

  updateMousedown(x, y) {
    this.mousedown.x = x
    this.mousedown.y = y
  }

  updateStrokeStyle(val) {
    this.strokeStyle = val
  }

  updateFillStyle(val) {
    this.fillStyle = val
  }

  updateStroked(val) {
    this.stroked = val
  }

  updateFilled(val) {
    this.filled = val
  }

  updateGuidewired(val) {
    this.guidewired = val
  }

  updateGuidewiresStrokeStyle(val) {
    this.guidewiresStrokeStyle = val
  }

  updateGuidewiresLineWidth(val) {
    this.guidewiresLineWidth = val
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  mousedownEvent(x, y) {
    paint.saveDrawingSurface()
    paint.updateMousedown(x, y)
  }

  mousemoveEvent(x, y, draw) {
    this.restoreDrawingSurface()
    this.updateRubberband(x, y, draw)
    this.drawGuidewires(this.mousedown.x, this.mousedown.y)
  }

  mouseupEvent(x, y, draw) {
    paint.restoreDrawingSurface()
    paint.updateRubberband(x, y, draw)
  }
}