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

const thrustersCanvas = document.getElementById('thrustersCanvas')
const thrustersContext = thrustersCanvas.getContext('2d')
const thrusters_width = thrustersCanvas.width
const thrusters_height = thrustersCanvas.height

const animateButton = document.getElementById('animateButton')

const RIGHT = 1
const LEFT = 2
const ARROW_MARGIN = 10
const BALL_RADIUS = 15
const LEDGE_LEFT = 150
const LEDGE_TOP = 90
const LEDGE_WIDTH = 44
const LEDGE_HEIGHT = 12
const ANIMATION_DURATION = 200
const THRUSTER_FILL_STYLE = 'rgba(100,140,230,0.8)'
const THRUSTER_FIRING_FILL_STYLE = 'rgba(255,255,0,0.8)'

let lastTime = 0
let arrow = LEFT

const pushAnimationTimer = new AnimationTimer(ANIMATION_DURATION)

const isBallOnLedge = () => {
  return ball.left + 2 * BALL_RADIUS > LEDGE_LEFT && ball.left < LEDGE_LEFT + LEDGE_WIDTH
}

const moveBall = {
  lastTime: undefined,

  resetBall() {
    ball.left = LEDGE_LEFT + LEDGE_WIDTH / 2 - BALL_RADIUS
    ball.top = LEDGE_TOP - BALL_RADIUS * 2
  },

  execute(sprite, context, time) {
    const timerElapsed = pushAnimationTimer.getElapsedTime()
    let frameElapsed

    if (pushAnimationTimer.isRunning() && this.lastTime !== undefined) {
      frameElapsed = timerElapsed - this.lastTime

      ball.left += (arrow === LEFT ? -1 : 1) * ball.velocityX * (frameElapsed / 1000)

      if (isBallOnLedge()) {
        pushAnimationTimer.isOver() && pushAnimationTimer.stop()
      } else {
        pushAnimationTimer.stop()
        this.resetBall()
      }
    }
    this.lastTime = timerElapsed
  }
}

const ball = new Sprite(
  'ball',
  {
    paint(sprite, context) {
      context.save()
      context.beginPath()
      context.arc(sprite.left + sprite.width / 2, sprite.top + sprite.height / 2, BALL_RADIUS, 0, Math.PI * 2, false)
      context.clip()

      context.shadowColor = 'rgb(0,0,255)'
      context.shadowOffsetX = -4
      context.shadowOffsetY = -4
      context.shadowBlur = 8

      context.lineWidth = 2
      context.strokeStyle = 'rgb(100,100,195)'
      context.stroke()

      context.beginPath()
      context.arc(
        sprite.left + sprite.width / 2,
        sprite.top + sprite.height / 2,
        BALL_RADIUS / 2,
        0,
        Math.PI * 2,
        false
      )
      context.clip()

      context.shadowColor = 'rgb(255,255,0)'
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
  paint(sprite, context) {
    context.save()
    context.shadowColor = 'rgba(0,0,0,0.8)'
    context.shadowBlur = 8
    context.shadowOffsetX = 4
    context.shadowOffsetY = 4

    context.fillStyle = 'rgba(255,255,0,0.6)'
    context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height)
    context.restore()
  }
})

const animate = time => {
  fps = calculateFps(time, lastTime)
  lastTime = time

  context.clearRect(0, 0, width, height)

  ball.update(context, time)
  ball.paint(context)

  ledge.update(context, time)
  ledge.paint(context)

  paintThrusters(
    thrustersContext,
    thrusters_width,
    thrusters_height,
    pushAnimationTimer,
    THRUSTER_FIRING_FILL_STYLE,
    THRUSTER_FILL_STYLE,
    ARROW_MARGIN,
    arrow === LEFT
  )

  window.requestNextAnimationFrame(animate)
}

thrustersCanvas.onmousedown = e => {
  const rect = thrustersCanvas.getBoundingClientRect()
  const x = e.x || e.clientX

  e.preventDefault()
  e.stopPropagation()

  arrow = x - rect.left > thrusters_width / 2 ? RIGHT : LEFT

  pushAnimationTimer.isRunning() && pushAnimationTimer.stop()

  pushAnimationTimer.start()
}

thrustersContext.strokeStyle = 'rgba(100,140,230,0.6)'
thrustersContext.shadowColor = 'rgba(0,0,0,0.3)'
thrustersContext.shadowBlur = 6
thrustersContext.shadowX = 4
thrustersContext.shadowY = 4

moveBall.resetBall()
ball.width = BALL_RADIUS * 2
ball.height = BALL_RADIUS * 2
ball.velocityX = 110
ball.velocityY = 0

ledge.left = LEDGE_LEFT
ledge.top = LEDGE_TOP
ledge.width = LEDGE_WIDTH

window.requestNextAnimationFrame(animate)
