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
const animateButton = document.getElementById('animateButton')
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

const runInPlace = {
  lastAdvance: 0,
  PAGEFLIP_INTERVAL: 100,

  execute(sprite, context, time) {
    if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
      sprite.painter.advance()
      this.lastAdvance = time
    }
  }
}

const moveLeftToRight = {
  lastMove: 0,

  execute(sprite, context, time) {
    if (this.lastMove !== 0) {
      sprite.left -= sprite.velocityX * ((time - this.lastMove) / 1000)

      if (sprite.left < 0) {
        sprite.left = width
      }
    }

    this.lastMove = time
  }
}

const sprite = new Sprite('runner', new SpriteSheetPainter(runnerCells), [runInPlace, moveLeftToRight])

let paused = false

const animate = time => {
  if (paused) { return }

  context.clearRect(0, 0, width, height)

  drawBackground(context, width, height)

  context.drawImage(spritesheet, 0, 0)

  sprite.update(context, time)
  sprite.paint(context)

  window.requestNextAnimationFrame(animate)
}

const startAnimation = () => {
  animateButton.value = 'Pause'
  paused = false

  window.requestNextAnimationFrame(animate)
}

const pauseAnimation = () => {
  animateButton.value = 'Animate'
  paused = true
}

spritesheet.src = '../shared/images/running-sprite-sheet.png'
spritesheet.onload = () => context.drawImage(spritesheet, 0, 0)
sprite.velocityX = 50
sprite.left = 200
sprite.top = 100

context.strokeStyle = 'lightgray'
context.lineWidth = 0.5

animateButton.onclick = () => animateButton.value === 'Animate' ? startAnimation() : pauseAnimation()

window.requestNextAnimationFrame(animate)