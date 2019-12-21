/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 入口文件
 *  在播放淡入动画时，图像一开始是不会显示出来的，不能直接从屏幕 canvas 之中补货其像素值，
 *  先把图像绘制在离屏 canvas 中，然后从改 canvas 里捕获像素值
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

const fadeInButton = document.getElementById('fadeInButton')

let imagedata = null
let imagedataOffscreen = null
let interval = null

const reset = () => offscreenContext.drawImage(image, 0, 0)

const increaseTransparency = (imagedata, steps) => {
  let alpha = 0
  let currentAlpha = 0
  let step = 0
  let dataLen = imagedata.data.length

  // 遍历每个透明像素
  for (let i = 3; i < dataLen; i += 4) {
    alpha = imagedataOffscreen.data[i]

    // 尚未完全透明
    if (alpha > 0) {
      currentAlpha = imagedata.data[i]
      step = Math.ceil(alpha / steps)

      // 还未达到初始透明，减低透明度
      if (alpha > currentAlpha + step) {
        imagedata.data[i] += step
      } else {
        // 已达到初始透明，设置为初始透明度
        imagedata.data[i] = alpha
      }
    }
  }
}

const fadeIn = (context, imagedata, steps, millisecondsPerStep) => {
  let frame = 0
  let dataLen = imagedata.data.length

  // 重置不透明度为 0
  for (let i = 3; i < dataLen; i += 4) {
    imagedata.data[i] = 0
  }

  interval = setInterval(() => {
    frame++

    // 动画结束，清除定时器，1s后恢复原图
    if (frame > steps) {
      clearInterval(interval)
    } else {
      increaseTransparency(imagedata, steps)
      context.putImageData(imagedata, 0, 0)
    }
  }, millisecondsPerStep)
}

image.src = '../shared/images/log-crossing.png'
image.onload = () => {
  reset()

  imagedataOffscreen = offscreenContext.getImageData(0, 0, width, height)
}

fadeInButton.onclick = () => {
  fadeIn(context, offscreenContext.getImageData(0, 0, width, height), 50, 1000 / 60)
}
