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

class Dial {
  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height

    this.CENTROID_RADIUS = 10
    this.CENTROID_STROKE_STYLE = 'rgba(0, 0, 0, 0.5)'
    this.CENTROID_FILL_STYLE = 'rgba(80, 190, 240, 0.6)'

    this.RING_INNER_RADIUS = 35
    this.RING_OUTER_RADIUS = 55

    this.ANNOTATIONS_FILL_STYLE = 'rgba(0, 0, 230, 0.9)'
    this.ANNOTATIONS_TEXT_SIZE = 12

    this.TICK_WIDTH = 10
    this.TICK_LONG_STROKE_STYLE = 'rgba(100, 140, 230, 0.9)'
    this.TICK_SHORT_STROKE_STYLE = 'rgba(100, 140, 230, 0.7)'

    this.TRACKING_DIAL_STROKING_STYLE = 'rgba(100, 140, 230, 0.5)'

    this.GUIDEWIRE_STROKE_STYLE = 'goldenrod'
    this.GUIDEWIRE_FILL_STYLE = 'rgba(250, 250, 0, 0.6)'

    this.circle = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 150
    }

    this.init()
  }

  init() {
    this.context.shadowOffsetX = 2
    this.context.shadowOffsetY = 2
    this.context.shadowBlur = 4

    this.context.textAlign = 'center'
    this.context.textBaseline = 'middle'
  }

  /**
   * @description: 画仪表盘
   * @return: void
   */
  draw() {
    this.drawCentroid()
    this.drawCentroidGuidewire(this.circle.x, this.circle.y)

    this.drawRing()
    this.drawTickInnerCircle()
    this.drawTicks()
    this.drawAnnotations()
  }

  /**
   * @description: 画仪表盘圆心
   * @return: void
   */
  drawCentroid() {
    this.context.beginPath()

    this.context.save()

    this.context.strokeStyle = this.CENTROID_STROKE_STYLE
    this.context.fillStyle = this.CENTROID_FILL_STYLE

    this.context.arc(this.circle.x, this.circle.y, this.CENTROID_RADIUS, 0, Math.PI * 2, false)

    this.context.stroke()
    this.context.fill()

    this.context.restore()
  }

  /**
   * @description: 画仪表盘指针
   * @param {number} x 指针圆 x 坐标
   * @param {number} y 指针圆 y 坐标
   * @return: void
   */
  drawCentroidGuidewire(x, y) {
    let angle = -Math.PI / 4
    let radius = this.circle.radius + this.RING_OUTER_RADIUS
    let isRight = x >= this.circle.x
    let endpt = {
      x: this.circle.x + (isRight ? 1 : -1) * radius * Math.cos(angle),
      y: this.circle.y + (isRight ? 1 : -1) * radius * Math.sin(angle),
    }

    this.context.save()

    this.context.strokeStyle = this.GUIDEWIRE_STROKE_STYLE
    this.context.fillStyle = this.GUIDEWIRE_FILL_STYLE

    this.context.beginPath()

    this.context.moveTo(this.circle.x, this.circle.y)
    this.context.lineTo(endpt.x, endpt.y)

    this.context.stroke()


    this.context.beginPath()

    this.context.strokeStyle = this.TICK_LONG_STROKE_STYLE
    this.context.arc(endpt.x, endpt.y, 5, 0, Math.PI * 2, false)

    this.context.stroke()
    this.context.fill()

    this.context.restore()
  }

  /**
   * @description: 画仪表盘转盘
   * @return: void
   */
  drawRing() {
    this.drawRingOuterCircle()

    this.context.strokeStyle = 'rgba(0, 0, 0, 0.1)'
    this.context.fillStyle = 'rgba(100, 140, 230, 0.1)'

    this.context.arc(this.circle.x, this.circle.y, this.circle.radius + this.RING_INNER_RADIUS, 0, Math.PI * 2, false)

    this.context.stroke()
    this.context.fill()
  }

  /**
   * @description: 画转盘外部圆
   * @return: void
   */
  drawRingOuterCircle() {
    this.context.shadowColor = 'rgba(0, 0, 0, 0.7)'
    this.context.shadowOffsetX = 3
    this.context.shadowOffsetY = 3
    this.context.shadowBlur = 6

    this.context.strokeStyle = this.TRACKING_DIAL_STROKING_STYLE

    this.context.beginPath()

    this.context.arc(this.circle.x, this.circle.y, this.circle.radius + this.RING_OUTER_RADIUS, 0, Math.PI * 2, true)

    this.context.stroke()
  }

  /**
   * @description: 画转盘内部圆
   * @return:
   */
  drawTickInnerCircle() {
    this.context.save()

    this.context.beginPath()

    this.context.strokeStyle = 'rgba(0, 0, 0, 0.1)'

    this.context.arc(this.circle.x, this.circle.y, this.circle.radius + this.RING_INNER_RADIUS - this.TICK_WIDTH, 0, Math.PI * 2, false)

    this.context.stroke()

    this.context.restore()
  }

  /**
   * 画转盘单个刻度
   * @param {number} angle 角度
   * @param {number} radius 半径
   * @param {number} counter 计数器
   * @return:void
   */
  drawTick(angle, radius, counter) {
    const tickWidth = counter % 4 === 0 ? this.TICK_WIDTH : this.TICK_WIDTH / 2

    this.context.beginPath()

    this.context.moveTo(this.circle.x + Math.cos(angle) * (radius - tickWidth), this.circle.y + Math.sin(angle) * (radius - tickWidth))

    this.context.lineTo(this.circle.x + Math.cos(angle) * radius, this.circle.y + Math.sin(angle) * radius)

    this.context.strokeStyle = this.TICK_SHORT_STROKE_STYLE
    this.context.stroke()
  }

  /**
   * @description: 画转盘所有刻度
   * @return: void
   */
  drawTicks() {
    const radius = this.circle.radius + this.RING_INNER_RADIUS
    const ANGLE_MAX = 2 * Math.PI
    const ANGLE_DELTA = Math.PI / 64

    this.context.save()

    for (let angle = 0, counter = 0; angle < ANGLE_MAX; angle += ANGLE_DELTA, counter++) {
      this.drawTick(angle, radius, counter++)
    }

    this.context.restore()
  }

  /**
   * @description: 画仪表盘数字
   * @return: void
   */
  drawAnnotations() {
    const radius = this.circle.radius + this.RING_INNER_RADIUS

    this.context.save()

    this.context.fillStyle = this.ANNOTATIONS_FILL_STYLE
    this.context.font = this.ANNOTATIONS_TEXT_SIZE + 'px Helvetica'

    const MAX_ANGLE = 2 * Math.PI
    const STEP_ANGLE = Math.PI / 8
    const numRadius = radius - this.TICK_WIDTH * 2

    for (let angle = 0; angle < MAX_ANGLE; angle += STEP_ANGLE) {
      this.context.beginPath()
      this.context.fillText((angle * 180 / Math.PI).toFixed(0),
        this.circle.x + Math.cos(angle) * numRadius,
        this.circle.y - Math.sin(angle) * numRadius
      )
    }

    this.context.restore()
  }
}

const dial = new Dial(canvas)
drawGrid(dial.context)
dial.draw()