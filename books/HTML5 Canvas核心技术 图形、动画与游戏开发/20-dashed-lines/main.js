/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-24 23:27:41
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height

const drawDashedLine = (context, x1, y1, x2, y2, dashLength = 5) => {
  const deltaX = x2 - x1
  const deltaY = y2 - y1
  const numDashes = Math.floor(
    Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) / dashLength
  )
  const lineWidth = deltaX / numDashes
  const lineHeight = deltaY / numDashes

  for (let i = 0; i < numDashes; i++) {
    context[i % 2 === 0 ? 'moveTo' : 'lineTo'](x1 + lineWidth * i, y1 + lineHeight * i)
  }

  context.stroke()
}

const drawDashedRect = (context, x1, y1, w, h, direction = true, dashLength = 5) => {
  if (direction) {
    drawDashedLine(context, x1, y1, w, y1, dashLength)
    drawDashedLine(context, w, y1, w, h, dashLength)
    drawDashedLine(context, x1, h, w, h, dashLength)
    drawDashedLine(context, x1, y1, x1, h, dashLength)
  }
  else {
    drawDashedLine(context, x1, h, w, h, dashLength)
    drawDashedLine(context, x1, y1, x1, h, dashLength)
    drawDashedLine(context, w, y1, w, h, dashLength)
    drawDashedLine(context, x1, y1, w, y1, dashLength)
  }
}

context.lineWidth = 3
context.strokeStyle = 'blue'

drawDashedLine(context, 20, 20, width - 20, 20)
drawDashedLine(context, width - 20, 20, width - 20, height - 20, 10)
drawDashedLine(context, width - 20, height - 20, 20, height - 20, 15)
drawDashedLine(context, 20, height - 20, 20, 20, 2)

// drawDashedRect(context, 20, 20, width - 20, height - 20, false)