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
const poster = new Image()

const offscreenCanvas = document.createElement('canvas')
const offscreenContext = offscreenCanvas.getContext('2d')
offscreenCanvas.width = width
offscreenCanvas.height = height

const controlButton = document.getElementById('controlButton')
const flipCheckbox = document.getElementById('flipCheckbox')
const colorCheckbox = document.getElementById('colorCheckbox')

let imageData = null

const removeColor = () => {
  var data, average

  imageData = offscreenContext.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height)

  data = imageData.data
  width = data.width

  for (i = 0; i < data.length - 4; i += 4) {
    average = (data[i] + data[i + 1] + data[i + 2]) / 3
    data[i] = average
    data[i + 1] = average
    data[i + 2] = average
  }

  offscreenContext.putImageData(imageData, 0, 0)
}

const drawFlipped = () => {
  context.save()

  context.translate(canvas.width / 2, canvas.height / 2)
  context.rotate(Math.PI)
  context.translate(-canvas.width / 2, -canvas.height / 2)
  context.drawImage(offscreenCanvas, 0, 0)

  context.restore()
}

const nextVideoFrame = () => {
  if (video.ended) {
    controlButton.value = 'Play'
  } else {
    offscreenContext.drawImage(video, 0, 0)

    if (!colorCheckbox.checked) removeColor()

    if (flipCheckbox.checked) drawFlipped()
    else context.drawImage(offscreenCanvas, 0, 0)

    requestNextAnimationFrame(nextVideoFrame)
  }
}

const startPlaying = () => {
  requestNextAnimationFrame(nextVideoFrame)

  video.play()
}

const stopPlaying = () => {
  video.pause()
}

poster.src = '../shared/images/curved-road.png'
poster.onload = () => {
  context.drawImage(poster, 0, 0)
}

controlButton.onclick = () => {
  if (controlButton.value === 'Play') {
    startPlaying()
    controlButton.value = 'Pause'
  } else {
    stopPlaying()
    controlButton.value = 'Play'
  }
}
