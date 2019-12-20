/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription: 图片墨色滤镜
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-20 23:47:36
 * @LastEditTime : 2019-12-21 00:01:58
 */


// imagedata.data 有 红、绿、蓝、透明度 连续组成的一个 Uint8ClampedArray 数组

/**
 * 墨色滤镜：增加当前像素颜色深度和对比度
 * @param {Object} context canvas 2d 上下文
 */
onmessage = event => {
  const imagedata = event.data
  const data = imagedata.data
  const dataLen = data.length
  const row = imagedata.width * 4

  for (let i = 0; i <= dataLen;) {
    // 过滤掉透明度像素
    if ((i + 1) % 4 !== 0) {
      // 如果是行中的最后一个像素，复制前一行对应的像素
      if ((i + 4) % row === 0) {
        data[i] = data[i - 4]
        data[i + 1] = data[i - 3]
        data[i + 2] = data[i - 2]
        data[i + 3] = data[i - 1]
        i += 4
        continue
      }

      data[i] = 2 * data[i] - 1.5 * data[i + 4]
    }

    i++
  }

  postMessage(imagedata)
}