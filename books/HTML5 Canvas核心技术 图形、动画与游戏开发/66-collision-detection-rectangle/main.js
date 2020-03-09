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

const THRUSTER_FIRING_FILL_STYLE = 'rgb(255,255,0)'
const THRUSTER_FILL_STYLE = 'rgba(100,140,230,0.3)'
const ARROW_MARGIN = 10

const GRAVITY_FORCE = 9.81 // 9.81 m/s / s
const CANVAS_HEIGHT_IN_METERS = 10 // 10 meters
const pixelsPerMeter = height / CANVAS_HEIGHT_IN_METERS

let lastTime = 0 // Time of last animation frame
let fps = 60 // Frames/second

// AnimationTimers....................................................

const PUSH_ANIMATION_DURATION = 800
const pushAnimationTimer = new AnimationTimer(PUSH_ANIMATION_DURATION)
const fallingAnimationTimer = new AnimationTimer()

// Ledge information..............................................

const ledgeInfos = [
  { left: 40, top: 75, width: 50, height: 12, color: 'rgb(255,255,0)' },
  { left: 220, top: 455, width: 50, height: 12, color: 'rgb(100,80,205)' }
]

const ledges = []

// Ball behaviors................................................

const LEFT = 1
const RIGHT = 2
let arrow = undefined
const BALL_RADIUS = 18
const BALL_INITIAL_LOCATION = {
  top: ledgeInfos[0].top - BALL_RADIUS * 2,
  left: ledgeInfos[0].left + ledgeInfos[0].width / 2 - BALL_RADIUS
}
const fallOnLedge = {
  ballWillHitLedge(ledge) {
    const ballRight = ball.left + ball.width
    const ledgeRight = ledge.left + ledge.width
    const ballBottom = ball.top + ball.height
    const nextBallBottomEstimate = ballBottom + ball.velocityY / fps

    return (
      ballRight > ledge.left && ball.left < ledgeRight && ballBottom < ledge.top && nextBallBottomEstimate > ledge.top
    )
  },

  execute(sprite, context, time) {
    if (isBallFalling()) {
      ledges.forEach(ledge => {
        if (fallOnLedge.ballWillHitLedge(ledge)) {
          // this var. is DOMWindow
          fallingAnimationTimer.stop()
          pushAnimationTimer.stop()

          sprite.top = ledge.top - sprite.height
          sprite.velocityY = 0
        }
      })
    }
  }
}
const moveBall = {
  execute(sprite, context, time) {
    if (pushAnimationTimer.isRunning()) {
      ball.left += ((arrow === LEFT ? -1 : 1) * ball.velocityX) / fps

      if (getLedgeUnderBall()) {
        if (pushAnimationTimer.getElapsedTime() > 800) {
          pushAnimationTimer.stop()
        }
        if (pushAnimationTimer.getElapsedTime() > 200) {
          pushAnimationTimer.stop()
        }
      } else if (!isBallFalling()) {
        startFalling()
      }
    }

    if (isBallFalling()) {
      ball.velocityY = GRAVITY_FORCE * (fallingAnimationTimer.getElapsedTime() / 1000) * pixelsPerMeter

      ball.top += ball.velocityY / fps

      ball.top > height && stopFalling()
    }
  }
}
// Ball sprite...................................................

const ball = new Sprite(
  'ball',
  {
    paint(sprite, context) {
      context.save()
      context.beginPath()
      context.arc(sprite.left + sprite.width / 2, sprite.top + sprite.height / 2, BALL_RADIUS, 0, Math.PI * 2, false)
      context.clip()

      context.shadowColor = 'rgba(0,0,255,0.7)'
      context.shadowOffsetX = -4
      context.shadowOffsetY = -4
      context.shadowBlur = 8

      context.lineWidth = 2
      context.strokeStyle = 'rgba(100,100,195,0.8)'
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

      context.shadowColor = 'rgba(255,255,0,1.0)'
      context.shadowOffsetX = -4
      context.shadowOffsetY = -4
      context.shadowBlur = 8
      context.stroke()

      context.restore()
    }
  },

  [fallOnLedge, moveBall]
)

// Functions.....................................................

const isBallFalling = () => fallingAnimationTimer.isRunning()

const getLedgeUnderBall = () => {
  for (let i = 0; i < ledges.length; i++) {
    const ledge = ledges[i]

    if (
      ball.left + 2 * BALL_RADIUS > ledge.left &&
      ball.left < ledge.left + ledge.width &&
      ball.top + ball.height === ledge.top
    ) {
      return ledge
    }
  }
}

const startFalling = () => {
  fallingAnimationTimer.start()
  ball.velocityX = 110
  ball.velocityY = 200
}

const stopFalling = () => {
  fallingAnimationTimer.stop()
  pushAnimationTimer.stop()

  ball.left = BALL_INITIAL_LOCATION.left
  ball.top = BALL_INITIAL_LOCATION.top
  ball.velocityY = 0
}

const paintLedge = (sprite, context, color) => {
  context.save()

  context.shadowColor = 'rgba(0,0,0,0.5)'
  context.shadowBlur = 8
  context.shadowOffsetX = 2
  context.shadowOffsetY = 2
  context.fillStyle = color

  context.fillRect(sprite.left, sprite.top, sprite.width, sprite.height)

  context.restore()
}

const updateSprites = time => {
  ball.update(context, time)
  ledges.forEach(ledge => ledge.update(context, time))
}

const paintSprites = () => {
  ball.paint(context)
  ledges.forEach(ledge => ledge.paint(context))
}

const animate = time => {
  fps = calculateFps(time, lastTime)
  lastTime = time

  context.clearRect(0, 0, width, height)

  updateSprites(time)

  paintSprites()

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

// Event handlers................................................

thrustersCanvas.onmousedown = e => {
  const rect = thrustersCanvas.getBoundingClientRect()
  const x = e.x || e.clientX

  e.preventDefault()
  e.stopPropagation()

  arrow = x - rect.left > thrusters_width / 2 ? RIGHT : LEFT

  if (pushAnimationTimer.isRunning()) {
    pushAnimationTimer.stop()
    ball.velocityX *= 1.5
  }

  pushAnimationTimer.start()
}

// Initialization................................................
thrustersContext.strokeStyle = 'rgba(100,140,230,0.6)'
thrustersContext.shadowColor = 'rgba(0,0,0,0.3)'
thrustersContext.shadowBlur = 6
thrustersContext.shadowX = 4
thrustersContext.shadowY = 4

ball.left = BALL_INITIAL_LOCATION.left
ball.top = BALL_INITIAL_LOCATION.top
ball.width = BALL_RADIUS * 2
ball.height = BALL_RADIUS * 2
ball.velocityX = 110
ball.velocityY = 0

ledgeInfos.forEach(function(ledgeInfo) {
  const ledge = new Sprite('ledge', {
    paint(sprite, context) {
      paintLedge(sprite, context, ledgeInfo.color)
    }
  })

  ledge.left = ledgeInfo.left
  ledge.top = ledgeInfo.top
  ledge.width = ledgeInfo.width
  ledge.height = ledgeInfo.height

  ledges.push(ledge)
})

window.requestNextAnimationFrame(animate)
