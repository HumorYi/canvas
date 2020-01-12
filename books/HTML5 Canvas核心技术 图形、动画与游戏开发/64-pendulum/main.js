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

const pendulumPainter = {
  PIVOT_FILL_STYLE: 'rgba(0,0,0,0.2)',
  WEIGHT_SHADOW_COLOR: 'rgb(0,0,0)',
  PIVOT_SHADOW_COLOR: 'rgb(255,255,0)',
  STROKE_COLOR: 'rgb(100,100,195)',
  paint(sprite, context) {
    this.drawPivot(sprite, context)
    this.drawRod(sprite, context)
    this.drawWeight(sprite, context)
  },
  drawPivot(sprite, context) {
    context.save()

    context.beginPath()

    context.shadowColor = undefined
    context.shadowBlur = undefined
    context.shadowOffsetX = 0
    context.shadowOffsetY = 0
    context.fillStyle = 'white'

    context.arc(sprite.x + sprite.pivotRadius,
      sprite.y, sprite.pivotRadius / 2, 0, Math.PI * 2, false)
    context.fill()

    context.stroke()

    context.beginPath()

    context.fillStyle = this.PIVOT_FILL_STYLE
    context.arc(sprite.x + sprite.pivotRadius,
      sprite.y, sprite.pivotRadius, 0, Math.PI * 2, false)

    context.fill()

    context.stroke()

    context.restore()
  },
  drawRod(sprite, context) {
    context.beginPath()

    context.moveTo(
      sprite.x + sprite.pivotRadius,
      sprite.y + sprite.pivotRadius
    )

    context.lineTo(
      sprite.weightX - sprite.weightRadius * Math.sin(sprite.angle),
      sprite.weightY - sprite.weightRadius * Math.cos(sprite.angle)
    )

    context.stroke()
  },
  drawWeight(sprite, context) {
    context.save()

    context.beginPath()

    context.arc(sprite.weightX, sprite.weightY, sprite.weightRadius, 0, Math.PI * 2, false)
    context.clip()

    context.shadowColor = this.WEIGHT_SHADOW_COLOR
    context.shadowOffsetX = -4
    context.shadowOffsetY = -4
    context.shadowBlur = 8

    context.lineWidth = 2
    context.strokeStyle = this.STROKE_COLOR
    context.stroke()

    context.beginPath()
    context.arc(sprite.weightX, sprite.weightY, sprite.weightRadius / 2, 0, Math.PI * 2, false)
    context.clip()

    context.shadowColor = this.PIVOT_SHADOW_COLOR
    context.shadowOffsetX = -4
    context.shadowOffsetY = -4
    context.shadowBlur = 8

    context.stroke()

    context.restore()
  }
}
const swing = {
  GRAVITY_FORCE: 32, // 32 ft/s/s,
  ROD_LENGTH: 0.8,   // 0.8 ft
  isPaint: false,
  execute(sprite, context, time) {
    const elapsedTime = (time - startTime) / 1000

    sprite.angle = sprite.initialAngle * Math.cos(
      Math.sqrt(this.GRAVITY_FORCE / this.ROD_LENGTH) * elapsedTime
    )

    sprite.weightX = sprite.x + Math.sin(sprite.angle) * sprite.rodLength

    sprite.weightY = sprite.y + Math.cos(sprite.angle) * sprite.rodLength
  }
}

const pendulum = new Sprite('pendulum', pendulumPainter, [swing])

const PIVOT_Y = 20
const PIVOT_RADIUS = 7
const WEIGHT_RADIUS = 25
const INITIAL_ANGLE = Math.PI / 5
const ROD_LENGTH_IN_PIXELS = 300

let startTime = new Date().getTime()

const animate = time => {
  context.clearRect(0, 0, width, height)

  drawGrid(context)

  pendulum.update(context, time)
  pendulum.paint(context)

  window.requestNextAnimationFrame(animate)
}

pendulum.x = width / 2
pendulum.y = PIVOT_Y
pendulum.weightRadius = WEIGHT_RADIUS
pendulum.pivotRadius = PIVOT_RADIUS
pendulum.initialAngle = INITIAL_ANGLE
pendulum.angle = INITIAL_ANGLE
pendulum.rodLength = ROD_LENGTH_IN_PIXELS

context.lineWidth = 0.5
context.strokeStyle = 'rgba(0,0,0,0.5)'
context.shadowColor = 'rgba(0,0,0,0.5)'
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.shadowBlur = 4
context.stroke()

drawGrid(context)

animate(startTime)