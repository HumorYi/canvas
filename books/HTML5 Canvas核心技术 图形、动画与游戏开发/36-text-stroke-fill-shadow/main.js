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

const fillCheckbox = document.getElementById('fillCheckbox')
const strokeCheckbox = document.getElementById('strokeCheckbox')
const shadowCheckbox = document.getElementById('shadowCheckbox')
const text = 'HTML5'

const draw = () => {
  context.clearRect(0, 0, width, height)

  drawBackground()

  shadowCheckbox.checked ? turnShadowsOn() : turnShadowsOff()

  drawText()
}

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

const turnShadowsOn = () => {
  context.shadowColor = 'rgba(0, 0, 0, 0.8)'
  context.shadowOffsetX = 5
  context.shadowOffsetY = 5
  context.shadowBlur = 10
}

const turnShadowsOff = () => {
  context.shadowColor = undefined
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0
  context.shadowBlur = 0
}

const drawText = () => {
  const TEXT_X = 65
  const TEXT_Y = height / 2 + 35

  context.strokeStyle = 'blue'

  fillCheckbox.checked && context.fillText(text, TEXT_X, TEXT_Y)
  strokeCheckbox.checked && context.strokeText(text, TEXT_X, TEXT_Y)
}

// Event handlers.....................................................

fillCheckbox.onchange = draw
strokeCheckbox.onchange = draw
shadowCheckbox.onchange = draw

// Initialization.....................................................

context.font = '128px Palatino'
context.lineWidth = 1.0
context.fillStyle = 'cornflowerblue'

draw()