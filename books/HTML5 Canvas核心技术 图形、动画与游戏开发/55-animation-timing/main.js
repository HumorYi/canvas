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

const secondsInput = document.getElementById('seconds')
const startStopButton = document.getElementById('startStopButton')

const dial = new Dial(canvas)
const stopwatch = new Stopwatch()
const polygon = {
  x: width / 2,
  y: height / 2,
  radius: 150
}
const TEXT_MARGIN = 135
const TICK_WIDTH = 15
const ANNOTATIONS_TEXT_SIZE = 18
const ANNOTATIONS_FILL_STYLE = 'rgba(0, 0, 230, 0.9)'

dial.drawAnnotations = (polygon) => {
  let radius = polygon.radius + TEXT_MARGIN - TICK_WIDTH * 2
  let delta = Math.PI / 6

  context.save()
  context.font = ANNOTATIONS_TEXT_SIZE + 'px Arial'
  context.fillStyle = ANNOTATIONS_FILL_STYLE

  for (let angle = Math.PI / 2, i = 0; i < 60; angle += delta, i += 5) {
    context.beginPath()
    context.fillText(i,
      polygon.x + Math.cos(angle) * radius,
      polygon.y - Math.sin(angle) * radius
    )
  }
  context.restore()
}


let timerSetting = 10

const drawDial = () => {
  const initialAngle = -Math.PI / 2 - (Math.PI / 180) * (timerSetting / 60 * 360)
  let angle = initialAngle
  let stopwatchElapsed = stopwatch.getElapsedTime()
  let seconds

  if (stopwatchElapsed) {
    angle = -Math.PI / 2 - Math.PI / 180 * ((timerSetting - stopwatchElapsed / 1000) / 60 * 360)
    seconds = parseFloat(timerSetting - stopwatchElapsed / 1000).toFixed(2)
    if (seconds > 0) {
      secondsInput.value = seconds
    }
  }

  dial.draw(polygon, polygon.x, polygon.y, angle)
}

const animate = () => {
  if (!stopwatch.isRunning()) {
    return
  }

  if (stopwatch.getElapsedTime() > timerSetting * 1000) { // animation is over
    stopwatch.stop()
    startStopButton.value = 'Start'
    secondsInput.disabled = false
    secondsInput.value = 0
  }
  else { // animation is running
    redraw()
    requestNextAnimationFrame(animate)
  }
}

const redraw = () => {
  context.clearRect(0, 0, width, height)
  drawGrid(context)
  drawDial()
}

drawGrid(context)

context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.shadowBlur = 4

context.textAlign = 'center'
context.textBaseline = 'middle'

drawDial()


startStopButton.onclick = () => {
  const value = startStopButton.value

  timerSetting = parseFloat(secondsInput.value)

  if (value === 'Start') {
    stopwatch.start()
    startStopButton.value = 'Stop'
    secondsInput.disabled = true
    requestNextAnimationFrame(animate)
  }
  else {
    stopwatch.stop()
    startStopButton.value = 'Start'
    secondsInput.disabled = false
  }

  stopwatch.reset()
}