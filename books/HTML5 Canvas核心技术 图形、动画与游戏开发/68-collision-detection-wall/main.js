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

const ball = new Sprite('ball', {
  paint(sprite, context) {
    context.save()
    context.strokeStyle = 'blue'
    context.fillStyle = 'yellow'
    context.beginPath()
    context.arc(sprite.left + sprite.width / 2, sprite.top + sprite.height / 2, 10, 0, Math.PI * 2, false)
    context.stroke()
    context.fill()
    context.restore()
  }
})

let lastTime = 0
let ballMoving = false
let velocityX = 350
let velocityY = 190
let showInstructions = true

const handleEdgeCollisions = () => {
  const right = ball.left + ball.width
  const bottom = ball.top + ball.height

  if (right > width || ball.left < 0) {
    velocityX = -velocityX

    if (right > width) {
      ball.left -= right - width
    }

    if (ball.left < 0) {
      ball.left -= ball.left
    }
  }

  if (bottom > height || ball.top < 0) {
    velocityY = -velocityY

    if (bottom > height) {
      ball.top -= bottom - height
    }
    if (ball.top < 0) {
      ball.top -= ball.top
    }
  }
}

const detectCollisions = () => ballMoving && handleEdgeCollisions()

const animate = time => {
  if (lastTime === 0) {
    lastTime = time
  } else {
    context.clearRect(0, 0, width, height)

    if (ballMoving) {
      let elapsedTime = parseFloat(time - lastTime) / 1000

      ball.left += velocityX * elapsedTime
      ball.top += velocityY * elapsedTime

      detectCollisions()
    }

    lastTime = time

    ball.paint(context)

    if (showInstructions) {
      context.fillStyle = 'rgba(100, 140, 230, 0.7)'
      context.font = '24px Arial'
      context.fillText('Click anywhere to start or stop the ball', 20, 40)
    }
  }
  window.requestNextAnimationFrame(animate)
}

canvas.onmousedown = ()=>{
  ballMoving = !ballMoving

  if (showInstructions) {
    showInstructions = false
  }
}

// Initialization................................................

ball.fillStyle = 'rgba(255,255,0,1.0)'
ball.left = 100
ball.top = 100

context.shadowColor = 'rgba(100,140,255,0.5)'
context.shadowBlur = 4
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.font = '38px Arial'

window.requestNextAnimationFrame(animate)
