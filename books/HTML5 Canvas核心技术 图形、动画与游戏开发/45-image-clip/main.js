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

const offscreenCanvas = document.createElement('canvas')
const offscreenContext = offscreenCanvas.getContext('2d')
offscreenCanvas.width = width
offscreenCanvas.height = height

const sunglassButton = document.getElementById('sunglassButton')
const sunglassFilter = new Worker('sunglassFilter.js')

const LENS_RADIUS = width / 5

const reset = () => context.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)

const drawLenses = (leftLensLocation, rightLensLocation) => {
  context.save()

  context.beginPath()

  context.arc(leftLensLocation.x, leftLensLocation.y, LENS_RADIUS, 0, Math.PI * 2, false)

  context.moveTo(rightLensLocation.x, rightLensLocation.y)

  context.arc(rightLensLocation.x, rightLensLocation.y, LENS_RADIUS, 0, Math.PI * 2, false)

  context.stroke()

  context.clip()

  context.drawImage(offscreenCanvas, 0, 0, width, height)

  context.restore()
}

const drawWire = center => {
  context.save()

  context.beginPath()

  context.moveTo(center.x - LENS_RADIUS / 4, center.y - LENS_RADIUS / 2)

  context.quadraticCurveTo(
    center.x,
    center.y - LENS_RADIUS + 20,
    center.x + LENS_RADIUS / 4,
    center.y - LENS_RADIUS / 2
  )

  context.stroke()

  context.restore()
}

const drawConnectors = center => {
  context.save()

  context.beginPath()

  context.fillStyle = 'silver'
  context.strokeStyle = 'rgba(0,0,0,0.4)'
  context.lineWidth = 2

  context.arc(center.x - LENS_RADIUS / 4, center.y - LENS_RADIUS / 2, 4, 0, Math.PI * 2, false)
  context.fill()
  context.stroke()

  context.beginPath()
  context.arc(center.x + LENS_RADIUS / 4, center.y - LENS_RADIUS / 2, 4, 0, Math.PI * 2, false)
  context.fill()
  context.stroke()

  context.restore()
}

const putSunglassesOn = () => {
  const center = {
    x: width / 2,
    y: height / 2
  }
  const leftLensLocation = {
    x: center.x - LENS_RADIUS - 10,
    y: center.y
  }
  const rightLensLocation = {
    x: center.x + LENS_RADIUS + 10,
    y: center.y
  }

  sunglassFilter.postMessage(context.getImageData(0, 0, width, height))

  sunglassFilter.onmessage = event => {
    offscreenContext.putImageData(event.data, 0, 0)
    drawLenses(leftLensLocation, rightLensLocation)
    drawWire(center)
    drawConnectors(center)
  }
}

image.src = '../shared/images/curved-road.png'
image.onload = reset

sunglassButton.onclick = () => (sunglassButton.checked ? putSunglassesOn() : reset())
