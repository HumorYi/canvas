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

const ARROW_MARGIN = 30
const POINT_RADIUS = 7
const points = [
  {
    x: canvas.width - ARROW_MARGIN,
    y: canvas.height - ARROW_MARGIN
  },

  {
    x: canvas.width - ARROW_MARGIN * 2,
    y: canvas.height - ARROW_MARGIN
  },

  {
    x: POINT_RADIUS,
    y: canvas.height / 2
  },

  {
    x: ARROW_MARGIN,
    y: canvas.height / 2 - ARROW_MARGIN
  },

  {
    x: canvas.width - ARROW_MARGIN,
    y: ARROW_MARGIN
  },

  {
    x: canvas.width - ARROW_MARGIN,
    y: ARROW_MARGIN * 2
  }
]

const drawPoint = (x, y, strokeStyle, fillStyle, lineWidth = 0.5) => {
  context.beginPath()

  context.strokeStyle = strokeStyle
  context.fillStyle = fillStyle
  context.lineWidth = lineWidth

  context.arc(x, y, POINT_RADIUS, 0, Math.PI * 2, false)

  context.stroke()
  context.fill()
}

const drawBezierPoints = () => {
  const strokeStyles = ['white', 'blue']
  const fillStyles = ['blue', 'white']

  for (let i = 0, len = points.length; i < len; ++i) {
    drawPoint(points[i].x, points[i].y, strokeStyles[i % 2], fillStyles[i % 2]);
  }
}

const drawArrow = () => {
  context.strokeStyle = 'white'
  context.fillStyle = 'cornflowerblue'

  context.moveTo(canvas.width - ARROW_MARGIN,
    ARROW_MARGIN * 2)

  context.lineTo(canvas.width - ARROW_MARGIN,
    canvas.height - ARROW_MARGIN * 2)

  context.quadraticCurveTo(points[0].x, points[0].y,
    points[1].x, points[1].y)

  context.lineTo(ARROW_MARGIN,
    canvas.height / 2 + ARROW_MARGIN)

  context.quadraticCurveTo(points[2].x, points[2].y,
    points[3].x, points[3].y)

  context.lineTo(canvas.width - ARROW_MARGIN * 2,
    ARROW_MARGIN)

  context.quadraticCurveTo(points[4].x, points[4].y,
    points[5].x, points[5].y)

  context.stroke()
  context.fill()

}

drawArrow()
drawBezierPoints()