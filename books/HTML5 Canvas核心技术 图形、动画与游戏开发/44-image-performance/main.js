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

const sunglassButton = document.getElementById('sunglassButton')
const sunglassFilter = new Worker('sunglassFilter.js')

const reset = () => context.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)

const putSunglassesOn = () => {
  sunglassFilter.postMessage(context.getImageData(0, 0, width, height))

  sunglassFilter.onmessage = event => context.putImageData(event.data, 0, 0)
}

image.src = '../shared/images/curved-road.png'
image.onload = reset

sunglassButton.onclick = () => (sunglassButton.checked ? putSunglassesOn() : reset())
