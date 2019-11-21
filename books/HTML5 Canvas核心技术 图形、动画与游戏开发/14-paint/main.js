/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-20 23:39:02
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')

const repeatRadio = document.getElementById('repeatRadio')
const repeatXRadio = document.getElementById('repeatXRadio')
const repeatYRadio = document.getElementById('repeatYRadio')
const noRepeatRadio = document.getElementById('noRepeatRadio')

class Pattern {
  constructor(canvas, img) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.img = img
  }

  fill(type) {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.fillStyle = this.context.createPattern(this.img, type)
    this.context.fillRect(0, 0, this.width, this.height)
    this.context.fill()
  }

  repeat() {
    this.fill('repeat')
  }

  noRepeat() {
    this.fill('no-repeat')
  }

  repeatX() {
    this.fill('repeat-x')
  }

  repeatY() {
    this.fill('repeat-y')
  }
}

const img = new Image()
const pattern = new Pattern(canvas, img)

img.src = './redball.png'
img.onload = () => pattern.repeat()

repeatRadio.onclick = () => pattern.repeat()
repeatXRadio.onclick = () => pattern.repeatX()
repeatYRadio.onclick = () => pattern.repeatY()
noRepeatRadio.onclick = () => pattern.noRepeat()