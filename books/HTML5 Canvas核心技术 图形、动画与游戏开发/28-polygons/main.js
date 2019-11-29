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


const getStartAngle = val => {
  return Math.PI / 180 * Number(val)
}

let dragging = false
let guidewired = true

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
}

const paint = new Paint(
  canvas,
  guidewired
)

drawGrid(paint.context)
canvasMouseEvent(canvas, paint, draw)

eraseAllButton.onclick = () => {
  paint.clear()
  drawGrid(paint.context)
  paint.saveDrawingSurface()
}

strokeStyleSelect.onchange = () => paint.updateStrokeStyle(strokeStyleSelect.value)
fillStyleSelect.onchange = () => paint.updateFillStyle(fillStyleSelect.value)
fillCheckbox.onchange = () => paint.updateFilled(fillCheckbox.checked)