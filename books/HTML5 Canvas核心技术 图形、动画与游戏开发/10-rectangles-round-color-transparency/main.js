/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-20 22:58:30
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height

context.font = '24px Helvetica'
context.fillText('Click anywhere to erase', 175, 40)

context.lineJoin = 'round'
context.lineWidth = 30

context.strokeStyle = 'goldenrod'
context.fillStyle = 'rgba(0, 0, 255, 0.5)'

context.strokeRect(75, 100, 200, 200)
context.fillRect(325, 100, 200, 200)

canvas.onmousedown = () => context.clearRect(0, 0, width, height)