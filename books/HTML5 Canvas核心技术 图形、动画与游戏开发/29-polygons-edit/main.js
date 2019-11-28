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


const getStartAngle = val => {
  return Math.PI / 180 * Number(val)
}

let draggingOffsetX = 0
let draggingOffsetY = 0
let editing = false
let dragging = false
let guidewired = true
let sides = Number(sidesSelect.value)
let startAngle = getStartAngle(startAngleSelect.value)
const polygons = []


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
    sides,
    startAngle
  )

  polygon.draw(paint.context)

  !dragging && polygons.push(polygon)
}

const drawPolygons = () => polygons.forEach(polygon => {
  paint.drawRubberbandShape(() => polygon.draw(paint.context))
})

const paint = new Paint(
  canvas,
  strokeStyleSelect.value,
  fillStyleSelect.value,
  true,
  fillCheckbox.checked,
  guidewired
)

drawGrid(paint.context)

canvas.onmousedown = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  if (!editing) {
    paint.mousedownEvent(loc.x, loc.y)
    dragging = true
    return
  }

  polygons.forEach(polygon => {
    polygon.createPath(paint.context)
    if (paint.context.isPointInPath(loc.x, loc.y)) {
      paint.mousedownEvent(loc.x, loc.y)
      dragging = polygon
      draggingOffsetX = loc.x - polygon.x
      draggingOffsetY = loc.y - polygon.y
      return
    }
  })
}

canvas.onmousemove = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  if (editing && dragging) {
    dragging.x = loc.x - draggingOffsetX
    dragging.y = loc.y - draggingOffsetY

    paint.clear()
    drawGrid(paint.context)
    drawPolygons()
  }
  else {
    dragging && paint.mousemoveEvent(loc.x, loc.y, draw)
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

strokeStyleSelect.onchange = () => paint.updateStrokeStyle(strokeStyleSelect.value)
fillStyleSelect.onchange = () => paint.updateFillStyle(fillStyleSelect.value)
fillCheckbox.onchange = () => paint.updateFilled(fillCheckbox.checked)

sidesSelect.onchange = () => {
  sides = Number(sidesSelect.value)
}
startAngleSelect.onchange = () => {
  startAngle = getStartAngle(startAngleSelect.value)
}