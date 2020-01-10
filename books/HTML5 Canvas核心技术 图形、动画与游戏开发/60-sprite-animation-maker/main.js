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
const explosionButton = document.getElementById('explosionButton')

const BOMB_LEFT = 100
const BOMB_TOP = 80
const BOMB_WIDTH = 180
const BOMB_HEIGHT = 130

const NUM_EXPLOSION_PAINTERS = 9
const NUM_FUSE_PAINTERS = 9

// Painters..................................................

const bombPainter = new ImagePainter('../shared/images/bomb.png')
const bombNoFusePainter = new ImagePainter('bomb-no-fuse.png')
const fuseBurningPainters = []
const explosionPainters = []

for (var i = 0; i < NUM_FUSE_PAINTERS; ++i) {
  fuseBurningPainters.push(new ImagePainter('fuse-0' + i + '.png'))
}

for (var i = 0; i < NUM_EXPLOSION_PAINTERS; ++i) {
  explosionPainters.push(new ImagePainter('explosion-0' + i + '.png'))
}

// Bomb......................................................

const bomb = new Sprite('bomb', bombPainter)
bomb.left = BOMB_LEFT
bomb.top = BOMB_TOP
bomb.width = BOMB_WIDTH
bomb.height = BOMB_HEIGHT

// Animators.................................................

const fuseBurningAnimator = new SpriteAnimator(fuseBurningPainters, () => {
  bomb.painter = bombNoFusePainter
})

const explosionAnimator = new SpriteAnimator(explosionPainters, () => {
  bomb.painter = bombNoFusePainter
})

const animate = now => {
  context.clearRect(0, 0, width, height)
  bomb.paint(context)
  window.requestNextAnimationFrame(animate)
}

// Event Handlers................................................

explosionButton.onclick = () => {
  if (bomb.animating) {
    return
  }

  fuseBurningAnimator.start(bomb, 2000)

  setTimeout(() => {
    explosionAnimator.start(bomb, 1000)

    setTimeout(() => {
      bomb.painter = bombPainter
    }, 2000)
  }, 3000)
}

window.requestNextAnimationFrame(animate)