/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-20 23:10:24
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
const gradient = context.createLinearGradient(0, 0, 0, height / 2)

gradient.addColorStop(0, 'blue')
gradient.addColorStop(0.25, 'white')
gradient.addColorStop(0.5, 'purple')
gradient.addColorStop(0.75, 'red')
gradient.addColorStop(1, 'yellow')

context.fillStyle = gradient
context.rect(0, 0, width, height)
context.fill()