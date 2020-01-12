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

const linearCheckbox = document.getElementById('linearCheckbox')
const easeInCheckbox = document.getElementById('easeInCheckbox')
const easeOutCheckbox = document.getElementById('easeOutCheckbox')
const easeInOutCheckbox = document.getElementById('easeInOutCheckbox')
const elasticCheckbox = document.getElementById('elasticCheckbox')
const bounceCheckbox = document.getElementById('bounceCheckbox')

const thrustersCanvas = document.getElementById('thrustersCanvas')
const thrustersContext = thrustersCanvas.getContext('2d')
const thrusters_width = thrustersCanvas.width
const thrusters_height = thrustersCanvas.height

const PUSH_ANIMATION_DURATION = 3600
const THRUSTER_FILL_STYLE = 'rgba(100,140,230,0.8)'
const THRUSTER_FIRING_FILL_STYLE = 'rgba(255,255,0,0.8)'

const RIGHT = 1
const LEFT = 2
const ARROW_MARGIN = 10
const BALL_RADIUS = 25
const LEDGE_LEFT = 62
const LEDGE_TOP = 275
const LEDGE_WIDTH = width - (LEDGE_LEFT * 2)
const LEDGE_HEIGHT = 12

const linear = AnimationTimer.makeLinear()
const easeIn = AnimationTimer.makeEaseIn(1)
const easeOut = AnimationTimer.makeEaseOut(1)
const easeInOut = AnimationTimer.makeEaseInOut()
const elastic = AnimationTimer.makeElastic(4)
const bounce = AnimationTimer.makeBounce(5)

const pushAnimationTimer = new AnimationTimer(PUSH_ANIMATION_DURATION)

const moveBall = {
  lastTime: undefined,
  isBallOnLedge() {
    return ball.left + 2 * BALL_RADIUS > LEDGE_LEFT && ball.left < LEDGE_LEFT + LEDGE_WIDTH
  },
  resetBall() {
    ball.left = LEDGE_LEFT - BALL_RADIUS
    ball.top = LEDGE_TOP - BALL_RADIUS * 2
  },
  updateBallPosition(elapsed) {
    ball.left += (arrow === LEFT ? -1 : 1) * ball.velocityX * (elapsed / 1000)
  },
  execute(sprite, context, time) {
    let animationElapsed = undefined

    if (pushAnimationTimer.isRunning()) {
      animationElapsed = pushAnimationTimer.getElapsedTime()

      if (this.lastTime !== undefined) {
        this.updateBallPosition(animationElapsed - this.lastTime)

        if (this.isBallOnLedge()) {
          pushAnimationTimer.isOver() && pushAnimationTimer.stop()
        }
        else {
          pushAnimationTimer.stop()
          this.resetBall()
        }
      }
    }

    this.lastTime = animationElapsed
  }
}

const ball = new Sprite(
  'ball',
  {
    paint(sprite, context) {
      const x = sprite.left + sprite.width / 2
      const y = sprite.top + sprite.height / 2

      context.save()
      context.beginPath()
      context.arc(x, y, BALL_RADIUS, 0, Math.PI * 2, false)
      context.clip()

      context.shadowColor = 'rgb(0,0,255)'
      context.shadowOffsetX = -4
      context.shadowOffsetY = -4
      context.shadowBlur = 8

      context.lineWidth = 2
      context.strokeStyle = 'rgb(100,100,195)'
      context.stroke()

      context.beginPath()
      context.arc(x, y, BALL_RADIUS / 2, 0, Math.PI * 2, false)
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

let lastTime = 0
let arrow = LEFT

const paintArrow = context => {
  const x = thrusters_width / 2 - ARROW_MARGIN / 2
  const y = thrusters_height - ARROW_MARGIN / 2

  context.save()

  context.beginPath()

  context.moveTo(x, ARROW_MARGIN / 2)

  context.lineTo(x, thrusters_height - ARROW_MARGIN)

  context.quadraticCurveTo(x, y, thrusters_width / 2 - ARROW_MARGIN, y)

  context.lineTo(ARROW_MARGIN, thrusters_height / 2 + ARROW_MARGIN / 2)

  context.quadraticCurveTo(ARROW_MARGIN - 3, thrusters_height / 2, ARROW_MARGIN, thrusters_height / 2 - ARROW_MARGIN / 2)

  context.lineTo(thrusters_width / 2 - ARROW_MARGIN, ARROW_MARGIN / 2)

  context.quadraticCurveTo(thrusters_width / 2 - ARROW_MARGIN, ARROW_MARGIN / 2, x, ARROW_MARGIN / 2)

  context.fill()
  context.stroke()

  context.restore()
}

const paintRightArrow = context => {
  context.save()

  context.translate(thrusters_width, 0)
  context.scale(-1, 1)

  paintArrow(context)

  context.restore()
}

const paintLeftArrow = context => paintArrow(context)

const paintThrusters = () => {
  const isArrowLeft = arrow === LEFT
  thrustersContext.clearRect(0, 0, thrusters_width, thrusters_height)

  thrustersContext.fillStyle = pushAnimationTimer.isRunning() ? THRUSTER_FIRING_FILL_STYLE : THRUSTER_FILL_STYLE

  isArrowLeft ? paintLeftArrow(thrustersContext) : paintRightArrow(thrustersContext)

  thrustersContext.fillStyle = THRUSTER_FILL_STYLE

  isArrowLeft ? paintRightArrow(thrustersContext) : paintLeftArrow(thrustersContext)
}

const animate = time => {
  context.clearRect(0, 0, width, height)

  ball.update(context, time)
  ball.paint(context)

  ledge.update(context, time)
  ledge.paint(context)

  paintThrusters()

  window.requestNextAnimationFrame(animate)
}

// Event handlers................................................

thrustersCanvas.onmousedown = e => {
  const rect = thrustersCanvas.getBoundingClientRect()
  const x = e.x || e.clientX

  e.preventDefault()
  e.stopPropagation()

  arrow = x - rect.left > thrusters_width / 2 ? RIGHT : LEFT

  pushAnimationTimer.isRunning() && pushAnimationTimer.stop()

  pushAnimationTimer.start()
}

linearCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = linear
}

easeInCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = easeIn
}

easeOutCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = easeOut
}

easeInOutCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = easeInOut
}

elasticCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = elastic
  ball.left = LEDGE_LEFT - BALL_RADIUS
  ball.top = LEDGE_TOP - BALL_RADIUS * 2
}

bounceCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = bounce
}


// Initialization................................................

thrustersContext.strokeStyle = 'rgba(100,140,230,0.6)'
thrustersContext.shadowColor = 'rgba(0,0,0,0.3)'
thrustersContext.shadowBlur = 6
thrustersContext.shadowX = 4
thrustersContext.shadowY = 4

ball.left = LEDGE_LEFT - BALL_RADIUS
ball.top = LEDGE_TOP - BALL_RADIUS * 2
ball.width = BALL_RADIUS * 2
ball.height = BALL_RADIUS * 2
ball.velocityX = 100
ball.velocityY = 0

ledge.left = LEDGE_LEFT
ledge.top = LEDGE_TOP
ledge.width = LEDGE_WIDTH

window.requestNextAnimationFrame(animate)