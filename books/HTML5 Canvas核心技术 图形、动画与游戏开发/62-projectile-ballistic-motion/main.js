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

const scoreboard = document.getElementById('scoreboard')
const launchVelocityOutput = document.getElementById('launchVelocityOutput')
const launchAngleOutput = document.getElementById('launchAngleOutput')

const LAUNCHPAD_X = 50
const LAUNCHPAD_Y = context.canvas.height - 50
const LAUNCHPAD_WIDTH = 50
const LAUNCHPAD_HEIGHT = 12

const BALL_RADIUS = 8

const ARENA_LENGTH_IN_METERS = 10
const pixelsPerMeter = width / ARENA_LENGTH_IN_METERS

const INITIAL_LAUNCH_ANGLE = Math.PI / 4

let threePointer = false
let ballInFlight = false
let needInstructions = false

let score = 0
let lastScore = 0
let launchVelocity = 0
let launchAngle = INITIAL_LAUNCH_ANGLE

let elapsedTime = 0
let launchTime = 0

const BUCKET_X = 668
const BUCKET_Y = height - 100

const lastMouse = { left: 0, top: 0 }

const ballPainter = {
  BALL_FILL_STYLE: 'rgb(255,255,0)',
  BALL_STROKE_STYLE: 'rgb(0,0,0,0.4)',
  paint(sprite, context) {
    context.save()

    context.shadowColor = undefined
    context.lineWidth = 2
    context.fillStyle = this.BALL_FILL_STYLE
    context.strokeStyle = this.BALL_STROKE_STYLE

    context.beginPath()
    context.arc(sprite.left, sprite.top, sprite.radius, 0, Math.PI * 2, false)

    context.clip()
    context.fill()
    context.stroke()

    context.restore()
  }
}

const reset = () => {
  ball.left = LAUNCHPAD_X + LAUNCHPAD_WIDTH / 2
  ball.top = LAUNCHPAD_Y - ball.height / 2
  ball.velocityX = 0
  ball.velocityY = 0
  ballInFlight = false
  needInstructions = false
  lastScore = 0
}

const lob = {
  lastTime: 0,
  GRAVITY_FORCE: 9.81, // m/s/s
  applyGravity(elapsed) {
    ball.velocityY = this.GRAVITY_FORCE * elapsed - launchVelocity * Math.sin(launchAngle)
  },
  updateBallPosition(updateDelta) {
    ball.left += ball.velocityX * updateDelta * pixelsPerMeter
    ball.top += ball.velocityY * updateDelta * pixelsPerMeter
  },
  checkForThreePointer() {
    if (ball.top < 0) {
      threePointer = true
    }
  },
  checkBallBounds() {
    if (ball.top > height || ball.left > width) {
      reset()
    }
  },
  execute(sprite, context, time) {
    let elapsedFrameTime = 0
    let elapsedFlightTime = 0

    if (ballInFlight) {
      elapsedFrameTime = (time - this.lastTime) / 1000
      elapsedFlightTime = (time - launchTime) / 1000

      this.applyGravity(elapsedFlightTime)
      this.updateBallPosition(elapsedFrameTime)
      this.checkForThreePointer()
      this.checkBallBounds()
    }

    this.lastTime = time
  }
}

const ball = new Sprite('ball', ballPainter, [lob])

const bucketImage = new Image()

const catchBall = {
  ballInBucket() {
    return (
      ball.left > bucket.left + bucket.width / 2 &&
      ball.left < bucket.left + bucket.width &&
      ball.top > bucket.top &&
      ball.top < bucket.top + bucket.height / 3
    )
  },
  adjustScore() {
    lastScore = threePointer ? 3 : 2

    score += lastScore
    scoreboard.innerText = score
  },
  execute(sprite, context, time) {
    if (ballInFlight && this.ballInBucket()) {
      reset()
      this.adjustScore()
    }
  }
}

const bucket = new Sprite(
  'bucket',
  {
    paint(sprite, context) {
      context.drawImage(bucketImage, BUCKET_X, BUCKET_Y)
    }
  },

  [catchBall]
)

