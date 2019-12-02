/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 多边形
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Polygon {
  constructor(centerX, centerY, radius, sides, startAngle, strokeStyle, fillStyle, stroked, filled) {
    this.x = centerX
    this.y = centerY
    this.radius = radius
    this.sides = sides
    this.startAngle = startAngle
    this.strokeStyle = strokeStyle
    this.fillStyle = fillStyle
    this.stroked = stroked
    this.filled = filled
  }

  getPoint() {
    const points = []
    const delta = 2 * Math.PI / this.sides
    let angle = this.startAngle

    for (let i = 0; i < this.sides; i++) {
      points.push(new Point(this.x + this.radius * Math.sin(angle), this.y - this.radius * Math.cos(angle)))

      angle += delta
    }

    return points
  }

  createPath(context) {
    const points = this.getPoint()

    context.beginPath()

    context.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < this.sides; i++) {
      context.lineTo(points[i].x, points[i].y)
    }

    context.closePath()
  }

  draw(context, isTranslate, angle, strokeStyle, fillStyle) {
    const tx = this.x
    const ty = this.y

    context.save()

    if (isTranslate) {
      context.translate(tx, ty)
      this.x = 0
      this.y = 0
    }

    angle && context.rotate(angle)

    this.createPath(context)

    context.strokeStyle = strokeStyle || this.strokeStyle
    context.fillStyle = fillStyle || this.fillStyle

    this.stroked && context.stroke()
    this.filled && context.fill()

    context.restore()

    if (isTranslate) {
      this.x = tx
      this.y = ty
    }
  }

  move(x, y) {
    this.x = x
    this.y = y
  }
}