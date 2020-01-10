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

const thrusterCanvas = document.querySelector('#thrusterCanvas')
const thrusterContext = thrusterCanvas.getContext('2d')
const thruster_width = thrusterCanvas.width
const thruster_height = thrusterCanvas.height

const pushAnimationTimer = new AnimationTimer()
const fallingAnimationTimer = new AnimationTimer()
const LEFT = 2

let arrow = LEFT
let fps = 60
let lastTime = 0

const BALL_RADIUS = 23
const LEDGE_LEFT = 280
const LEDGE_TOP = 55
const LEDGE_WIDTH = 50
const LEDGE_HEIGHT = 12
const GRAVITY_FORCE = 9.81 // 9.81 m/s / s
const PLATFORM_HEIGHT_IN_METERS = 10 // 10 meters
const pixelsPerMeter = (height - LEDGE_TOP) / PLATFORM_HEIGHT_IN_METERS
const ARROW_MARGIN = 10

const isBallOnLedge = () => ball.left + BALL_RADIUS > LEDGE_LEFT && ball.left < LEDGE_LEFT + LEDGE_WIDTH

const startFalling = () => {
  fallingAnimationTimer.start()
  ball.velocityY = 0
}

const stopFalling = () => {
  fallingAnimationTimer.stop()
  pushAnimationTimer.stop()

  ball.left = LEDGE_LEFT + LEDGE_WIDTH / 2 - BALL_RADIUS
  ball.top = LEDGE_TOP - BALL_RADIUS * 2

  ball.velocityY = 0
}

const moveBall = {
  lastFrameTime: undefined,
  execute(sprite, context, time) {
    const now = new Date().getTime()

    if (this.lastFrameTime === undefined) {
      this.lastFrameTime = now

      return
    }

    if (pushAnimationTimer.isRunning()) {
      sprite.left += ((arrow === LEFT ? -1 : 1) * sprite.velocityX) / fps

      if (isBallOnLedge()) {
        pushAnimationTimer.getElapsedTime() > 200 && pushAnimationTimer.stop()
      } else if (!fallingAnimationTimer.isRunning()) {
        startFalling()
        this.lastFrameTime = now
      }
    }

    if (fallingAnimationTimer.isRunning()) {
      sprite.top += sprite.velocityY / fps
      sprite.velocityY = GRAVITY_FORCE * (fallingAnimationTimer.getElapsedTime() / 1000) * pixelsPerMeter

      sprite.top > height && stopFalling()
    }
  }
}

const ball = new Sprite(
  'ball',
  {
    paint(sprite, context) {
      const x = sprite.left + sprite.width / 2
      const y = sprite.top + sprite.height / 2

      context.save()

      // 外部圆
      context.beginPath()

      context.arc(x, y, BALL_RADIUS, 0, Math.PI * 2, false)

      context.clip()

      context.shadowColor = 'rgba(0,0,255,0.7)'
      context.shadowOffsetX = -4
      context.shadowOffsetY = -4
      context.shadowBlur = 8

      context.lineWidth = 2
      context.strokeStyle = 'rgba(100,100,195,0.8)'

      context.stroke()

      // 内部圆
      context.beginPath()

      context.arc(x, y, BALL_RADIUS / 2, 0, Math.PI * 2, false)

      context.clip()

      context.shadowColor = 'rgba(255,255,0,1.0)'
      context.shadowOffsetX = -4
      context.shadowOffsetY = -4
      context.shadowBlur = 8

      context.stroke()

      context.restore()
    }
  },
  [moveBall]
)

const ledge = new Sprite('ledge', {
  paint(sprite, context, time) {
    context.save()

    context.shadowColor = 'rgba(0,0,0,0.5)'
    context.shadowBlur = 8
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2

    context.fillStyle = 'rgba(255,255,0,0.6)'
    context.strokeStyle = 'rgba(0,0,0,0.6)'

    context.beginPath()

    context.rect(sprite.left, sprite.top, sprite.width, sprite.height)

    context.fill()
    context.stroke()

    context.restore()
  }
})

const pushBallLeft = () => {
  pushAnimationTimer.isRunning() && pushAnimationTimer.stop()
  arrow = LEFT
  pushAnimationTimer.start()
}

const calculateFps = (time, lastTime) => 1000 / (time - lastTime)

const paintArrow = context => {
  context.save()

  context.beginPath()

  context.moveTo(thruster_width - ARROW_MARGIN / 2, ARROW_MARGIN / 2)

  context.lineTo(thruster_width - ARROW_MARGIN / 2, thruster_height - ARROW_MARGIN)

  context.quadraticCurveTo(
    thruster_width - ARROW_MARGIN / 2,
    thruster_height - ARROW_MARGIN / 2,
    thruster_width - ARROW_MARGIN,
    thruster_height - ARROW_MARGIN / 2
  )

  context.lineTo(ARROW_MARGIN / 2, thruster_height / 2 + ARROW_MARGIN / 2)

  context.quadraticCurveTo(
    ARROW_MARGIN / 2 - 6,
    thruster_height / 2,
    ARROW_MARGIN,
    thrusterCanvas.height / 2 - ARROW_MARGIN / 2
  )

  context.lineTo(thruster_width - ARROW_MARGIN, ARROW_MARGIN / 2)

  context.quadraticCurveTo(
    thruster_width - ARROW_MARGIN,
    ARROW_MARGIN / 2,
    thruster_width - ARROW_MARGIN / 2,
    ARROW_MARGIN / 2
  )

  context.fill()

  context.shadowColor = 'rgba(0,0,0,1.0)'
  context.shadowBlur = 8
  context.shadowOffsetX = 4
  context.shadowOffsetY = 4

  context.stroke()

  context.restore()
}

const paintThruster = () => {
  thrusterContext.clearRect(0, 0, thruster_width, thruster_height)
  thrusterContext.fillStyle = pushAnimationTimer.isRunning() ? 'rgba(255,255,0,0.5)' : 'rgba(100,140,255,0.5)'

  paintArrow(thrusterContext)
}

const animate = time => {
  fps = calculateFps(time, lastTime)
  lastTime = time

  context.clearRect(0, 0, width, height)
  drawGrid(context)

  ball.update(context, time)
  ledge.update(context, time)

  ball.paint(context)
  ledge.paint(context)

  paintThruster()

  window.requestNextAnimationFrame(animate)
}

thrusterCanvas.onmousedown = e => {
  e.preventDefault()
  e.stopPropagation()

  pushBallLeft()
}

thrusterContext.strokeStyle = 'rgba(100,140,230,0.6)'
thrusterContext.shadowColor = 'rgba(0,0,0,0.3)'
thrusterContext.shadowBlur = 6
thrusterContext.shadowX = 4
thrusterContext.shadowY = 4

ball.left = LEDGE_LEFT + LEDGE_WIDTH / 2 - BALL_RADIUS
ball.top = LEDGE_TOP - BALL_RADIUS * 2
ball.width = BALL_RADIUS * 2
ball.height = BALL_RADIUS * 2

ball.velocityX = 110
ball.velocityY = 0

ledge.left = LEDGE_LEFT
ledge.top = LEDGE_TOP
ledge.width = LEDGE_WIDTH

window.requestNextAnimationFrame(animate)
