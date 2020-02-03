/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 工具
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */

const drawGrid = (context, color = 'lightgray', stepx = 10, stepy = stepx, fillStyle = '#fff', lineWidth = 0.5) => {
  const width = context.canvas.width
  const height = context.canvas.height

  context.save()

  context.shadowColor = undefined
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0

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
    context.moveTo(0, i)
    context.lineTo(width, i)
    context.stroke()
  }

  context.restore()
}

const windowToCanvas = (canvas, x, y) => {
  let bbox = canvas.getBoundingClientRect()

  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  }
}

const drawText = (
  context,
  text,
  x,
  y,
  textAlign,
  textBaseline,
  strokeStyle = 'yellow',
  fillStyle = 'cornflowerblue',
  shadowColor = 'rgba(100, 100, 150, 0.8)',
  shadowBlur = 10,
  shadowOffsetX = 5,
  shadowOffsetY = shadowOffsetX
) => {
  context.save()

  if (textAlign) {
    context.textAlign = textAlign
  }

  if (textBaseline) {
    context.textBaseline = textBaseline
  }

  context.shadowColor = shadowColor
  context.shadowOffsetX = shadowOffsetX
  context.shadowOffsetY = shadowOffsetY
  context.shadowBlur = shadowBlur

  context.strokeStyle = strokeStyle
  context.fillStyle = fillStyle

  context.strokeText(text, x, y)
  context.fillText(text, x, y)

  context.restore()
}

/* 画坐标轴 S */
const drawHorizontalAxis = (context, AXIS_ORIGIN, AXIS_RIGHT) => {
  context.beginPath()
  context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y)
  context.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y)
  context.stroke()
}

const drawVerticalAxis = (context, AXIS_ORIGIN, AXIS_TOP) => {
  context.beginPath()
  context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y)
  context.lineTo(AXIS_ORIGIN.x, AXIS_TOP)
  context.stroke()
}

