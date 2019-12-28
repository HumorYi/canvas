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
const CLOCK_RADIUS = width / 2 - 30
const HOUR_HAND_TRUNCATION = 35
const ball = new Sprite('ball', {
  paint(sprite, context) {
    context.save()
    context.beginPath()

    context.arc(
      sprite.left + sprite.width / 2,
      sprite.top + sprite.height / 2,
      sprite.width / 2, 0, Math.PI * 2, false
    )
    context.clip()

    context.shadowColor = 'rgb(0,0,0)'
    context.shadowOffsetX = -4
    context.shadowOffsetY = -4
    context.shadowBlur = 8

    context.lineWidth = 2
    context.strokeStyle = 'rgb(100,100,195)'
    context.fillStyle = 'rgba(218, 165, 32, 0.1)'
    context.fill()

    context.stroke()
    context.restore()
  }
})

const drawClockFace = () => {
  context.save()
  context.beginPath()
  context.arc(width / 2, height / 2, CLOCK_RADIUS, 0, Math.PI * 2, false)
  context.strokeStyle = 'rgba(0,0,0,0.2)'
  context.stroke()
  context.restore()
}

const drawHand = num => {
  const angle = (Math.PI * 2) * (num / 60) - Math.PI / 2
  const lineEnd = {
    x: width / 2 + Math.cos(angle) * (CLOCK_RADIUS - ball.width / 2),
    y: height / 2 + Math.sin(angle) * (CLOCK_RADIUS - ball.width / 2)
  }

  context.beginPath()
  context.moveTo(width / 2, height / 2)
  context.lineTo(lineEnd.x, lineEnd.y)
  context.stroke()

  ball.left = width / 2 + Math.cos(angle) * CLOCK_RADIUS - ball.width / 2

  ball.top = height / 2 + Math.sin(angle) * CLOCK_RADIUS - ball.height / 2

  ball.paint(context)
}

const drawHands = () => {
  const date = new Date()
  let hour = date.getHours()
  hour = hour > 12 ? hour - 12 : hour

  ball.width = 20
  ball.height = 20
  drawHand(date.getSeconds())

  ball.width = 35
  ball.height = 35
  drawHand(date.getMinutes())

  ball.width = 50
  ball.height = 50
  drawHand((hour + date.getMinutes() / 60) * 5)

  ball.width = 10
  ball.height = 10
  ball.left = width / 2 - ball.width / 2
  ball.top = height / 2 - ball.height / 2
  ball.paint(context)
}

const drawClock = () => {
  drawClockFace()
  drawHands()
}

const animate = () => {
  context.clearRect(0, 0, width, height)

  drawGrid(context)
  drawClock()

  window.requestNextAnimationFrame(animate)
}

context.lineWidth = 0.5
context.strokeStyle = 'rgba(0,0,0,0.2)'
context.shadowColor = 'rgba(0,0,0,0.5)'
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.shadowBlur = 4
context.stroke()

window.requestNextAnimationFrame(animate)

drawGrid(context)