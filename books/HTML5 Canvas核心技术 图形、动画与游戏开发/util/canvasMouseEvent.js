/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: canvas 鼠标事件
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */
const canvasMouseEvent = (canvas, paint, draw) => {
  const movedLoc = {
    x: 0,
    y: 0
  }

  const mouseup = (x, y) => {
    if (!dragging) { return }

    paint.mouseupEvent(x, y, draw)

    dragging = false
  }

  canvas.onmousedown = e => {
    const loc = windowToCanvas(canvas, e.clientX, e.clientY)

    e.preventDefault()
    e.stopPropagation()

    paint.mousedownEvent(loc.x, loc.y)

    dragging = true
  }

  canvas.onmousemove = e => {
    if (!dragging) { return }

    const loc = windowToCanvas(canvas, e.clientX, e.clientY)

    e.preventDefault()
    e.stopPropagation()

    paint.mousemoveEvent(loc.x, loc.y, draw)

    movedLoc.x = loc.x
    movedLoc.y = loc.y
  }

  canvas.onmouseup = e => {
    const loc = windowToCanvas(canvas, e.clientX, e.clientY)

    e.preventDefault()
    e.stopPropagation()

    mouseup(loc.x, loc.y)
  }

  document.onmouseup = () => mouseup(movedLoc.x, movedLoc.y)
}