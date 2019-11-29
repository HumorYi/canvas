/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 贝塞尔曲线
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */
class BezierCurves {
  constructor(
    endPoints = [{ x: 0, y: 0 }, { x: 0, y: 0 }],
    controlPoints = [{ x: 0, y: 0 }, { x: 0, y: 0 }],
    controlPointRadius = 5,
    controlPointStrokeStyle = 'blue',
    controlPointFillStyle = 'rgba(255, 255, 0, 0.5)',
    endPointRadius = controlPointRadius,
    endPointStrokeStyle = 'navy',
    endPointFillStyle = 'rgba(0, 255, 0, 0.5)'
  ) {
    this.endPoints = endPoints
    this.controlPoints = controlPoints
    this.controlPointRadius = controlPointRadius
    this.controlPointStrokeStyle = controlPointStrokeStyle
    this.controlPointFillStyle = controlPointFillStyle
    this.endPointRadius = endPointRadius
    this.endPointStrokeStyle = endPointStrokeStyle
    this.endPointFillStyle = endPointFillStyle
  }

  drawBezierCurve(context, strokeStyle) {
    context.beginPath()

    if (strokeStyle) {
      context.strokeStyle = strokeStyle
    }

    context.moveTo(this.endPoints[0].x, this.endPoints[0].y)
    context.bezierCurveTo(
      this.controlPoints[0].x, this.controlPoints[0].y,
      this.controlPoints[1].x, this.controlPoints[1].y,
      this.endPoints[1].x, this.endPoints[1].y
    )

    context.stroke()
  }

  drawPoint(context, point, radius, strokeStyle, fillStyle) {
    context.save()
    context.beginPath()

    context.arc(point.x, point.y, radius, 0, Math.PI * 2, false)

    context.strokeStyle = strokeStyle
    context.fillStyle = fillStyle

    context.stroke()
    context.fill()

    context.restore()
  }

  drawControlPoints(context) {
    this.controlPoints.forEach(point => {
      this.drawPoint(context, point, this.controlPointRadius, this.controlPointStrokeStyle, this.controlPointFillStyle)
    })
  }

  drawEndPoints(context) {
    this.endPoints.forEach(point => {
      this.drawPoint(context, point, this.endPointRadius, this.endPointStrokeStyle, this.endPointFillStyle)
    })
  }

  drawControlAndEndPoints(context) {
    this.drawControlPoints(context)
    this.drawEndPoints(context)
  }

  updateEndAndControlPoints(rubberbandRect) {
    this.endPoints[0].x = rubberbandRect.left
    this.endPoints[0].y = rubberbandRect.top

    this.endPoints[1].x = rubberbandRect.left + rubberbandRect.width
    this.endPoints[1].y = rubberbandRect.top + rubberbandRect.height

    this.controlPoints[0].x = rubberbandRect.left
    this.controlPoints[0].y = rubberbandRect.top + rubberbandRect.height

    this.controlPoints[1].x = rubberbandRect.left + rubberbandRect.width
    this.controlPoints[1].y = rubberbandRect.top
  }

  cursorInEndPoint(context, x, y) {
    let pt

    this.endPoints.forEach(point => {
      context.beginPath()
      context.arc(point.x, point.y, this.endPointRadius, 0, Math.PI * 2, false)

      if (context.isPointInPath(x, y)) {
        pt = point
        return
      }
    })
    return pt
  }

  cursorInControlPoint(context, x, y) {
    let pt

    this.controlPoints.forEach(point => {
      context.beginPath()
      context.arc(point.x, point.y, this.controlPointRadius, 0, Math.PI * 2, false)

      if (context.isPointInPath(x, y)) {
        pt = point
        return
      }
    })

    return pt
  }
}