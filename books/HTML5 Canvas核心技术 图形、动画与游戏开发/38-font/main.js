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

const LEFT_COLUMN_FONTS = [
  '2em palatino',
  'bolder 2em palatino',
  'lighter 2em palatino',
  'italic 2em palatino',
  'oblique small-caps 24px palatino',
  'bold 14pt palatino',
  'xx-large palatino',
  'italic xx-large palatino'
]

const RIGHT_COLUMN_FONTS = [
  'oblique 1.5em lucida console',
  'x-large fantasy',
  'italic 28px monaco',
  'italic large copperplate',
  '36px century',
  '28px tahoma',
  '28px impact',
  '1.7em verdana'
]

const LEFT_COLUMN_X = 50
const RIGHT_COLUMN_X = 500
const DELTA_Y = 50
const TOP_Y = 50
let y = 0


const drawBackground = () => {
  const STEP_Y = 12
  let i = height

  context.strokeStyle = 'rgba(0,0,200,0.225)'
  context.lineWidth = 0.5

  context.save()
  context.restore()

  while (i > STEP_Y * 4) {
    context.beginPath()
    context.moveTo(0, i)
    context.lineTo(width, i)
    context.stroke()
    i -= STEP_Y
  }

  context.save()

  context.strokeStyle = 'rgba(100,0,0,0.3)'
  context.lineWidth = 1

  context.beginPath()

  context.moveTo(35, 0)
  context.lineTo(35, height)
  context.stroke()

  context.restore()
}

drawBackground()

context.fillStyle = 'blue'

LEFT_COLUMN_FONTS.forEach(font => {
  context.font = font
  context.fillText(font, LEFT_COLUMN_X, y += DELTA_Y)
})

y = 0

RIGHT_COLUMN_FONTS.forEach(font => {
  context.font = font
  context.fillText(font, RIGHT_COLUMN_X, y += DELTA_Y)
})