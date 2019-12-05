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
const lineWidthSelect = document.getElementById('lineWidthSelect')
const fillStyleSelect = document.getElementById('fillStyleSelect')
const fillCheckbox = document.getElementById('fillCheckbox')
const guidewireCheckbox = document.getElementById('guidewireCheckbox')

const mousedown = {
  x: 0,
  y: 0
}
const movedLoc = {
  x: 0,
  y: 0
}
let dragging = false
let guidewires = true

class Paint {
  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height

    this.rubberbandRect = {
      x: 0,
      y: 0,
      left: 0,
      top: 0
    }

    this.drawingSurfaceImageData = null
    this.isFill = false
  }

  saveDrawingSurface() {
    this.drawingSurfaceImageData = this.context.getImageData(0, 0, this.width, this.height)
  }

  restoreDrawingSurface() {
    this.context.putImageData(this.drawingSurfaceImageData, 0, 0)
  }

  updateRubberbandRectangle(x, y, mx, my) {
    this.rubberbandRect.width = Math.abs(x - mx)
    this.rubberbandRect.height = Math.abs(y - my)
    this.rubberbandRect.left = x > mx ? mx : x
    this.rubberbandRect.top = y > my ? my : y
  }

  drawRubberbandCircle(x, y, mx, my) {
    let angle, radius

    if (my === y) {
      radius = Math.abs(x - mx)
    }
    else {
      angle = Math.atan(this.rubberbandRect.height / this.rubberbandRect.width)
      radius = this.rubberbandRect.height / Math.sin(angle)
    }


    this.context.beginPath()
    this.context.arc(mx, my, radius, 0, Math.PI * 2, false)
    this.context.stroke()

    this.isFill && this.context.fill()
  }

  drawRubberbandShape(x, y, mx, my, type = 'circle') {
    switch (type) {
      case 'circle':
        this.drawRubberbandCircle(x, y, mx, my)
        break;

      default:
        break;
    }
  }

  updateRubberband(x, y, mx, my) {
    this.updateRubberbandRectangle(x, y, mx, my)
    this.drawRubberbandShape(x, y, mx, my)
  }

  drawVerticalLine = x => {
    this.context.beginPath()

    this.context.moveTo(x + 0.5, 0)
    this.context.lineTo(x + 0.5, this.height)

    this.context.stroke()
  }

  drawHorizontalLine = y => {
    this.context.beginPath()

    this.context.moveTo(0, y + 0.5)
    this.context.lineTo(this.width, y + 0.5)

    this.context.stroke()
  }

  drawGuidewires(x, y, strokeStyle = "rgba(0,0,230,0.4)", lineWidth = 0.5) {
    this.context.save()

    this.context.strokeStyle = strokeStyle
    this.context.lineWidth = lineWidth

    this.drawVerticalLine(x)
    this.drawHorizontalLine(y)

    this.context.restore()
  }

  updateStrokeStyle(strokeStyle) {
    this.context.strokeStyle = strokeStyle
  }

  updateLineWidth(lineWidth) {
    this.context.lineWidth = lineWidth
  }

  updateFillStyle(fillStyle) {
    this.context.fillStyle = fillStyle
  }

  openFill() {
    this.isFill = true
  }

  closeFill() {
    this.isFill = false
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }
}

const mouseup = (x, y) => {
  if (!dragging) { return }

  paint.restoreDrawingSurface()

  paint.updateRubberband(x, y, mousedown.x, mousedown.y)

  dragging = false
}

const paint = new Paint(canvas)

canvas.onmousedown = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  mousedown.x = loc.x
  mousedown.y = loc.y

  paint.saveDrawingSurface()

  dragging = true
}

canvas.onmousemove = e => {
  if (!dragging) { return }

  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  movedLoc.x = loc.x
  movedLoc.y = loc.y

  paint.restoreDrawingSurface()
  paint.updateRubberband(loc.x, loc.y, mousedown.x, mousedown.y)

  guidewires && paint.drawGuidewires(loc.x, loc.y)
}

canvas.onmouseup = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  e.preventDefault()
  e.stopPropagation()

  mouseup(loc.x, loc.y)
}

document.onmouseup = () => mouseup(movedLoc.x, movedLoc.y)

eraseAllButton.onclick = () => {
  paint.clear()

  drawGrid(paint.context)

  paint.saveDrawingSurface()
}

strokeStyleSelect.onchange = () => paint.updateStrokeStyle(strokeStyleSelect.value)

lineWidthSelect.onchange = () => paint.updateLineWidth(lineWidthSelect.value)

fillStyleSelect.onchange = () => paint.updateFillStyle(fillStyleSelect.value)

fillCheckbox.onchange = () => fillCheckbox.checked ? paint.openFill() : paint.closeFill()

guidewireCheckbox.onchange = () => {
  guidewires = guidewireCheckbox.checked
}

paint.updateStrokeStyle(strokeStyleSelect.value)
paint.updateLineWidth(lineWidthSelect.value)
paint.updateFillStyle(fillStyleSelect.value)

fillCheckbox.checked && paint.openFill()

drawGrid(paint.context)