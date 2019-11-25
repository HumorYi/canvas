/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-24 22:04:03
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const eraseAllButton = document.getElementById('eraseAllButton')
const strokeStyleSelect = document.getElementById('strokeStyleSelect')
const guidewireCheckbox = document.getElementById('guidewireCheckbox')
const mousedown = { x: 0, y: 0 }
const movedLoc = { x: 0, y: 0 }
const rubberbandRect = {}

let drawingSurfaceImageData
let dragging = false
let guidewires = guidewireCheckbox.checked

const saveDrawingSurface = () => {
  drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height)
}

const restoreDrawingSurface = () => {
  context.putImageData(drawingSurfaceImageData, 0, 0)
}

const updateRubberbandRectangle = (x, y) => {
  rubberbandRect.width = Math.abs(x - mousedown.x)
  rubberbandRect.height = Math.abs(y - mousedown.y)

  rubberbandRect.left = x > mousedown.x ? mousedown.x : x
  rubberbandRect.top = y > mousedown.y ? mousedown.y : y

  context.save()
  context.strokeStyle = 'red'
  context.restore()
}

const drawRubberbandShape = (x, y) => {
  context.beginPath()
  context.moveTo(mousedown.x, mousedown.y)
  context.lineTo(x, y)
  context.stroke()
}

const updateRubberband = (x, y) => {
  updateRubberbandRectangle(x, y)
  drawRubberbandShape(x, y)
}

const drawVerticalLine = x => {
  context.beginPath()
  context.moveTo(x + 0.5, 0)
  context.lineTo(x + 0.5, canvas.height)
  context.stroke()
}
const drawHorizontalLine = y => {
  context.beginPath()
  context.moveTo(0, y + 0.5)
  context.lineTo(canvas.width, y + 0.5)
  context.stroke()
}

const drawGuidewires = (x, y) => {
  context.save()
  context.strokeStyle = 'rgba(0,0,230,0.4)'
  context.lineWidth = 0.5
  drawVerticalLine(x)
  drawHorizontalLine(y)
  context.restore()
}

const mouseup = (x, y) => {
  restoreDrawingSurface()

  updateRubberband(x, y)

  dragging = false
}

canvas.onmousedown = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()

  saveDrawingSurface()

  mousedown.x = loc.x
  mousedown.y = loc.y

  dragging = true
}

canvas.onmousemove = e => {
  if (!dragging) { return }

  e.preventDefault()

  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  movedLoc.x = loc.x
  movedLoc.y = loc.y

  restoreDrawingSurface()

  updateRubberband(loc.x, loc.y)

  guidewires && drawGuidewires(loc.x, loc.y)
}

canvas.onmouseup = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  mouseup(loc.x, loc.y)
}

window.onmouseup = () => mouseup(movedLoc.x, movedLoc.y)

eraseAllButton.onclick = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  drawGrid(context)

  saveDrawingSurface()
}

strokeStyleSelect.onchange = () => {
  context.strokeStyle = strokeStyleSelect.value
}

guidewireCheckbox.onchange = () => {
  guidewires = guidewireCheckbox.checked
}

context.strokeStyle = strokeStyleSelect.value
drawGrid(context)