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

const fontHeight = 24
const alignValues = ['start', 'center', 'end']
const baselineValues = [
  'top', 'middle', 'bottom',
  'alphabetic', 'ideographic', 'hanging'
]

const drawTextMarker = (context, x, y) => {
  context.fillStyle = 'yellow'
  context.fillRect(x, y, 7, 7)
  context.strokeRect(x, y, 7, 7)
}

const drawTextLine = (context, x, y, strokeStyle = 'gray') => {
  context.strokeStyle = strokeStyle

  context.beginPath()

  context.moveTo(x, y)
  context.lineTo(x + 738, y)

  context.stroke()
}

context.font = 'oblique normal bold 24px palatino'
drawGrid(context)


for (let align = 0; align < alignValues.length; ++align) {
  for (let baseline = 0; baseline < baselineValues.length; ++baseline) {
    let x = 20 + align * fontHeight * 15
    let y = 20 + baseline * fontHeight * 3

    drawText(
      context, alignValues[align] + '/' + baselineValues[baseline],
      x, y,
      alignValues[align], baselineValues[baseline]
    )

    drawTextMarker(context, x, y)
    drawTextLine(context, x, y)
  }
}