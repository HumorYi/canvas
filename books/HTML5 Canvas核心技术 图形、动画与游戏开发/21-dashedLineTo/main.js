/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-24 23:35:03
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
const moveToFn = CanvasRenderingContext2D.prototype.moveTo

CanvasRenderingContext2D.prototype.lastMoveToLocation = {}

CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
  moveToFn.call(context, x, y)
  this.lastMoveToLocation.x = x
  this.lastMoveToLocation.y = y
}

CanvasRenderingContext2D.prototype.dashedLineTo = function (x, y, dashLength = 5) {
  const startX = this.lastMoveToLocation.x
  const startY = this.lastMoveToLocation.y

  const deltaX = x - startX
  const deltaY = y - startY

  const numDashes = Math.floor(
    Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) / dashLength
  )
  const lineWidth = deltaX / numDashes
  const lineHeight = deltaY / numDashes

  for (let i = 0; i < numDashes; i++) {
    this[i % 2 === 0 ? 'moveTo' : 'lineTo'](startX + lineWidth * i, startY + lineHeight * i)
  }
}

CanvasRenderingContext2D.prototype.dashedRect = function (x, y, w, h, direction = true, dashLength = 5) {
  if (direction) {
    this.moveTo(x, y)
    this.dashedLineTo(w, y, dashLength)

    this.moveTo(w, y)
    this.dashedLineTo(w, h, dashLength)

    this.moveTo(w, h)
    this.dashedLineTo(x, h, dashLength)

    this.moveTo(x, h)
    this.dashedLineTo(x, y, dashLength)
  }
  else {
    this.moveTo(x, y)
    this.dashedLineTo(x, h, dashLength)

    this.moveTo(x, h)
    this.dashedLineTo(w, h, dashLength)

    this.moveTo(w, h)
    this.dashedLineTo(w, y, dashLength)

    this.moveTo(w, y)
    this.dashedLineTo(x, y, dashLength)
  }
}


context.lineWidth = 3
context.strokeStyle = 'blue'

// context.moveTo(20, 20)
// context.dashedLineTo(width - 20, 20)
// context.moveTo(width - 20, 20)
// context.dashedLineTo(width - 20, height - 20)
// context.moveTo(width - 20, height - 20)
// context.dashedLineTo(20, height - 20)
// context.moveTo(20, height - 20)
// context.dashedLineTo(20, 20)

context.dashedRect(20, 20, width - 20, height - 20, false)

context.moveTo(20, 20)
context.dashedLineTo(width - 20, height - 20)
context.stroke()