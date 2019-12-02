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
const fillStyleSelect = document.getElementById('fillStyleSelect')
const fillCheckbox = document.getElementById('fillCheckbox')
const sidesSelect = document.getElementById('sidesSelect')
const startAngleSelect = document.getElementById('startAngleSelect')
const editCheckbox = document.getElementById('editCheckbox')

const polygons = []
let guidewired = true
let editing = false
let dragging = false
let draggingOffsetX = 0
let draggingOffsetY = 0
let draggingPolygon = null

const startEditing = () => {
  canvas.style.cursor = 'pointer'
  editing = true
}

const stopEditing = () => {
  canvas.style.cursor = 'crosshair'
  editing = false
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
    fillCheckbox.checked,
  )

  polygon.draw(paint.context)

  !dragging && polygons.push(polygon)
}

const drawPolygons = () => polygons.forEach(polygon => polygon.draw(paint.context))

const getSelectedPolygon = (x, y) => {
  for (let i = 0, len = polygons.length; i < len; ++i) {
    let polygon = polygons[i]
    polygon.createPath(paint.context)

    if (paint.context.isPointInPath(x, y)) {
      paint.mousedownEvent(x, y)
      draggingOffsetX = x - polygon.x
      draggingOffsetY = y - polygon.y

      return polygon
    }
  }
}

const paint = new Paint(
  canvas,
  guidewired
)

drawGrid(paint.context)

canvas.onmousedown = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()
  dragging = true

  if (!editing) {
    return paint.mousedownEvent(loc.x, loc.y)
  }

  draggingPolygon = getSelectedPolygon(loc.x, loc.y)
}

canvas.onmousemove = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  if (!dragging) { return }

  if (editing) {
    draggingPolygon.x = loc.x - draggingOffsetX
    draggingPolygon.y = loc.y - draggingOffsetY

    paint.clear()
    drawGrid(paint.context)
    drawPolygons()
  }
  else {
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

editCheckbox.onchange = () => editCheckbox.checked ? startEditing() : stopEditing()

eraseAllButton.onclick = () => {
  paint.clear()
  drawGrid(paint.context)
  paint.saveDrawingSurface()
}