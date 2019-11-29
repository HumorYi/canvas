/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 入口文件 TODO: ·未开始
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */
const canvas = document.getElementById('canvas')

const eraseAllButton = document.getElementById('eraseAllButton')
const strokeStyleSelect = document.getElementById('strokeStyleSelect')
const startAngleSelect = document.getElementById('startAngleSelect')
const fillStyleSelect = document.getElementById('fillStyleSelect')
const fillCheckbox = document.getElementById('fillCheckbox')
const editCheckbox = document.getElementById('editCheckbox')
const sidesSelect = document.getElementById('sidesSelect')

const GRID_STROKE_STYLE = 'lightblue'
const GRID_SPACING = 10

let editing = false
let dragging = false
let draggingOffsetX = 0
let draggingOffsetY = 0
let draggingPoint = null
let showInstructions = true

const paint = new Paint(
  canvas,
  guidewireCheckbox.checked
)

const updateDraggingPoint = (x, y) => {
  draggingPoint.x = x
  draggingPoint.y = y
}

const bezierCurves = new BezierCurves()

const draw = () => {
  bezierCurves.updateEndAndControlPoints(paint.rubberbandRect)
  bezierCurves.drawBezierCurve(paint.context, strokeStyleSelect.value)
}

canvas.onmousedown = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  if (!editing) {
    paint.mousedownEvent(loc.x, loc.y)
    paint.updateRubberbandRectangle(loc.x, loc.y)
    dragging = true
    return
  }

  draggingPoint =
    bezierCurves.cursorInControlPoint(paint.context, loc.x, loc.y)
    || bezierCurves.cursorInEndPoint(paint.context, loc.x, loc.y)
}

canvas.onmousemove = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  if (dragging || draggingPoint) {
    paint.restoreDrawingSurface()
    paint.drawGuidewires(loc.x, loc.y)

    if (dragging) {
      paint.updateRubberband(loc.x, loc.y, draw)
      bezierCurves.drawControlAndEndPoints(paint.context)

      return
    }

    if (draggingPoint) {
      updateDraggingPoint(loc.x, loc.y)
      bezierCurves.drawControlAndEndPoints(paint.context)
      bezierCurves.drawBezierCurve(paint.context, strokeStyleSelect.value)
    }
  }
}

canvas.onmouseup = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  paint.restoreDrawingSurface()

  if (!editing) {
    paint.updateRubberband(loc.x, loc.y, draw)
    bezierCurves.drawControlAndEndPoints(paint.context)

    dragging = false
    editing = true

    if (showInstructions) {
      instructions.style.display = 'inline'
    }

    return
  }

  if (draggingPoint) {
    bezierCurves.drawControlAndEndPoints(paint.context)
  }
  else {
    editing = false
  }

  bezierCurves.drawBezierCurve(paint.context, strokeStyleSelect.value)
  draggingPoint = null
}

eraseAllButton.onclick = () => {
  paint.clear()
  drawGrid(paint.context, GRID_STROKE_STYLE, GRID_SPACING)
  paint.saveDrawingSurface()
}

guidewireCheckbox.onchange = () => paint.updateGuidewired(guidewireCheckbox.checked)

instructionsOkayButton.onclick = () => {
  instructions.style.display = 'none'
}

instructionsNoMoreButton.onclick = () => {
  instructions.style.display = 'none'
  showInstructions = false
}

drawGrid(paint.context, GRID_STROKE_STYLE, GRID_SPACING)