/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-24 21:08:59
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const readout = document.getElementById('readout')

const updateReadout = (x, y) => {
  readout.innerText = `(${x.toFixed(0)}, ${y.toFixed(0)})`
}

class SpriteSheetsViewer {
  constructor(canvas, sprite_sheet_src) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.sprite_sheet = new Image()
    this.sprite_sheet.src = sprite_sheet_src

    this.init()
  }

  init() {
    this.sprite_sheet.onload = () => {
      this.drawSpriteSheet()
    }

    this.drawBackground()
  }

  drawBackground() {
    const VERTICAL_LINE_SPACING = 12
    let i = this.context.canvas.height

    this.context.clearRect(0, 0, this.width, this.height)
    this.context.strokeStyle = 'lightgray'
    this.context.lineWidth = 0.5

    while (i > VERTICAL_LINE_SPACING) {
      this.context.beginPath()
      this.context.moveTo(0, i)
      this.context.lineTo(this.context.canvas.width, i)
      this.context.stroke()

      i -= VERTICAL_LINE_SPACING
    }
  }

  drawSpriteSheet() {
    this.context.drawImage(this.sprite_sheet, 0, 0)
  }

  drawGuidelines(x, y) {
    this.context.strokeStyle = 'rgba(0, 0, 230, 0.8)'
    this.context.lineWidth = 0.5

    this.drawVerticalLine(x)
    this.drawHorizontalLine(y)
  }

  drawVerticalLine(x) {
    this.context.beginPath()
    this.context.moveTo(x + 0.5, 0)
    this.context.lineTo(x + 0.5, this.context.canvas.height)
    this.context.stroke()
  }

  drawHorizontalLine(y) {
    this.context.beginPath()
    this.context.moveTo(0, y + 0.5)
    this.context.lineTo(this.context.canvas.width, y + 0.5)
    this.context.stroke()
  }

  draw(x, y) {
    this.drawBackground()
    this.drawSpriteSheet()
    this.drawGuidelines(x, y)
  }
}

const spriteSheetsViewer = new SpriteSheetsViewer(canvas, '../shared/images/running-sprite-sheet.png')

canvas.onmousemove = e => {
  e.preventDefault()

  const loc = windowToCanvas(canvas, e.clientX, e.clientY)

  spriteSheetsViewer.draw(loc.x, loc.y)
  updateReadout(loc.x, loc.y)
}