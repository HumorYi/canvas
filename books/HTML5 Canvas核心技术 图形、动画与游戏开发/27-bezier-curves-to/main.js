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
const endPoints = [
  { x: 130, y: 70 },
  { x: 430, y: 270 }
]
const controlPoints = [
  { x: 130, y: 250 },
  { x: 450, y: 70 }
]

const drawBezierCurve = () => {
  context.strokeStyle = 'blue'
  context.fillStyle = 'yellow'

  context.beginPath()

  context.moveTo(endPoints[0].x, endPoints[0].y)
  context.bezierCurveTo(
    controlPoints[0].x, controlPoints[0].y,
    controlPoints[1].x, controlPoints[1].y,
    endPoints[1].x, endPoints[1].y
  )

  context.stroke()
}

const drawPoints = (points, radius = 5) => {
  points.forEach(point => {
    context.beginPath()
    context.arc(point.x, point.y, radius, 0, Math.PI * 2, false)
    context.stroke()
    context.fill()
  })
}

const drawEndPoints = () => {
  context.strokeStyle = 'blue'
  context.fillStyle = 'red'
  drawPoints(endPoints)
}

const drawControlPoints = () => {
  context.strokeStyle = 'yellow'
  context.fillStyle = 'blue'
  drawPoints(controlPoints)
}

const draw = () => {
  drawControlPoints()
  drawEndPoints()
  drawBezierCurve()
}

drawGrid(context)
draw()