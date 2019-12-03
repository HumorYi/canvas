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

const eraseAllButton = document.getElementById('eraseAllButton')
const strokeStyleSelect = document.getElementById('strokeStyleSelect')
const startAngleSelect = document.getElementById('startAngleSelect')
const fillStyleSelect = document.getElementById('fillStyleSelect')
const fillCheckbox = document.getElementById('fillCheckbox')
const editCheckbox = document.getElementById('editCheckbox')
const sidesSelect = document.getElementById('sidesSelect')

let polygons = []
let editing = false
let dragging = false
let rotatingLockEngaged = false
let rotatingLockAngle = 0
let polygonRotating = null
let dial = null

const paint = new Paint(
  canvas,
  true
)

const drawPolygons = () => polygons.forEach(polygon => polygon.draw(paint.context))

const stopRotatingPolygon = () => {
  polygonRotating = null
  rotatingLockEngaged = false
  rotatingLockAngle = 0
}

const draw = () => {
  const polygon = new Polygon(
    paint.mousedown.x,
    paint.mousedown.y,
    paint.rubberbandRect.width,
    Number(sidesSelect.value),
    Math.PI / 180 * Number(startAngleSelect.value),
    strokeStyleSelect.value,
    fillStyleSelect.value,
    true,
    fillCheckbox.checked
  )

  polygon.draw(paint.context)

  !dragging && polygons.push(polygon)
}

const redraw = () => {
  paint.clear()
  drawGrid(paint.context)
  drawPolygons()
}

const getSelectedPolygon = (x, y) => {
  for (let i = 0, len = polygons.length; i < len; ++i) {
    let polygon = polygons[i]
    polygon.createPath(paint.context)

    if (paint.context.isPointInPath(x, y)) {
      paint.mousedownEvent(x, y)
      return polygon
    }
  }
}

const startEditing = () => {
  canvas.style.cursor = 'pointer'
  editing = true
}

const stopEditing = () => {
  canvas.style.cursor = 'crosshair'
  editing = false
  stopRotatingPolygon()
  redraw()
}

const getAngle = (x, y, polygon) => Math.atan((y - polygon.y) / (x - polygon.x))

canvas.onmousedown = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  if (!editing) {
    paint.mousedownEvent(loc.x, loc.y)
    dragging = true
    return
  }

  if (polygonRotating) {
    stopRotatingPolygon()
    redraw()
  }

  polygonRotating = getSelectedPolygon(loc.x, loc.y)

  if (polygonRotating) {
    dial = new Dial(canvas)
    dial.draw(polygonRotating, loc.x, loc.y, rotatingLockAngle)

    if (!rotatingLockEngaged) {
      rotatingLockEngaged = true
      rotatingLockAngle = getAngle(loc.x, loc.y, polygonRotating)
    }
  }
}

canvas.onmousemove = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)
  let angle = 0

  e.preventDefault()
  e.stopPropagation()

  if (rotatingLockEngaged) {
    angle = getAngle(loc.x, loc.y, polygonRotating) - rotatingLockAngle

    redraw()

    polygonRotating.draw(paint.context, true, angle, 'rgba(100, 140, 230, 0.9)', 'rgba(100, 140, 230, 0.3)')

    dial.draw(polygonRotating, loc.x, loc.y, angle)
  }
  else if (dragging) {
    paint.mousemoveEvent(loc.x, loc.y, draw)
  }
}

canvas.onmouseup = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  dragging = false

  !editing && paint.mouseupEvent(loc.x, loc.y, draw)
}

eraseAllButton.onclick = () => {
  polygons = []
  editing = false
  dragging = false
  rotatingLockEngaged = false
  rotatingLockAngle = 0
  polygonRotating = null
  dial = null

  editCheckbox.checked = false

  paint.clear()
  drawGrid(paint.context)
  paint.saveDrawingSurface()
}

editCheckbox.onchange = () => editCheckbox.checked ? startEditing() : stopEditing()

drawGrid(paint.context)