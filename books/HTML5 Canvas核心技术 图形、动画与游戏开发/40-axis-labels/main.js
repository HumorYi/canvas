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

const HORIZONTAL_AXIS_MARGIN = 50
const VERTICAL_AXIS_MARGIN = 50

const AXIS_ORIGIN = {
  x: HORIZONTAL_AXIS_MARGIN,
  y: height - VERTICAL_AXIS_MARGIN
}

const AXIS_TOP = VERTICAL_AXIS_MARGIN
const AXIS_RIGHT = width - HORIZONTAL_AXIS_MARGIN

const AXIS_LINEWIDTH = 1.0
const AXIS_COLOR = 'blue'

const HORIZONTAL_TICK_SPACING = 10
const VERTICAL_TICK_SPACING = 10

const AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x
const AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP

const NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING
const NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING

const TICK_WIDTH = 10
const TICKS_LINEWIDTH = 0.5
const TICKS_COLOR = 'navy'

const SPACE_BETWEEN_LABELS_AND_AXIS = 20


context.font = '13px Arial'

drawGrid(context)

context.shadowColor = 'rgba(100, 140, 230, 0.8)'
context.shadowOffsetX = 3
context.shadowOffsetY = 3
context.shadowBlur = 5

drawAxis(
  context,
  AXIS_COLOR,
  AXIS_LINEWIDTH,
  TICKS_LINEWIDTH,
  TICKS_COLOR, AXIS_ORIGIN,
  AXIS_RIGHT, AXIS_TOP,
  NUM_HORIZONTAL_TICKS,
  NUM_VERTICAL_TICKS,
  TICK_WIDTH,
  HORIZONTAL_TICK_SPACING,
  VERTICAL_TICK_SPACING
)

drawAxisLabels(
  context,
  AXIS_ORIGIN,
  NUM_HORIZONTAL_TICKS,
  NUM_VERTICAL_TICKS,
  HORIZONTAL_TICK_SPACING,
  VERTICAL_TICK_SPACING,
  SPACE_BETWEEN_LABELS_AND_AXIS
)
