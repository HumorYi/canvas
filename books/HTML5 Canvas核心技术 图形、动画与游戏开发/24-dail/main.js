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

    this.RING_FILL_STYLE = 'rgba(100, 140, 230, 0.1)'

    this.RING_INNER_RADIUS = 35
    this.RING_INNER_STROKING_STYLE = 'rgba(0, 0, 0, 0.1)'

    this.RING_OUTER_RADIUS = 55
    this.RING_OUTER_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)'
    this.RING_OUTER_SHADOW_OFFSET_X = 3
    this.RING_OUTER_SHADOW_OFFSET_Y = 3
    this.RING_OUTER_SHADOW_BLUR = 6

    this.ANNOTATIONS_FILL_STYLE = 'rgba(0, 0, 230, 0.9)'
    this.ANNOTATIONS_TEXT_SIZE = 12
    this.ANNOTATIONS_TEXT_DELTA_TICK = 8
    this.ANNOTATIONS_TEXT_COUNT = 16
    this.ANNOTATIONS_TEXT_MULTIPLE = 360 / this.ANNOTATIONS_TEXT_COUNT
    this.ANNOTATIONS_TEXT_ANGLE_DELTA = 2 * Math.PI / this.ANNOTATIONS_TEXT_COUNT

    this.TICK_WIDTH = 10
    this.TICK_COUNT = this.ANNOTATIONS_TEXT_DELTA_TICK * this.ANNOTATIONS_TEXT_COUNT
    this.TICK_ARC_STROKE_STYLE = 'rgba(0, 0, 0, 0.1)'
    this.TICK_STROKE_STYLE = 'rgba(100, 140, 230, 0.7)'

    this.TRACKING_DIAL_STROKING_STYLE = 'rgba(100, 140, 230, 0.5)'

    this.GUIDEWIRE_RADIUS = 5
    this.GUIDEWIRE_ANGLE = -Math.PI / 4
    this.GUIDEWIRE_LINE_STROKE_STYLE = 'goldenrod'
    this.GUIDEWIRE_ARC_STROKE_STYLE = 'rgba(100, 140, 230, 0.9)'
    this.GUIDEWIRE_ARC_FILL_STYLE = 'rgba(250, 250, 0, 0.6)'

    this.circle = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 150
    }
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
    let radius = this.circle.radius + this.RING_OUTER_RADIUS
    let endpt = {
      x: this.circle.x + (x >= this.circle.x ? 1 : -1) * radius * Math.cos(this.GUIDEWIRE_ANGLE),
      y: this.circle.y + (y >= this.circle.y ? 1 : -1) * radius * Math.sin(this.GUIDEWIRE_ANGLE),
    }

    this.context.save()

    this.context.strokeStyle = this.GUIDEWIRE_LINE_STROKE_STYLE

    this.context.beginPath()

    this.context.moveTo(this.circle.x, this.circle.y)
    this.context.lineTo(endpt.x, endpt.y)

    this.context.stroke()


    this.context.beginPath()

    this.context.strokeStyle = this.GUIDEWIRE_ARC_STROKE_STYLE
    this.context.fillStyle = this.GUIDEWIRE_ARC_FILL_STYLE
    this.context.arc(endpt.x, endpt.y, this.GUIDEWIRE_RADIUS, 0, Math.PI * 2, false)

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
    this.drawRingInnerCircle()

    this.context.fillStyle = this.RING_FILL_STYLE
    this.context.fill()
  }

  /**
   * @description: 画转盘外部圆
   * @return: void
   */
  drawRingOuterCircle() {
    this.context.shadowColor = this.RING_OUTER_SHADOW_COLOR
    this.context.shadowOffsetX = this.RING_OUTER_SHADOW_OFFSET_X
    this.context.shadowOffsetY = this.RING_OUTER_SHADOW_OFFSET_Y
    this.context.shadowBlur = this.RING_OUTER_SHADOW_BLUR

    this.context.strokeStyle = this.TRACKING_DIAL_STROKING_STYLE

    this.context.beginPath()

    this.context.arc(this.circle.x, this.circle.y, this.circle.radius + this.RING_OUTER_RADIUS, 0, Math.PI * 2, true)

    this.context.stroke()
  }

  /**
   * @description: 画转盘内部圆
   * @return: void
   */
  drawRingInnerCircle() {
    this.context.strokeStyle = this.RING_INNER_STROKING_STYLE

    this.context.arc(this.circle.x, this.circle.y, this.circle.radius + this.RING_INNER_RADIUS, 0, Math.PI * 2, false)

    this.context.stroke()
  }

  /**
   * @description: 画转盘刻度内部圆
   * @return: void
   */
  drawTickInnerCircle() {
    this.context.save()

    this.context.beginPath()

    this.context.strokeStyle = this.TICK_ARC_STROKE_STYLE

    this.context.arc(this.circle.x, this.circle.y, this.circle.radius + this.RING_INNER_RADIUS - this.TICK_WIDTH, 0, Math.PI * 2, false)

    this.context.stroke()

    this.context.restore()
  }

  /**
   * 画转盘单个刻度
   * @param {number} angle 角度
   * @param {number} radius 半径
   * @param {number} counter 计数器
   * @return: void
   */
  drawTick(angle, radius, counter) {
    const tickWidth = counter % 2 === 0 ? this.TICK_WIDTH : this.TICK_WIDTH / 2

    this.context.beginPath()

    this.context.moveTo(this.circle.x + Math.cos(angle) * (radius - tickWidth), this.circle.y + Math.sin(angle) * (radius - tickWidth))

    this.context.lineTo(this.circle.x + Math.cos(angle) * radius, this.circle.y + Math.sin(angle) * radius)

    this.context.strokeStyle = this.TICK_STROKE_STYLE
    this.context.stroke()
  }

  /**
   * @description: 画转盘所有刻度
   * @return: void
   */
  drawTicks() {
    const radius = this.circle.radius + this.RING_INNER_RADIUS
    const ANGLE_DELTA = 2 * Math.PI / this.TICK_COUNT

    this.context.textAlign = 'center'
    this.context.textBaseline = 'middle'

    this.context.save()

    for (let i = 0; i < this.TICK_COUNT; i++) {
      this.drawTick(i * ANGLE_DELTA, radius, i)
    }

    this.context.restore()
  }

  /**
   * @description: 画仪表盘数字
   * @return: void
   */
  drawAnnotations() {
    this.context.save()

    this.context.fillStyle = this.ANNOTATIONS_FILL_STYLE
    this.context.font = this.ANNOTATIONS_TEXT_SIZE + 'px Helvetica'

    const ANNOTATIONS_RADIUS = this.circle.radius + this.RING_INNER_RADIUS - this.TICK_WIDTH * 2

    for (let i = 0, angle = 0; i < this.ANNOTATIONS_TEXT_COUNT; i++ , angle = i * this.ANNOTATIONS_TEXT_ANGLE_DELTA) {
      this.context.beginPath()
      this.context.fillText(Math.ceil(i * this.ANNOTATIONS_TEXT_MULTIPLE).toFixed(0),
        this.circle.x + Math.cos(angle) * ANNOTATIONS_RADIUS,
        this.circle.y - Math.sin(angle) * ANNOTATIONS_RADIUS
      )
    }

    this.context.restore()
  }
}

const dial = new Dial(canvas)
drawGrid(dial.context)
dial.draw()