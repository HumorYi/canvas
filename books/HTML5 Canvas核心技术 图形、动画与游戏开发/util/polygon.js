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
    let startAngle = this.startAngle

    for (let i = 0; i < this.sides; i++) {
      points.push(new Point(this.x + this.radius * Math.cos(startAngle), this.y - this.radius * Math.sin(startAngle)))

      startAngle += delta
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

  draw(context) {
    context.save()

    this.createPath(context)

    context.strokeStyle = this.strokeStyle
    context.fillStyle = this.fillStyle

    this.stroked && context.stroke()
    this.filled && context.fill()

    context.restore()
  }

  move(x, y) {
    this.x = x
    this.y = y
  }
}