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

const negativeButton = document.getElementById('negativeButton')
const blackAndWhite = document.getElementById('blackAndWhite')
const embossButton = document.getElementById('embossButton')

const reset = () => {
  context.drawImage(
    image, 0, 0,
    image.width, image.height, 0, 0,
    width, height
  )
}

// imagedata.data 有 红、绿、蓝、透明度 连续组成的一个 Uint8ClampedArray 数组

const drawFilterImage = {
  /**
   * 负色滤镜：当前图片数据像素值 = 255 - 当前图片数据像素值
   * @param {Object} context canvas 2d 上下文
   */
  negative(context) {
    const imagedata = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
    const data = imagedata.data
    const max = data.length - 4

    for (let i = 0; i <= max; i += 4) {
      for (let j = 0; j < 3; j++) {
        data[i + j] = 255 - data[i + j]
      }
    }

    context.putImageData(imagedata, 0, 0)
  },
  /**
   * 黑白滤镜：当前图片数据像素值 = (红 = 绿 + 蓝) / 3
   * @param {Object} context canvas 2d 上下文
   */
  blackAndWhite(context) {
    const imagedata = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
    const data = imagedata.data
    const max = data.length - 4
    let average = 0

    for (let i = 0; i <= max; i += 4) {
      average = (data[i] + data[i + 1] + data[i + 2]) / 3

      for (let j = 0; j < 3; j++) {
        data[i + j] = average
      }
    }

    context.putImageData(imagedata, 0, 0)
  },
  /**
   * 浮雕滤镜：边缘检测(需要计算当前像素值及其右方与下方像素的值)，
   *  所有位于最后一行的像素，它的下方都不会再有其他像素了，
   *  而每行右方的像素，它的右方也不会有别的像素出现
   * @param {Object} context canvas 2d 上下文
   */
  emboss(context) {
    const imagedata = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
    const data = imagedata.data
    const dataLen = data.length
    const row = imagedata.width * 4

    // 遍历每一个像素
    for (let i = 0; i < dataLen; i++) {
      // 如果当前像素值未超过有效范围
      if (i <= dataLen - row) {
        // 过滤掉透明度像素
        if ((i + 1) % 4 !== 0) {
          // 如果是行中的最后一个像素，复制前一行对应的像素
          if ((i + 4) % row == 0) {
            data[i] = data[i - 4]
            data[i + 1] = data[i - 3]
            data[i + 2] = data[i - 2]
            data[i + 3] = data[i - 1]
            i += 4
            continue
          }

          // 不是行中的最后一个像素
          data[i] = 255 / 2 // Average value
            + 2 * data[i]   // current pixel
            - data[i + 4]   // next pixel
            - data[i + row] // pixel underneath
        }

        continue
      }

      // 当前像素值超过有效范围，最后一行下方没有其它像素，复制上一行对应的像素
      if ((i + 1) % 4 !== 0) {
        data[i] = data[i - row]
      }
    }

    context.putImageData(imagedata, 0, 0)
  }
}

image.src = '../shared/images/curved-road.png'
image.onload = reset

negativeButton.onclick = () => drawFilterImage.negative(context)
blackAndWhite.onclick = () => blackAndWhite.checked ? drawFilterImage.blackAndWhite(context) : reset()
embossButton.onclick = () => embossButton.checked ? drawFilterImage.emboss(context) : reset()