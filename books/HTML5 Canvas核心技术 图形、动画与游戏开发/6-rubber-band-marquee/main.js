/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-16 02:17:36
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const rubberBand = document.getElementById('rubberBand')
const resetButton = document.getElementById('resetButton')

class RubberBandMarquee {
  constructor(canvas, rubberBand, src) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height

    this.rubberBand = rubberBand

    this.img = new Image()
    this.img.src = src

    this.mousedown = {
      x: 0,
      y: 0
    }
    this.rectangle = {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }

    this.dragging = false

    this.init()
  }

  init() {
    this.img.onload = () => this.drawImg()
  }

  drawImg() {
    this.context.drawImage(this.img, 0, 0, this.width, this.height)
  }

  start(x, y) {
    console.log(x, y);

    this.mousedown.x = x
    this.mousedown.y = y

    this.rectangle.left = x
    this.rectangle.top = y

    this.move()
    this.show()
    this.dragging = true
  }

  stretch(x, y) {
    this.rectangle.left = x < this.mousedown.x ? x : this.mousedown.x
    this.rectangle.top = y < this.mousedown.y ? y : this.mousedown.y
    this.rectangle.width = Math.abs(x - this.mousedown.x)
    this.rectangle.height = Math.abs(y - this.mousedown.y)

    this.move()
    this.resize()
  }

  end() {
    let bbox = this.canvas.getBoundingClientRect()

    try {
      this.context.drawImage(
        this.canvas,
        this.rectangle.left - bbox.left,
        this.rectangle.top - bbox.top,
        this.rectangle.width,
        this.rectangle.height,
        0,
        0,
        this.width,
        this.height
      )
    } catch (e) {
      // suppress error message when mouse is released
      // outside the canvas
      console.error(e)
    }

    this.reset()
    this.resize()
    this.hide()
    this.dragging = false
  }

  show() {
    this.rubberBand.style.display = 'inline'
  }

  hide() {
    this.rubberBand.style.display = 'none'
  }

  move() {
    this.rubberBand.style.left = this.rectangle.left + 'px'
    this.rubberBand.style.top = this.rectangle.top + 'px'
  }

  resize() {
    this.rubberBand.style.width = this.rectangle.width + 'px'
    this.rubberBand.style.height = this.rectangle.height + 'px'
  }

  reset() {
    this.rectangle = {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }
}

const rubberBandMarquee = new RubberBandMarquee(canvas, rubberBand, '../shared/images/arch.png')

canvas.onmousedown = e => {
  e.preventDefault()

  rubberBandMarquee.start(e.x || e.clientX, e.y || e.clientY)
}

window.onmousemove = e => {
  e.preventDefault()

  rubberBandMarquee.dragging && rubberBandMarquee.stretch(e.x || e.clientX, e.y || e.clientY)
}

window.onmouseup = e => {
  e.preventDefault()

  rubberBandMarquee.end()
}

resetButton.onclick = e => {
  rubberBandMarquee.clear()
  rubberBandMarquee.drawImg()
}