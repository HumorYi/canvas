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

const image = new Image()
const gradient = context.createLinearGradient(0, 0, width, height)
const text = 'Canvas'
let pattern = null

const drawBackground = () => {
  const STEP_Y = 12
  const TOP_MARGIN = STEP_Y * 4
  const LEFT_MARGIN = STEP_Y * 3
  let i = height

  // Horizontal lines

  context.strokeStyle = 'lightgray'
  context.lineWidth = 0.5

  while (i > TOP_MARGIN) {
    context.beginPath()

    context.moveTo(0, i)
    context.lineTo(width, i)

    context.stroke()

    i -= STEP_Y
  }

  // Vertical line

  context.strokeStyle = 'rgba(100,0,0,0.3)'
  context.lineWidth = 1

  context.beginPath()

  context.moveTo(LEFT_MARGIN, 0)
  context.lineTo(LEFT_MARGIN, height)
  context.stroke()
}

const drawGradientText = () => {
  context.fillStyle = gradient
  context.fillText(text, 65, 200)
  context.strokeText(text, 65, 200)
}

const drawPatternText = () => {
  context.fillStyle = pattern
  context.fillText(text, 65, 450)
  context.strokeText(text, 65, 450)
}

image.src = 'redball.png'

image.onload = () => {
  pattern = context.createPattern(image, 'repeat')
  drawPatternText()
}

context.font = '256px Palatino'
context.strokeStyle = 'cornflowerblue'

context.shadowColor = 'rgba(100, 100, 150, 0.8)'
context.shadowOffsetX = 5
context.shadowOffsetY = 5
context.shadowBlur = 10

gradient.addColorStop(0, 'blue')
gradient.addColorStop(0.25, 'blue')
gradient.addColorStop(0.5, 'white')
gradient.addColorStop(0.75, 'red')
gradient.addColorStop(1.0, 'yellow')

drawBackground()
drawGradientText()