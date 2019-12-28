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
const RADIUS = 75
const ball = new Sprite('ball', {
  paint(sprite, context) {
    context.save()
    context.beginPath()

    context.arc(
      sprite.left + sprite.width / 2,
      sprite.top + sprite.height / 2,
      RADIUS, 0, Math.PI * 2, false
    )
    context.clip()

    context.shadowColor = 'rgb(0,0,0)'
    context.shadowOffsetX = -4
    context.shadowOffsetY = -4
    context.shadowBlur = 8

    context.lineWidth = 2
    context.strokeStyle = 'rgb(100,100,195)'
    context.fillStyle = 'rgba(30,144,255,0.15)'
    context.fill()

    context.stroke()
    context.restore()
  }
})

drawGrid(context)
ball.left = 320
ball.top = 160
ball.paint(context)