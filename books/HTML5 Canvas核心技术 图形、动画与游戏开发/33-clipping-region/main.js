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

const compositingSelect = document.getElementById('compositingSelect')
const strokeStyleSelect = document.getElementById('strokeStyleSelect')
const fillStyleSelect = document.getElementById('fillStyleSelect')
const drawRadio = document.getElementById('drawRadio')
const eraserRadio = document.getElementById('eraserRadio')
const eraserShapeSelect = document.getElementById('eraserShapeSelect')
const eraserWidthSelect = document.getElementById('eraserWidthSelect')

const ERASER_LINE_WIDTH = 1
const ERASER_SHADOW_COLOR = 'rgb(0, 0, 0)'
const ERASER_SHADOW_STYLE = 'blue'
const ERASER_STROKE_STYLE = 'rgb(0, 0, 255)'
const ERASER_SHADOW_OFFSET = -5
const ERASER_SHADOW_BLUR = 20

const GRID_HORIZONTAL_SPACING = 10
const GRID_VERTICAL_SPACING = 10
const GRID_LINE_COLOR = 'lightblue'

let lastX = 0
let lastY = 0
let dragging = false

const paint = new Paint(canvas)

const draw = (x, y) => {
  const angle = Math.atan(paint.rubberbandRect.height / paint.rubberbandRect.width)

  let radius = paint.mousedown.y === y
    ? Math.abs(x - paint.mousedown.x)
    : paint.rubberbandRect.height / Math.sin(angle)

  paint.context.beginPath()
  paint.context.arc(paint.mousedown.x, paint.mousedown.y, radius, 0, Math.PI * 2, false)
  paint.context.stroke()
  paint.context.fill()
}

const setDrawPathForEraser = (x, y) => {
  const eraserWidth = parseFloat(eraserWidthSelect.value)

  paint.context.beginPath()

  switch (eraserShapeSelect.value) {
    case 'circle':
      paint.context.arc(x, y, eraserWidth / 2, 0, Math.PI * 2, false)
      break

    case 'square':
      paint.context.rect(x - eraserWidth / 2, y - eraserWidth / 2, eraserWidth, eraserWidth)
      break

    default:
      break
  }

  paint.context.clip()
}

const setErasePathForEraser = () => {
  const eraserWidth = parseFloat(eraserWidthSelect.value)

  paint.context.beginPath()

  switch (eraserShapeSelect.value) {
    case 'circle':
      paint.context.arc(
        lastX, lastY,
        eraserWidth / 2 + ERASER_LINE_WIDTH,
        0, Math.PI * 2, false
      )
      break

    case 'square':
      paint.context.rect(
        lastX - eraserWidth / 2 - ERASER_LINE_WIDTH,
        lastY - eraserWidth / 2 - ERASER_LINE_WIDTH,
        eraserWidth + ERASER_LINE_WIDTH * 2,
        eraserWidth + ERASER_LINE_WIDTH * 2
      )
      break

    default:
      break
  }

  paint.context.clip()
}

const setEraserAttributes = () => {
  paint.context.lineWidth = ERASER_LINE_WIDTH
  paint.context.shadowColor = ERASER_SHADOW_STYLE
  paint.context.shadowOffsetX = ERASER_SHADOW_OFFSET
  paint.context.shadowOffsetY = ERASER_SHADOW_OFFSET
  paint.context.shadowBlur = ERASER_SHADOW_BLUR
  paint.context.strokeStyle = ERASER_STROKE_STYLE
}

const eraseLast = () => {
  paint.context.save()

  setErasePathForEraser()
  drawGrid(paint.context, GRID_LINE_COLOR, GRID_HORIZONTAL_SPACING, GRID_VERTICAL_SPACING)

  paint.context.restore()
}

const drawEraser = (x, y) => {
  paint.context.save()

  setEraserAttributes()
  setDrawPathForEraser(x, y)

  paint.context.stroke()

  paint.context.restore()
}

canvas.onmousedown = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  drawRadio.checked && paint.saveDrawingSurface()

  paint.updateMousedown(loc.x, loc.y)

  lastX = loc.x
  lastY = loc.y

  dragging = true
}

canvas.onmousemove = e => {
  let loc = null

  if (!dragging) { return }

  e.preventDefault()
  e.stopPropagation()

  loc = windowToCanvas(canvas, e.clientX, e.clientY)

  if (drawRadio.checked) {
    paint.mousemoveEvent(loc.x, loc.y, draw)
  }
  else {
    eraseLast()
    drawEraser(loc.x, loc.y)
  }


  lastX = loc.x
  lastY = loc.y
}

canvas.onmouseup = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  drawRadio.checked && paint.mouseupEvent(loc.x, loc.y, draw)
  eraserRadio.checked && eraseLast()

  dragging = false
}

strokeStyleSelect.onchange = () => {
  paint.context.strokeStyle = strokeStyleSelect.value
}

fillStyleSelect.onchange = () => {
  paint.context.fillStyle = fillStyleSelect.value
}

paint.context.strokeStyle = strokeStyleSelect.value
paint.context.fillStyle = fillStyleSelect.value

drawGrid(paint.context, GRID_LINE_COLOR, GRID_HORIZONTAL_SPACING, GRID_VERTICAL_SPACING)