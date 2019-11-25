/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-24 21:06:52
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const glassPanel = document.getElementById('glassPanel')
const startButton = document.getElementById('startButton')

class DreamBall {
  constructor(canvas, color, stepx, stepy) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.color = color
    this.stepx = stepx
    this.stepy = stepy

    this.circles = []
    this.paused = true
    this.timer = null

    this.init()
    drawGrid(this.context, this.color, this.stepx, this.stepy)
  }

  init() {
    // init circles
    for (let i = 0; i < 100; ++i) {
      this.circles.push({
        x: 100,
        y: 100,
        velocityX: 3 * Math.random(),
        velocityY: 3 * Math.random(),
        radius: 50 * Math.random(),
        color: 'rgba(' + this.rgb() + ', 1.0)'
      })
    }
  }

  rgb() {
    return (Math.random() * 255).toFixed(0) + ', ' +
      (Math.random() * 255).toFixed(0) + ', ' +
      (Math.random() * 255).toFixed(0)
  }

  drawBall() {
    this.circles.forEach(circle => {
      this.context.beginPath()
      this.context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false)
      this.context.fillStyle = circle.color
      this.context.fill()
      this.adjustPosition(circle)
    })
  }

  adjustPosition(circle) {
    if (circle.x + circle.velocityX + circle.radius > this.width ||
      circle.x + circle.velocityX - circle.radius < 0) {
      circle.velocityX = -circle.velocityX
    }

    if (circle.y + circle.velocityY + circle.radius > this.height ||
      circle.y + circle.velocityY - circle.radius < 0) {
      circle.velocityY = -circle.velocityY
    }

    circle.x += circle.velocityX
    circle.y += circle.velocityY
  }

  toggle() {
    this.paused = !this.paused

    this.paused ? this.stop() : this.start()
  }

  start() {
    this.context.lineWidth = 0.5
    this.context.font = '32px Arial'


    this.timer = setInterval(() => {
      this.context.clearRect(0, 0, this.width, this.height)
      drawGrid(this.context, this.color, this.stepx, this.stepy)
      this.drawBall()
    }, 1000 / 60);
  }

  stop() {
    clearInterval(this.timer)
  }
}

const dreamBall = new DreamBall(canvas)

startButton.onclick = e => {
  e.preventDefault()
  e.stopPropagation()
  dreamBall.toggle()
  startButton.innerText = dreamBall.paused ? 'Start' : 'Stop'
}

glassPanel.onmousedown = e => {
  e.preventDefault()
  e.stopPropagation()
}

canvas.onmousedown = e => {
  e.preventDefault()
  e.stopPropagation()
}