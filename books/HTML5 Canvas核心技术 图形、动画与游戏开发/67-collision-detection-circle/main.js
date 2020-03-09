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

const launchVelocityOutput = document.getElementById('launchVelocityOutput')
const launchAngleOutput = document.getElementById('launchAngleOutput')

const BALL_RADIUS = 8
const ARENA_LENGTH_IN_METERS = 10

const ballPainter = {
  BALL_FILL_STYLE: 'rgb(255,255,0)',
  BALL_STROKE_STYLE: 'rgb(0,0,0,0.4)',

  paint(ball, context) {
    context.save()
    context.shadowColor = undefined
    context.lineWidth = 2
    context.fillStyle = this.BALL_FILL_STYLE
    context.strokeStyle = this.BALL_STROKE_STYLE

    context.beginPath()
    context.arc(ball.left + BALL_RADIUS, ball.top + BALL_RADIUS, ball.radius, 0, Math.PI * 2, false)

    context.clip()
    context.fill()
    context.stroke()
    context.restore()
  }
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

  execute(ball, context, time) {
    var updateDelta, elapsedFlightTime

    if (ballInFlight) {
      updateDelta = Math.abs(time - this.lastTime) / 1000
      elapsedFlightTime = Math.abs(time - launchTime) / 1000

      this.applyGravity(elapsedFlightTime)
      this.updateBallPosition(updateDelta)
      this.checkForThreePointer()
      this.checkBallBounds()
    }

    this.lastTime = time
  }
}
const ball = new Sprite('ball', ballPainter, [lob])

const launchPadPainter = {
  LAUNCHPAD_FILL_STYLE: 'rgb(100,140,230)',

  paint(ledge, context) {
    context.save()
    context.fillStyle = this.LAUNCHPAD_FILL_STYLE
    context.fillRect(LAUNCHPAD_X, LAUNCHPAD_Y, LAUNCHPAD_WIDTH, LAUNCHPAD_HEIGHT)
    context.restore()
  }
}
const launchPad = new Sprite('launchPad', launchPadPainter)

const catchBall = {
  isBallInBucket() {
    const ballCenter = { x: ball.left + BALL_RADIUS, y: ball.top + BALL_RADIUS }
    const distance = Math.sqrt(
      Math.pow(bucketHitCenter.x - ballCenter.x, 2) + Math.pow(bucketHitCenter.y - ballCenter.y, 2)
    )

    return distance < BALL_RADIUS + bucketHitRadius
  },

  adjustScore() {
    lastScore = threePointer ? 3 : 2
    score += lastScore
    scoreboard.innerHTML = score
  },

  execute(bucket, context, time) {
    if (ballInFlight && this.isBallInBucket()) {
      reset()
      // freeze();
      this.adjustScore()
    }
  }
}
const bucketImage = new Image()
const bucket = new Sprite(
  'bucket',
  {
    paint(sprite, context) {
      context.drawImage(bucketImage, BUCKET_LEFT, BUCKET_TOP)
      context.fillStyle = 'white'
      context.beginPath()
      context.arc(bucketHitCenter.x, bucketHitCenter.y, bucketHitRadius, 0, Math.PI * 2, false)
      context.fill()
    }
  },

  [catchBall]
)

const INITIAL_LAUNCH_ANGLE = Math.PI / 4

const LAUNCHPAD_X = 50
const LAUNCHPAD_Y = height - 50
const LAUNCHPAD_WIDTH = 50
const LAUNCHPAD_HEIGHT = 12

const BUCKET_LEFT = 668
const BUCKET_TOP = height - 100
const BUCKET_WIDTH = 83
const BUCKET_HEIGHT = 62

const bucketHitCenter = { x: BUCKET_LEFT + (2 * BUCKET_WIDTH) / 3, y: BUCKET_TOP + BUCKET_HEIGHT / 8 }
const bucketHitRadius = BUCKET_WIDTH / 8

let launchAngle = INITIAL_LAUNCH_ANGLE
let launchVelocity = 0
let launchTime = 0

let score = 0
let lastScore = 0
let lastMouse = { left: 0, top: 0 }

let ballInFlight = false
let threePointer = false
let needInstructions = true
let pixelsPerMeter = width / ARENA_LENGTH_IN_METERS

const freeze = () => {
  ball.velocityX = 0
  ball.velocityY = 0
  ballInFlight = false
  needInstructions = false
}

const reset = () => {
  ball.left = LAUNCHPAD_X + LAUNCHPAD_WIDTH / 2 - BALL_RADIUS
  ball.top = LAUNCHPAD_Y - ball.height / 2 - BALL_RADIUS
  ball.velocityX = 0
  ball.velocityY = 0
  ballInFlight = false
  needInstructions = false
  lastScore = 0
}

const drawGuidewire = () => {
  context.moveTo(ball.left + BALL_RADIUS, ball.top + BALL_RADIUS)
  context.lineTo(lastMouse.left, lastMouse.top)
  context.stroke()
}

const showText = text => {
  const x = width / 2 - context.measureText(text).width / 2
  const y = height / 2

  context.save()
  context.shadowColor = undefined
  context.strokeStyle = 'navy'
  context.fillStyle = 'goldenrod'

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

const drawRubberband = () => {
  context.beginPath()
  context.moveTo(ball.left + BALL_RADIUS, ball.top + BALL_RADIUS)
  context.lineTo(bucketHitCenter.x, bucketHitCenter.y)
  context.stroke()
}

const animate = time => {
  context.clearRect(0, 0, width, height)

  if (!ballInFlight) {
    drawGuidewire()
    updateBackgroundText()

    lastScore !== 0 && resetScoreLater()
  }

  updateSprites(time)
  paintSprites()

  drawRubberband()

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
  e.preventDefault()

  if (ballInFlight) {
    return
  }

  const loc = mouseToCanvas(e)
  lastMouse.left = loc.x
  lastMouse.top = loc.y

  const deltaX = Math.abs(lastMouse.left - ball.left)
  const deltaY = Math.abs(lastMouse.top - ball.top)

  launchAngle = Math.atan(parseFloat(deltaY) / parseFloat(deltaX))
  launchVelocity = (4 * deltaY) / Math.sin(launchAngle) / pixelsPerMeter

  launchVelocityOutput.innerHTML = launchVelocity.toFixed(2)
  launchAngleOutput.innerHTML = ((launchAngle * 180) / Math.PI).toFixed(2)
}

// Initialization................................................

ball.width = BALL_RADIUS * 2
ball.height = ball.width
ball.left = LAUNCHPAD_X + LAUNCHPAD_WIDTH / 2 - BALL_RADIUS
ball.top = LAUNCHPAD_Y - ball.height / 2 - BALL_RADIUS
ball.radius = BALL_RADIUS

context.lineWidth = 0.5
context.strokeStyle = 'rgba(0,0,0,0.5)'
context.shadowColor = 'rgba(0,0,0,0.5)'
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.shadowBlur = 4
context.stroke()

context.font = '72px fantasy'

bucketImage.src = '../shared/images/bucket.png'
bucketImage.onload = () => {
  bucket.left = BUCKET_LEFT
  bucket.top = BUCKET_TOP
  bucket.width = BUCKET_WIDTH
  bucket.height = BUCKET_HEIGHT
}

animate(new Date().getTime())
