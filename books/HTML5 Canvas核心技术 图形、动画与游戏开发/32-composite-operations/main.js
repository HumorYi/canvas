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
const drawOwnText = context => drawText(context, 'HTML5', 20, 50)

canvas.onmousemove = e => {
  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  context.clearRect(0, 0, width, height)

  drawOwnText(context)

  context.save()

  context.globalCompositeOperation = compositingSelect.value

  context.beginPath()

  context.arc(loc.x, loc.y, 100, 0, Math.PI * 2, false)

  context.fillStyle = 'orange'

  context.stroke()
  context.fill()

  context.restore()
}

compositingSelect.selectedIndex = 3
context.lineWidth = 0.5
context.font = '128pt Comic-sans'
drawOwnText(context)