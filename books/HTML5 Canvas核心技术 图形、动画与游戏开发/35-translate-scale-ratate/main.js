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

const angle = Math.PI / 50
let origin = {
  x: width / 2,
  y: height / 2
}

let paused = true
let clockwise = true
let fontHeight = 128
let scale = 1.008
let timer = null

const drawText = (text = 'Spinning') => {
  context.fillText(text, 0, 0);
  context.strokeText(text, 0, 0);
}

const init = () => {
  origin = {
    x: width / 2,
    y: height / 2
  }

  paused = true
  clockwise = true
  fontHeight = 128
  scale = 1.008

  context.transform(1, 0, 0, 1, origin.x, origin.y)
  drawText()
}

const play = () => setInterval(() => {
  if (!paused) {
    context.clearRect(-origin.x, -origin.y, width, height)

    context.rotate(clockwise ? angle : -angle)
    context.scale(scale, scale)

    drawText()
  }
}, 1000 / 60)

context.font = fontHeight + 'px Palatino'

context.fillStyle = 'cornflowerblue'
context.strokeStyle = 'yellow'

context.shadowColor = 'rgba(100, 100, 150, 0.8)'
context.shadowOffsetX = 5
context.shadowOffsetY = 5
context.shadowBlur = 10

context.textAlign = 'center'
context.textBaseline = 'middle'

init()

timer = play()

canvas.onclick = () => {
  paused = !paused

  if (!paused) {
    clockwise = !clockwise
    scale = 1 / scale
  }
  // else {
  //   // TODO: 检测 transform 和 清除画布 正确性
  //   context.clearRect(origin.x, origin.y, width, height)
  //   clearInterval(timer)
  //   init()
  //   timer = play()
  // }
}