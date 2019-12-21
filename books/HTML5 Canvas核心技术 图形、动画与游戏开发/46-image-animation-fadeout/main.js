/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription: 入口文件
 *  淡出动画效果的难点在于每个像素起初的 alpha 值各不相同，
 *  因此在每一帧中，应用程序都必须根据其初始值来降低每个像素的 alpha 值，
 *  为了便于执行这种 '动态降低 alpha 值'（variable-alpha-channel-reduction）算法，
 *  应用程序把 getImageData() 方法返回的所有原始图像像素数据保存起来，
 *  在其后的每一帧动画之中，程序都会根据每个像素的初始值来决定当前这一步要减少的 alpha 值
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

const fadeoutButton = document.getElementById('fadeoutButton')
let originalImageData = null
let interval = null

const reset = () => context.drawImage(image, 0, 0)

const animationComplete = () => setTimeout(reset, 1000)

const increaseTransparency = (imagedata, steps) => {
  let alpha = 0
  let currentAlpha = 0
  let step = 0
  let dataLen = imagedata.data.length

  // 遍历每个透明像素
  for (let i = 3; i < dataLen; i += 4) {
    alpha = originalImageData.data[i]

    // 尚未完全透明
    if (alpha > 0 && imagedata.data[i] > 0) {
      currentAlpha = imagedata.data[i]
      step = Math.ceil(alpha / steps)

      // 还未完全透明，增加透明度
      if (currentAlpha > step) {
        imagedata.data[i] -= step
      } else {
        // 完全透明
        imagedata.data[i] = 0
      }
    }
  }
}

const fadeOut = (context, imagedata, steps, millisecondsPerStep) => {
  let frame = 0

  interval = setInterval(() => {
    frame++

    // 动画结束，清除定时器，1s后恢复原图
    if (frame > steps) {
      clearInterval(interval)
      animationComplete()
    } else {
      increaseTransparency(imagedata, steps)
      context.putImageData(imagedata, 0, 0)
    }
  }, millisecondsPerStep)
}

image.src = '../shared/images/log-crossing.png'
image.onload = () => {
  reset()
  originalImageData = context.getImageData(0, 0, width, height)
}

fadeoutButton.onclick = () => fadeOut(context, context.getImageData(0, 0, width, height), 20, 1000 / 60)
