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

const linearRadio = document.getElementById('linearRadio')
const easeInRadio = document.getElementById('easeInRadio')
const easeOutRadio = document.getElementById('easeOutRadio')
const easeInOutRadio = document.getElementById('easeInOutRadio')

const animateButton = document.getElementById('animateButton')

const linear = AnimationTimer.makeLinear()
const easeIn = AnimationTimer.makeEaseIn(1)
const easeOut = AnimationTimer.makeEaseOut(1)
const easeInOut = AnimationTimer.makeEaseInOut()

const spritesheet = new Image()

const runnerCells = [
  { left: 0, top: 0, width: 47, height: 64 },
  { left: 55, top: 0, width: 44, height: 64 },
  { left: 107, top: 0, width: 39, height: 64 },
  { left: 152, top: 0, width: 46, height: 64 },
  { left: 208, top: 0, width: 49, height: 64 },
  { left: 265, top: 0, width: 46, height: 64 },
  { left: 320, top: 0, width: 42, height: 64 },
  { left: 380, top: 0, width: 35, height: 64 },
  { left: 425, top: 0, width: 35, height: 64 },
]

const SPRITE_LEFT = width - runnerCells[0].width
const SPRITE_TOP = 10
const PAGEFLIP_INTERVAL = 100

const LEFT = 1.5
const RIGHT = SPRITE_LEFT
const WIDTH = RIGHT - LEFT

const moveRightToLeft = {
  lastMove: 0,
  reset() {
    this.lastMove = 0
  },
  execute(sprite, context, time) {
    const elapsed = animationTimer.getElapsedTime()
    const advanceElapsed = elapsed - this.lastMove

    this.lastMove = elapsed

    if (this.lastMove !== 0) {
      sprite.left -= (advanceElapsed / 1000) * sprite.velocityX;
    }
  }
}

const runInPlace = {
  execute(sprite, context, time) {
    const elapsed = animationTimer.getElapsedTime()

    if (lastAdvance === 0) {  // skip first time
      lastAdvance = elapsed
    }
    else if (elapsed - lastAdvance > PAGEFLIP_INTERVAL) {
      sprite.painter.advance()
      lastAdvance = elapsed
    }
  }
}

const sprite = new Sprite(
  'runner',
  new SpriteSheetPainter(runnerCells),
  [moveRightToLeft, runInPlace]
)

const AXIS_MARGIN = 40
const AXIS_ORIGIN = { x: 6, y: canvas.height - AXIS_MARGIN / 4 }
const AXIS_TOP = 0
const AXIS_RIGHT = canvas.width
const HORIZONTAL_TICK_SPACING = 10
const VERTICAL_TICK_SPACING = 10
const AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x
const AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP
const NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING
const NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING
const TICK_WIDTH = 10
const TICKS_LINEWIDTH = 0.5
const TICKS_COLOR = 'navy'
const AXIS_LINEWIDTH = 1.0
const AXIS_COLOR = 'blue'

const ANIMATION_DURATION = 3900
const animationTimer = new AnimationTimer(ANIMATION_DURATION)

let lastAdvance = 0

const startAnimation = () => {
  animateButton.style.display = 'none'
  animationTimer.start()
  window.requestNextAnimationFrame(animate)
}

const endAnimation = () => {
  animateButton.value = 'Animate'
  animateButton.style.display = 'inline'
  animationTimer.stop()

  lastAdvance = 0
  sprite.painter.cellIndex = 0
  sprite.left = SPRITE_LEFT
  animationTimer.reset()
  moveRightToLeft.reset()
}

const drawTimeline = () => {
  const realPercent = animationTimer.getRealElapsedTime() / ANIMATION_DURATION
  const x = (1 - realPercent) * WIDTH

  context.save()

  context.lineWidth = 0.5
  context.strokeStyle = 'rgba(0, 0, 255, 0.5)'

  context.beginPath()

  context.moveTo(x, 0)
  context.lineTo(x, height)

  context.stroke()

  context.restore()
}

const animate = time => {
  if (!animationTimer.isRunning()) {
    return
  }

  context.clearRect(0, 0, width, height)

  sprite.update(context, time)
  sprite.paint(context)

  drawTimeline()

  drawAxis(
    context,
    AXIS_COLOR,
    AXIS_LINEWIDTH,
    TICKS_LINEWIDTH,
    TICKS_COLOR, AXIS_ORIGIN,
    AXIS_RIGHT, AXIS_TOP,
    NUM_HORIZONTAL_TICKS,
    NUM_VERTICAL_TICKS,
    TICK_WIDTH,
    HORIZONTAL_TICK_SPACING,
    VERTICAL_TICK_SPACING
  )

  animationTimer.isOver() && endAnimation()

  window.requestNextAnimationFrame(animate)
}

// Event handlers................................................

animateButton.onclick = () => {
  animateButton.value === 'Animate' ? startAnimation() : endAnimation()
}

linearRadio.onchange = () => {
  animationTimer .timeWarp = linear
}

easeInRadio.onchange = () => {
  animationTimer .timeWarp = easeIn
}

easeOutRadio.onchange = () => {
  animationTimer .timeWarp = easeOut
}

easeInOutRadio.onchange = () => {
  animationTimer .timeWarp = easeInOut
}

// Initialization................................................
spritesheet.src = '../shared/images/running-sprite-sheet.png'
sprite.left = SPRITE_LEFT
sprite.top = SPRITE_TOP
sprite.velocityX = 100 // pixels/second

spritesheet.onload = () => sprite.paint(context)

drawAxis(
  context,
  AXIS_COLOR,
  AXIS_LINEWIDTH,
  TICKS_LINEWIDTH,
  TICKS_COLOR, AXIS_ORIGIN,
  AXIS_RIGHT, AXIS_TOP,
  NUM_HORIZONTAL_TICKS,
  NUM_VERTICAL_TICKS,
  TICK_WIDTH,
  HORIZONTAL_TICK_SPACING,
  VERTICAL_TICK_SPACING
)