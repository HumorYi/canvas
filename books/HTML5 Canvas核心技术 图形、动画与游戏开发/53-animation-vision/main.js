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
const tree = new Image()
const nearTree = new Image()
// 使用两张草的图片，是为了使草看起来更茂密一点
const grass = new Image()
const grass2 = new Image()
const sky = new Image()
const lastFpsUpdate = { time: 0, value: 0 }
const TREE_VELOCITY = 20
const FAST_TREE_VELOCITY = 40
const SKY_VELOCITY = 8
const GRASS_VELOCITY = 75

let paused = true
let lastTime = 0
let fps = 60
let skyOffset = 0
let grassOffset = 0
let treeOffset = 0
let nearTreeOffset = 0

const draw = () => {
  context.save()

  skyOffset = skyOffset < width ? skyOffset + SKY_VELOCITY / fps : 0

  grassOffset = grassOffset < width ? grassOffset + GRASS_VELOCITY / fps : 0

  treeOffset = treeOffset < width ? treeOffset + TREE_VELOCITY / fps : 0

  nearTreeOffset = nearTreeOffset < width ? nearTreeOffset + FAST_TREE_VELOCITY / fps : 0

  context.save()
  context.translate(-skyOffset, 0)
  context.drawImage(sky, 0, 0)
  context.drawImage(sky, sky.width - 2, 0)
  context.restore()

  context.save()
  context.translate(-treeOffset, 0)
  context.drawImage(tree, 100, 240)
  context.drawImage(tree, 1100, 240)
  context.drawImage(tree, 400, 240)
  context.drawImage(tree, 1400, 240)
  context.drawImage(tree, 700, 240)
  context.drawImage(tree, 1700, 240)
  context.restore()

  context.save()
  context.translate(-nearTreeOffset, 0)
  context.drawImage(nearTree, 250, 220)
  context.drawImage(nearTree, 1250, 220)
  context.drawImage(nearTree, 800, 220)
  context.drawImage(nearTree, 1800, 220)
  context.restore()

  context.save()
  context.translate(-grassOffset, 0)
  context.drawImage(grass, 0, height - grass.height)
  context.drawImage(grass, grass.width - 5, height - grass.height)
  context.drawImage(grass2, 0, height - grass2.height)
  context.drawImage(grass2, grass2.width, height - grass2.height)
  context.restore()
}

const animate = now => {
  if (now === undefined) {
    now = new Date().getTime()
  }

  fps = calculateFps(now, lastTime)
  lastTime = now

  if (!paused) {
    context.clearRect(0, 0, width, height)
    draw()
  }

  requestNextAnimationFrame(animate)
}

context.font = '48px Helvetica'

tree.src = '../shared/images/smalltree.png'
nearTree.src = '../shared/images/tree-twotrunks.png'
grass.src = '../shared/images/grass.png'
grass2.src = '../shared/images/grass2.png'
sky.src = '../shared/images/sky.png'

sky.onload = draw

requestNextAnimationFrame(animate)

animateButton.onclick = () => {
  paused = !paused

  animateButton.value = paused ? 'Animate' : 'Pause'
}