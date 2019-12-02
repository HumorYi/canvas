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

const polygon = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 150
}
const dial = new Dial(canvas, polygon)
drawGrid(dial.context)
dial.draw(polygon)