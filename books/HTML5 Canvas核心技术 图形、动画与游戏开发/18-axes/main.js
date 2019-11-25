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

const AXIS_MARGIN = 40
const AXIS_ORIGIN = { x: AXIS_MARGIN, y: canvas.height - AXIS_MARGIN }
const AXIS_TOP = AXIS_MARGIN
const AXIS_RIGHT = canvas.width - AXIS_MARGIN
const HORIZONTAL_TICK_SPACING = 10
const VERTICAL_TICK_SPACING = 10
const AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x
const AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP
const NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING
const NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING
const TICK_WIDTH = 10
const TICKS_LINEWIDTH = 0.5
const TICKS_COLOR = 'navy'
const AXIS_LINEWIDTH = 1.0
const AXIS_COLOR = 'blue'

const drawHorizontalAxis = () => {
  context.beginPath()
  context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y)
  context.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y)
  context.stroke()
}

const drawVerticalAxis = () => {
  context.beginPath()
  context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y)
  context.lineTo(AXIS_ORIGIN.x, AXIS_TOP)
  context.stroke()
}

const drawHorizontalAxisTicks = () => {
  let deltaY
  let x

  for (let i = 1; i < NUM_HORIZONTAL_TICKS; i++) {
    context.beginPath()

    deltaY = i % 5 === 0 ? TICK_WIDTH : TICK_WIDTH / 2
    x = AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING

    context.moveTo(x, AXIS_ORIGIN.y - deltaY)
    context.lineTo(x, AXIS_ORIGIN.y + deltaY)

    context.stroke()
  }
}

const drawVerticalAxisTicks = () => {
  let deltaX
  let y

  for (let i = 1; i < NUM_VERTICAL_TICKS; i++) {
    context.beginPath()

    deltaX = i % 5 === 0 ? TICK_WIDTH : TICK_WIDTH / 2
    y = AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING

    context.moveTo(AXIS_ORIGIN.x - deltaX, y)
    context.lineTo(AXIS_ORIGIN.x + deltaX, y)

    context.stroke()
  }
}

const drawAxes = () => {
  context.save()

  context.strokeStyle = AXIS_COLOR
  context.lineWidth = AXIS_LINEWIDTH

  drawHorizontalAxis()
  drawVerticalAxis()

  context.lineWidth = TICKS_LINEWIDTH
  context.strokeStyle = TICKS_COLOR

  drawHorizontalAxisTicks()
  drawVerticalAxisTicks()

  context.restore()
}

drawGrid(context)
drawAxes()
