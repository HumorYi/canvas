/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-16 13:26:46
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const snapshotButton = document.getElementById('snapshotButton')
const snapshotImageElement = document.getElementById('snapshotImageElement')

class Clock {
  constructor(canvas, snapshotImageElement) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height

    this.snapshotImageElement = snapshotImageElement

    this.font_height = 15
    this.margin = 35
    this.hand_truncation = this.width / 25
    this.hour_hand_truncation = this.width / 10
    this.numeral_spacing = 20
    this.radius = this.width / 2 - this.margin
    this.hand_radius = this.radius + this.numeral_spacing
    this.loop = null

    this.init()
  }

  init() {
    this.context.font = `${this.font_height}px Arial`
  }

  drawCircle() {
    this.context.beginPath()
    this.context.arc(this.width / 2, this.height / 2, this.radius, 0, Math.PI * 2, true)
    this.context.stroke()
  }

  drawNumerals() {
    const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let angle = 0
    let numeralWidth = 0

    numerals.forEach(numeral => {
      angle = Math.PI / 6 * (numeral - 3)
      numeralWidth = this.context.measureText(numeral).width;
      this.context.fillText(
        numeral,
        this.width / 2 + Math.cos(angle) * (this.hand_radius) - numeralWidth / 2,
        this.height / 2 + Math.sin(angle) * (this.hand_radius) + this.font_height / 3
      )
    })
  }

  drawCenter() {
    this.context.beginPath()
    this.context.arc(this.width / 2, this.height / 2, 5, 0, Math.PI * 2, true)
    this.context.fill()
  }

  drawHand(loc, isHour) {
    const angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2
    const handRadius = this.radius - this.hand_truncation - (isHour ? this.hour_hand_truncation : 0)

    this.context.moveTo(this.width / 2, this.height / 2)
    this.context.lineTo(
      this.width / 2 + Math.cos(angle) * handRadius,
      this.height / 2 + Math.sin(angle) * handRadius
    )
    this.context.stroke()
  }

  drawHands() {
    const date = new Date()
    let hour = date.getHours()

    if (hour > 12) {
      hour = hour - 12
    }

    this.drawHand((hour + date.getMinutes() / 60) * 5, true, 0.5)
    this.drawHand(date.getMinutes(), false, 0.5)
    this.drawHand(date.getSeconds(), false, 0.2)
  }

  updateImg() {
    this.snapshotImageElement.src = this.getUrl()
  }

  drawClock() {
    this.clear()

    this.context.save()

    this.context.fillStyle = 'rgba(255, 255, 255, 0.8)'
    this.context.fillRect(0, 0, this.width, this.height)

    this.drawCircle()
    this.drawCenter()
    this.drawHands()

    this.context.restore()

    this.drawNumerals()

    this.updateImg()
  }

  draw() {
    this.loop = setInterval(() => {
      this.drawClock()
    }, 1000);
  }

  toCanvas() {
    this.snapshotImageElement.style.display = 'none'
    this.canvas.style.display = 'inline'

    this.draw()
  }

  snapshot() {
    clearInterval(this.loop)
    this.snapshotImageElement.src = this.getUrl()
    this.snapshotImageElement.style.display = 'inline'
    this.canvas.style.display = 'none'
  }

  getUrl() {
    return this.canvas.toDataURL()
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }
}

const clock = new Clock(canvas, snapshotImageElement)
clock.draw()

snapshotButton.onclick = () => {
  if (snapshotButton.value === 'Take snapshot') {
    clock.snapshot()
    snapshotButton.value = 'Return to Canvas'
  } else {
    clock.toCanvas()
    snapshotButton.value = 'Take snapshot'
  }
}