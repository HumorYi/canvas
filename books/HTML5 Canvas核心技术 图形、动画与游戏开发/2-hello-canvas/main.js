/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-13 23:35:37
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height

context.font = '38px Arial'
context.fillStyle = 'cornflowerblue'
context.strokeStyle = 'blue'
context.fillText('Hello Canvas', width / 2 - 150, height / 2 + 15)
context.strokeText('Hello Canvas', width / 2 - 150, height / 2 + 15)