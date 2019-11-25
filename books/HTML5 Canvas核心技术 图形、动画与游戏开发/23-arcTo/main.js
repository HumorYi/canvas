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

const roundedRect = (cornerX, cornerY, width, height, cornerRadius) => {
  context.moveTo(cornerX + (width > 0 ? 1 : -1) * cornerRadius, cornerY)

  context.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius)

  context.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, cornerRadius)

  context.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius)

  context.arcTo(cornerX, cornerY, cornerX + (width > 0 ? 1 : -1) * cornerRadius, cornerY, cornerRadius)
}

const drawRoundedRect = (cornerX, cornerY, width, height, cornerRadius, strokeStyle, fillStyle) => {
  context.beginPath()

  roundedRect(cornerX, cornerY, width, height, cornerRadius)

  context.strokeStyle = strokeStyle
  context.fillStyle = fillStyle

  context.stroke()
  context.fill()
}

drawRoundedRect(50, 40, 100, 100, 10, 'blue', 'yellow')
drawRoundedRect(275, 40, -100, 100, 20, 'purple', 'green')
drawRoundedRect(300, 140, 100, -100, 30, 'red', 'white')
drawRoundedRect(525, 140, -100, -100, 40, 'white', 'blue')