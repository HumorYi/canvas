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

const CENTROID_RADIUS = 10
const CENTROID_STROKE_STYLE = 'rgba(0, 0, 0, 0.5)'
const CENTROID_FILL_STYLE = 'rgba(80, 190, 240, 0.6)'

const circle = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 200
}

const TEXT_FILL_STYLE = 'rgba(100, 130, 240, 0.5)'
const TEXT_STROKE_STYLE = 'rgba(200, 0, 0, 0.7)'
const FONT = '64px Lucida Sans'
const text = "Clockwise around the circle"
const startAngle = Math.PI * 2
const endAngle = Math.PI / 8

context.shadowColor = 'rgba(0, 0, 0, 0.4)'
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.shadowBlur = 5

context.textAlign = 'center'
context.textBaseline = 'middle'

drawGrid(context)

drawCentroid(
  context,
  circle.x,
  circle.y,
  CENTROID_RADIUS,
  CENTROID_STROKE_STYLE,
  CENTROID_FILL_STYLE
)

drawCircularText(
  context,
  circle.x,
  circle.y,
  circle.radius,
  text,
  startAngle,
  endAngle,
  TEXT_FILL_STYLE,
  TEXT_STROKE_STYLE,
  FONT
)