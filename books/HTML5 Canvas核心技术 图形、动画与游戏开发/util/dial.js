/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDate: Do not edit
 * @AuthorDescription:转盘
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDate: Do not edit
 * @ModifierDescription:
 */

class Dial {
  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')

    this.CENTROID_RADIUS = 10
    this.CENTROID_STROKE_STYLE = 'rgba(0, 0, 0, 0.8)'
    this.CENTROID_FILL_STYLE = 'rgba(255, 255, 255, 0.2)'
    this.CENTROID_SHADOW_COLOR = 'rgba(255, 255, 255, 0.4)'

    this.RING_FILL_STYLE = 'rgba(100, 140, 230, 0.1)'

    this.RING_INNER_RADIUS = 35
    this.RING_INNER_STROKING_STYLE = 'rgba(0, 0, 0, 0.1)'

    this.RING_OUTER_RADIUS = 55
    this.RING_OUTER_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)'
    this.RING_OUTER_SHADOW_OFFSET_X = 3
    this.RING_OUTER_SHADOW_OFFSET_Y = 3
    this.RING_OUTER_SHADOW_BLUR = 6

    this.ANNOTATIONS_FILL_STYLE = 'rgba(0, 0, 230, 0.8)'
    this.ANNOTATIONS_TEXT_SIZE = 12
    this.ANNOTATIONS_TEXT_DELTA_TICK = 8
    this.ANNOTATIONS_TEXT_COUNT = 16
    this.ANNOTATIONS_TEXT_MULTIPLE = 360 / this.ANNOTATIONS_TEXT_COUNT
    this.ANNOTATIONS_TEXT_ANGLE_DELTA = 2 * Math.PI / this.ANNOTATIONS_TEXT_COUNT

    this.TICK_WIDTH = 10
    this.TICK_COUNT = this.ANNOTATIONS_TEXT_DELTA_TICK * this.ANNOTATIONS_TEXT_COUNT
    this.TICK_ARC_STROKE_STYLE = 'rgba(100, 140, 230, 0.9)'
    this.TICK_STROKE_STYLE = 'rgba(100, 140, 230, 0.7)'

    this.TRACKING_DIAL_STROKING_STYLE = 'rgba(100, 140, 230, 0.3)'

    this.GUIDEWIRE_RADIUS = 5
    this.GUIDEWIRE_ANGLE = -Math.PI / 4
    this.GUIDEWIRE_LINE_STROKE_STYLE = 'goldenrod'
    this.GUIDEWIRE_ARC_STROKE_STYLE = 'rgba(100, 140, 230, 0.9)'
    this.GUIDEWIRE_ARC_FILL_STYLE = 'rgba(250, 250, 0, 0.6)'
  }

  /**
   * 画仪表盘
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {object} polygon 图形对象
   * @param {number} angle 中心点旋转角度
   * @return: void
   */
  draw(polygon, x, y, angle) {
    this.drawCentroid(polygon.x, polygon.y)
    this.drawCentroidGuidewire(polygon, x, y, angle)

    this.drawRing(polygon)
    this.drawTickInnerCircle(polygon)
    this.drawTicks(polygon)
    this.drawAnnotations(polygon)
  }

  /**
   * 画仪表盘圆心
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @return: void
   */
  drawCentroid(x, y) {
    this.context.save()

    this.context.beginPath()

    this.context.strokeStyle = this.CENTROID_STROKE_STYLE
    this.context.fillStyle = this.CENTROID_FILL_STYLE
    this.context.shadowColor = this.CENTROID_SHADOW_COLOR

    this.context.arc(x, y, this.CENTROID_RADIUS, 0, Math.PI * 2, false)

    this.context.stroke()
    this.context.fill()

    this.context.restore()
  }

  /**
   * 画仪表盘指针
   * @param {object} polygon 图形对象
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} angle 中心点旋转角度
   * @param {number} radius 中心点半径
   * @return: void
   */
  drawCentroidGuidewire(polygon, x = polygon.x, y = polygon.y, angle = this.GUIDEWIRE_ANGLE, radius = this.GUIDEWIRE_RADIUS) {
    let r = polygon.radius + this.RING_OUTER_RADIUS
    let endPoint = {
      x: polygon.x + (x >= polygon.x ? 1 : -1) * r * Math.cos(angle),
      y: polygon.y + (x >= polygon.x ? 1 : -1) * r * Math.sin(angle)
    }

    this.context.save()

    this.context.beginPath()

    this.context.moveTo(polygon.x, polygon.y)
    this.context.lineTo(endPoint.x, endPoint.y)

    this.context.strokeStyle = this.GUIDEWIRE_LINE_STROKE_STYLE
    this.context.stroke()

    this.context.beginPath()

    this.context.arc(endPoint.x, endPoint.y, radius, 0, Math.PI * 2, false)

    this.context.strokeStyle = this.GUIDEWIRE_ARC_STROKE_STYLE
    this.context.fillStyle = this.GUIDEWIRE_ARC_FILL_STYLE

    this.context.stroke()
    this.context.fill()

    this.context.restore()
  }

  /**
   * 画仪表盘转盘
   * @param {object} polygon 图形对象
   * @return: void
   */
  drawRing(polygon) {
    this.context.save()

    this.drawRingOuterCircle(polygon)
    this.drawRingInnerCircle(polygon)

    this.context.fillStyle = this.RING_FILL_STYLE
    this.context.fill()

    this.context.restore()
  }

  /**
   * 画转盘外部圆
   * @param {object} polygon 图形对象
   * @return: void
   */
  drawRingOuterCircle(polygon) {
    this.context.shadowColor = this.RING_OUTER_SHADOW_COLOR
    this.context.shadowOffsetX = this.RING_OUTER_SHADOW_OFFSET_X
    this.context.shadowOffsetY = this.RING_OUTER_SHADOW_OFFSET_Y
    this.context.shadowBlur = this.RING_OUTER_SHADOW_BLUR

    this.context.beginPath()

    this.context.arc(polygon.x, polygon.y, polygon.radius + this.RING_OUTER_RADIUS, 0, Math.PI * 2, true)

    this.context.strokeStyle = this.TRACKING_DIAL_STROKING_STYLE
    this.context.stroke()
  }

  /**
   * 画转盘内部圆
   * @param {object} polygon 图形对象
   * @return: void
   */
  drawRingInnerCircle(polygon) {
    this.context.strokeStyle = this.RING_INNER_STROKING_STYLE

    this.context.arc(polygon.x, polygon.y, polygon.radius + this.RING_INNER_RADIUS, 0, Math.PI * 2, false)

    this.context.stroke()
  }

  /**
   * 画转盘刻度内部圆
   * @param {object} polygon 图形对象
   * @return: void
   */
  drawTickInnerCircle(polygon) {
    this.context.save()

    this.context.beginPath()

    this.context.strokeStyle = this.TICK_ARC_STROKE_STYLE

    this.context.arc(polygon.x, polygon.y, polygon.radius + this.RING_INNER_RADIUS - this.TICK_WIDTH, 0, Math.PI * 2, false)

    this.context.stroke()

    this.context.restore()
  }

  /**
   * 画转盘单个刻度
   * @param {object} polygon 图形对象
   * @param {number} angle 角度
   * @param {number} radius 半径
   * @param {number} counter 计数器
   * @return: void
   */
  drawTick(polygon, angle, radius, counter) {
    const tickWidth = counter % 2 === 0 ? this.TICK_WIDTH : this.TICK_WIDTH / 2

    this.context.beginPath()

    this.context.moveTo(polygon.x + Math.cos(angle) * (radius - tickWidth), polygon.y + Math.sin(angle) * (radius - tickWidth))

    this.context.lineTo(polygon.x + Math.cos(angle) * radius, polygon.y + Math.sin(angle) * radius)

    this.context.strokeStyle = this.TICK_STROKE_STYLE
    this.context.stroke()
  }

  /**
   * 画转盘所有刻度
   * @param {object} polygon 图形对象
   * @return: void
   */
  drawTicks(polygon) {
    const radius = polygon.radius + this.RING_INNER_RADIUS
    const ANGLE_DELTA = 2 * Math.PI / this.TICK_COUNT

    this.context.textAlign = 'center'
    this.context.textBaseline = 'middle'

    this.context.save()

    for (let i = 0; i < this.TICK_COUNT; i++) {
      this.drawTick(polygon, i * ANGLE_DELTA, radius, i)
    }

    this.context.restore()
  }

  /**
   * 画仪表盘数字
   * @param {object} polygon 图形对象
   * @return: void
   */
  drawAnnotations(polygon) {
    this.context.save()

    this.context.fillStyle = this.ANNOTATIONS_FILL_STYLE
    this.context.font = this.ANNOTATIONS_TEXT_SIZE + 'px Helvetica'

    const ANNOTATIONS_RADIUS = polygon.radius + this.RING_INNER_RADIUS - this.TICK_WIDTH * 2

    for (let i = 0, angle = 0; i < this.ANNOTATIONS_TEXT_COUNT; i++ , angle = i * this.ANNOTATIONS_TEXT_ANGLE_DELTA) {
      this.context.beginPath()
      this.context.fillText(Math.ceil(i * this.ANNOTATIONS_TEXT_MULTIPLE).toFixed(0),
        polygon.x + Math.cos(angle) * ANNOTATIONS_RADIUS,
        polygon.y - Math.sin(angle) * ANNOTATIONS_RADIUS
      )
    }

    this.context.restore()
  }
}