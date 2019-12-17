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

const fontSelect = document.getElementById('fontSelect')
const sizeSelect = document.getElementById('sizeSelect')
const strokeStyleSelect = document.getElementById('strokeStyleSelect')
const fillStyleSelect = document.getElementById('fillStyleSelect')

const cursor = new TextCursor()
let drawingSurfaceImageData
let paragraph


const saveDrawingSurface = () => {
  drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height)
}

const setFont = () => {
  context.font = sizeSelect.value + 'px ' + fontSelect.value;
}

canvas.onmousedown = e => {
  let loc = windowToCanvas(canvas, e.clientX, e.clientY)

  cursor.erase(context, drawingSurfaceImageData)
  saveDrawingSurface()

  if (paragraph && paragraph.isPointInside(loc.x, loc.y)) {
    paragraph.moveCursorCloseTo(loc.x, loc.y)
  }
  else {
    paragraph = new Paragraph(
      context,
      loc.x, loc.y - cursor.getHeight(context),
      drawingSurfaceImageData,
      cursor
    )

    paragraph.addLine(new TextLine(loc.x, loc.y))
  }

}

fillStyleSelect.onchange = () => {
  cursor.fillStyle = fillStyleSelect.value
}

strokeStyleSelect.onchange = () => {
  cursor.strokeStyle = strokeStyleSelect.value
}

// Key event handlers............................................

document.onkeydown = e => {
  if (e.keyCode === 8 || e.keyCode === 13) {
    // The call to e.preventDefault() suppresses
    // the browser's subsequent call to document.onkeypress(),
    // so only suppress that call for backspace and enter.
    e.preventDefault()
  }

  if (e.keyCode === 8) {  // backspace
    paragraph.backspace()
  }
  else if (e.keyCode === 13) { // enter
    paragraph.newline()
  }
}

document.onkeypress = e => {
  let key = String.fromCharCode(e.keyCode)

  // Only process if user is editing text
  // and they aren't holding down the CTRL
  // or META keys.

  if (e.keyCode !== 8 && !e.ctrlKey && !e.metaKey) {
    e.preventDefault() // no further browser processing

    context.fillStyle = fillStyleSelect.value
    context.strokeStyle = strokeStyleSelect.value

    paragraph.insert(key)
  }
}

// Initialization................................................

fontSelect.onchange = setFont
sizeSelect.onchange = setFont

cursor.fillStyle = fillStyleSelect.value
cursor.strokeStyle = strokeStyleSelect.value

context.lineWidth = 2.0
setFont()

drawBackground(context, width, height)
saveDrawingSurface()