const launchPadPainter = {
  LAUNCHPAD_FILL_STYLE: 'rgb(100,140,230)',
  paint(sprite, context) {
    context.save()

    context.fillStyle = this.LAUNCHPAD_FILL_STYLE
    context.fillRect(LAUNCHPAD_X, LAUNCHPAD_Y, LAUNCHPAD_WIDTH, LAUNCHPAD_HEIGHT)

    context.restore()
  }
}

const launchPad = new Sprite('launchPad', launchPadPainter)

const drawGuideWire = () => {
  context.moveTo(ball.left, ball.top)
  context.lineTo(lastMouse.left, lastMouse.top)
  context.stroke()
}

const showText = text => {
  let x = 0
  let y = height / 2

  context.font = '42px Helvetica'

  x = width / 2 - context.measureText(text).width / 2

  context.save()

  context.shadowColor = undefined
  context.strokeStyle = 'rgb(80,120,210)'
  context.fillStyle = 'rgba(100,140,230,0.5)'

  context.fillText(text, x, y)
  context.strokeText(text, x, y)

  context.restore()
}

const updateBackgroundText = () => {
  let text = ''

  if (lastScore == 3) {
    text = 'Three pointer!'
  } else if (lastScore == 2) {
    text = 'Nice shot!'
  } else if (needInstructions) {
    text = 'Click to launch ball'
  }

  text && showText(text)
}

const resetScoreLater = () => {
  setTimeout(() => {
    lastScore = 0
  }, 1000)
}

const updateSprites = time => {
  launchPad.update(context, time)
  bucket.update(context, time)
  ball.update(context, time)
}

const paintSprites = () => {
  launchPad.paint(context)
  bucket.paint(context)
  ball.paint(context)
}

const animate = time => {
  elapsedTime = (time - launchTime) / 1000
  context.clearRect(0, 0, width, height)

  if (!ballInFlight) {
    drawGuideWire()
    updateBackgroundText()

    lastScore !== 0 && resetScoreLater()
  }

  updateSprites(time)
  paintSprites()

  window.requestNextAnimationFrame(animate)
}

// Event handlers................................................

canvas.onmousedown = e => {
  e.preventDefault()

  if (ballInFlight) {
    return
  }

  ball.velocityX = launchVelocity * Math.cos(launchAngle)
  ball.velocityY = launchVelocity * Math.sin(launchAngle)
  ballInFlight = true
  threePointer = false
  launchTime = new Date().getTime()
}

canvas.onmousemove = e => {
  let loc = {}
  let deltaX = 0
  let deltaY = 0

  e.preventDefault()

  if (ballInFlight) {
    return
  }

  loc = windowToCanvas(canvas, e.clientX, e.clientY)
  lastMouse.left = loc.x
  lastMouse.top = loc.y

  deltaX = Math.abs(lastMouse.left - ball.left)
  deltaY = Math.abs(lastMouse.top - ball.top)

  launchAngle = Math.atan(parseFloat(deltaY) / parseFloat(deltaX))
  launchVelocity = (4 * deltaY) / Math.sin(launchAngle) / pixelsPerMeter

  launchVelocityOutput.innerText = launchVelocity.toFixed(2)
  launchAngleOutput.innerText = ((launchAngle * 180) / Math.PI).toFixed(2)
}

// Initialization................................................

ball.width = BALL_RADIUS * 2
ball.height = ball.width
ball.left = LAUNCHPAD_X + LAUNCHPAD_WIDTH / 2
ball.top = LAUNCHPAD_Y - ball.height / 2
ball.radius = BALL_RADIUS

context.lineWidth = 0.5
context.strokeStyle = 'rgba(0,0,0,0.5)'
context.shadowColor = 'rgba(0,0,0,0.5)'
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.shadowBlur = 4
context.stroke()

bucketImage.src = '../shared/images/bucket.png'
bucketImage.onload = () => {
  bucket.left = BUCKET_X
  bucket.top = BUCKET_Y
  bucket.width = bucketImage.width
  bucket.height = bucketImage.height
}

window.requestNextAnimationFrame(animate)
