/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-22 00:07:53
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const drawGrid = (context, color, stepx, stepy) => {
  const width = context.canvas.width
  const height = context.canvas.height

  context.save()

  context.strokeStyle = color
  context.lineWidth = 0.5

  for (var i = stepx + 0.5; i < width; i += stepx) {
    context.beginPath()
    context.moveTo(i, 0)
    context.lineTo(i, height)
    context.stroke()
    context.closePath()
  }

  for (var i = stepy + 0.5; i < height; i += stepy) {
    context.beginPath()
    context.moveTo(0, i)
    context.lineTo(width, i)
    context.stroke()
    context.closePath()
  }

  context.restore()
}

// Initialization
drawGrid(context, 'lightgray', 10, 10)

// Drawing attributes
context.font = '48pt Helvetica'
context.strokeStyle = 'blue'
context.fillStyle = 'red'
context.lineWidth = 2

// Text
context.strokeText('Stroke', 60, 110)
context.fillText('Fill', 440, 110)

context.strokeText('Stroke & Fill', 650, 110)
context.fillText('Stroke & Fill', 650, 110)


// Drawing attributes
context.lineWidth = 5

// Rectangles
context.beginPath()
context.rect(80, 150, 150, 100)
context.stroke()

context.beginPath()
context.rect(400, 150, 150, 100)
context.fill()

context.beginPath()
context.rect(750, 150, 150, 100)
context.stroke()
context.fill()

// Open arcs
context.beginPath()
context.arc(150, 370, 60, 0, Math.PI * 3 / 2)
context.stroke()

context.beginPath()
context.arc(475, 370, 60, 0, Math.PI * 3 / 2)
context.fill()

context.beginPath()
context.arc(820, 370, 60, 0, Math.PI * 3 / 2)
context.stroke()
context.fill()

// Closed arcs
context.beginPath()
context.arc(150, 550, 60, 0, Math.PI * 3 / 2)
context.closePath()
context.stroke()

context.beginPath()
context.arc(475, 550, 60, 0, Math.PI * 3 / 2)
context.closePath()
context.fill()

context.beginPath()
context.arc(820, 550, 60, 0, Math.PI * 3 / 2)
context.closePath()
context.stroke()
context.fill()