const drawHorizontalAxisTicks = (context, NUM_HORIZONTAL_TICKS, TICK_WIDTH, AXIS_ORIGIN, HORIZONTAL_TICK_SPACING) => {
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

const drawVerticalAxisTicks = (context, NUM_VERTICAL_TICKS, TICK_WIDTH, AXIS_ORIGIN, VERTICAL_TICK_SPACING) => {
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

const drawAxis = (
  context,
  AXIS_COLOR,
  AXIS_LINEWIDTH,
  TICKS_LINEWIDTH,
  TICKS_COLOR,
  AXIS_ORIGIN,
  AXIS_RIGHT,
  AXIS_TOP,
  NUM_HORIZONTAL_TICKS,
  NUM_VERTICAL_TICKS,
  TICK_WIDTH,
  HORIZONTAL_TICK_SPACING,
  VERTICAL_TICK_SPACING
) => {
  context.save()

  context.strokeStyle = AXIS_COLOR
  context.lineWidth = AXIS_LINEWIDTH

  drawHorizontalAxis(context, AXIS_ORIGIN, AXIS_RIGHT)
  drawVerticalAxis(context, AXIS_ORIGIN, AXIS_TOP)

  context.lineWidth = TICKS_LINEWIDTH
  context.strokeStyle = TICKS_COLOR

  drawHorizontalAxisTicks(context, NUM_HORIZONTAL_TICKS, TICK_WIDTH, AXIS_ORIGIN, HORIZONTAL_TICK_SPACING)
  drawVerticalAxisTicks(context, NUM_VERTICAL_TICKS, TICK_WIDTH, AXIS_ORIGIN, VERTICAL_TICK_SPACING)

  context.restore()
}
/* 画坐标轴 E */

/* 画坐标轴文本 S */
const drawHorizontalAxisLabels = (
  context,
  AXIS_ORIGIN,
  NUM_HORIZONTAL_TICKS,
  HORIZONTAL_TICK_SPACING,
  SPACE_BETWEEN_LABELS_AND_AXIS,
  DELTA = 5,
  TEXT_ALIGN = 'center',
  TEXT_BASELINE = 'top'
) => {
  context.textAlign = TEXT_ALIGN
  context.textBaseline = TEXT_BASELINE
  let max = Math.floor(NUM_HORIZONTAL_TICKS / DELTA)

  for (let i = 0; i <= max; ++i) {
    context.fillText(
      i * DELTA,
      AXIS_ORIGIN.x + i * DELTA * HORIZONTAL_TICK_SPACING,
      AXIS_ORIGIN.y + SPACE_BETWEEN_LABELS_AND_AXIS
    )
  }
}

const drawVerticalAxisLabels = (
  context,
  AXIS_ORIGIN,
  NUM_VERTICAL_TICKS,
  VERTICAL_TICK_SPACING,
  SPACE_BETWEEN_LABELS_AND_AXIS,
  DELTA = 5,
  TEXT_ALIGN = 'right',
  TEXT_BASELINE = 'middle'
) => {
  context.textAlign = TEXT_ALIGN
  context.textBaseline = TEXT_BASELINE
  let max = Math.floor(NUM_VERTICAL_TICKS / DELTA)

  for (var i = 0; i <= max; ++i) {
    context.fillText(
      i * DELTA,
      AXIS_ORIGIN.x - SPACE_BETWEEN_LABELS_AND_AXIS,
      AXIS_ORIGIN.y - i * DELTA * VERTICAL_TICK_SPACING
    )
  }
}

const drawAxisLabels = (
  context,
  AXIS_ORIGIN,
  NUM_HORIZONTAL_TICKS,
  NUM_VERTICAL_TICKS,
  HORIZONTAL_TICK_SPACING,
  VERTICAL_TICK_SPACING,
  SPACE_BETWEEN_LABELS_AND_AXIS,
  DELTA_HORIZONTAL = 5,
  DELTA_VERTICAL = 5,
  TEXT_ALIGN_HORIZONTAL = 'center',
  TEXT_BASELINE_HORIZONTAL = 'top',
  TEXT_ALIGN_VERTICAL = 'right',
  TEXT_BASELINE_VERTICAL = 'middle',
  fillStyle = 'blue'
) => {
  context.fillStyle = fillStyle
  drawHorizontalAxisLabels(
    context,
    AXIS_ORIGIN,
    NUM_HORIZONTAL_TICKS,
    HORIZONTAL_TICK_SPACING,
    SPACE_BETWEEN_LABELS_AND_AXIS,
    DELTA_HORIZONTAL,
    TEXT_ALIGN_HORIZONTAL,
    TEXT_BASELINE_HORIZONTAL
  )
  drawVerticalAxisLabels(
    context,
    AXIS_ORIGIN,
    NUM_VERTICAL_TICKS,
    VERTICAL_TICK_SPACING,
    SPACE_BETWEEN_LABELS_AND_AXIS,
    DELTA_VERTICAL,
    TEXT_ALIGN_VERTICAL,
    TEXT_BASELINE_VERTICAL
  )
}
/* 画坐标轴文本 E */

/* 画圆点 S */
const drawCentroid = (
  context,
  x,
  y,
  radius = 10,
  strokeStyle = 'rgba(0, 0, 0, 0.5)',
  fillStyle = 'rgba(80, 190, 240, 0.6)'
) => {
  context.beginPath()

  context.save()

  if (strokeStyle) {
    context.strokeStyle = strokeStyle
  }

  if (fillStyle) {
    context.fillStyle = fillStyle
  }

  context.arc(x, y, radius, 0, Math.PI * 2, false)
  context.stroke()

  context.fill()

  context.restore()
}
/* 画圆点 E */

/* 画圆形文本 S */
const drawCircularText = (context, x, y, radius, text, startAngle, endAngle, fillStyle, strokeStyle, font) => {
  const textLen = text.length
  const angleDecrement = (startAngle - endAngle) / (textLen - 1)
  const baseRotate = Math.PI / 2

  let angle = parseFloat(startAngle)
  let index = 0

  context.save()

  context.fillStyle = fillStyle
  context.strokeStyle = strokeStyle
  context.font = font

  while (index < textLen) {
    context.save()
    context.beginPath()

    context.translate(x + Math.cos(angle) * radius, y - Math.sin(angle) * radius)

    context.rotate(baseRotate - angle)

    context.fillText(text[index], 0, 0)
    context.strokeText(text[index], 0, 0)

    angle -= angleDecrement
    index++

    context.restore()
  }

  context.restore()
}
/* 画圆形文本 E */

/* 画背景色 S */
const drawBackground = (
  context,
  width,
  height,
  horizontal_strokeStyle = 'lightgray',
  horizontal_lineWidth = 0.5,
  vertical_strokeStyle = 'rgba(100, 0, 0, 0.3)',
  vertical_lineWidth = 1
) => {
  const STEP_Y = 12
  const TOP_MARGIN = STEP_Y * 4
  const LEFT_MARGIN = STEP_Y * 3
  let i = height

  context.clearRect(0, 0, width, height)

  // Horizontal lines

  context.save()

  context.strokeStyle = horizontal_strokeStyle
  context.lineWidth = horizontal_lineWidth

  while (i > TOP_MARGIN) {
    context.beginPath()

    context.moveTo(0, i)
    context.lineTo(width, i)

    context.stroke()

    i -= STEP_Y
  }

  context.restore()

  // Vertical line

  context.save()

  context.strokeStyle = vertical_strokeStyle
  context.lineWidth = vertical_lineWidth

  context.beginPath()

  context.moveTo(LEFT_MARGIN, 0)
  context.lineTo(LEFT_MARGIN, height)
  context.stroke()

  context.restore()
}
/* 画背景色 E */

/* 画三角形 S */
const paintArrow = (thrustersContext, thrusters_width, thrusters_height, ARROW_MARGIN) => {
  const x = thrusters_width / 2 - ARROW_MARGIN / 2
  const y = thrusters_height - ARROW_MARGIN / 2

  thrustersContext.beginPath()

  thrustersContext.moveTo(x, ARROW_MARGIN / 2)

  thrustersContext.lineTo(x, thrusters_height - ARROW_MARGIN)

  thrustersContext.quadraticCurveTo(x, y, thrusters_width / 2 - ARROW_MARGIN, y)

  thrustersContext.lineTo(ARROW_MARGIN, thrusters_height / 2 + ARROW_MARGIN / 2)

  thrustersContext.quadraticCurveTo(
    ARROW_MARGIN - 3,
    thrusters_height / 2,
    ARROW_MARGIN,
    thrusters_height / 2 - ARROW_MARGIN / 2
  )

  thrustersContext.lineTo(thrusters_width / 2 - ARROW_MARGIN, ARROW_MARGIN / 2)

  thrustersContext.quadraticCurveTo(thrusters_width / 2 - ARROW_MARGIN, ARROW_MARGIN / 2, x, ARROW_MARGIN / 2)
  thrustersContext.fill()

  thrustersContext.stroke()
}
const paintLeftArrow = thrustersContext => paintArrow(thrustersContext, thrusters_width, thrusters_height, ARROW_MARGIN)
const paintRightArrow = (thrustersContext, thrusters_width, thrusters_height, ARROW_MARGIN) => {
  thrustersContext.save()

  thrustersContext.translate(thrusters_width, 0)
  thrustersContext.scale(-1, 1)

  paintArrow(thrustersContext, thrusters_width, thrusters_height, ARROW_MARGIN)

  thrustersContext.restore()
}
const paintThrusters = (
  thrustersContext,
  thrusters_width,
  thrusters_height,
  pushAnimationTimer,
  THRUSTER_FIRING_FILL_STYLE,
  THRUSTER_FILL_STYLE,
  ARROW_MARGIN,
  isArrowLeft
) => {
  thrustersContext.clearRect(0, 0, thrusters_width, thrusters_height)

  thrustersContext.fillStyle = pushAnimationTimer.isRunning() ? THRUSTER_FIRING_FILL_STYLE : THRUSTER_FILL_STYLE

  isArrowLeft
    ? paintLeftArrow(thrustersContext, thrusters_width, thrusters_height, ARROW_MARGIN)
    : paintRightArrow(thrustersContext, thrusters_width, thrusters_height, ARROW_MARGIN)

  thrustersContext.fillStyle = THRUSTER_FILL_STYLE

  isArrowLeft
    ? paintRightArrow(thrustersContext, thrusters_width, thrusters_height, ARROW_MARGIN)
    : paintLeftArrow(thrustersContext, thrusters_width, thrusters_height, ARROW_MARGIN)
}
/* 画三角形 E */

/* 计算fps S */
const calculateFps = (time, lastTime) => 1000 / (time - lastTime)
/* 计算fps E */
