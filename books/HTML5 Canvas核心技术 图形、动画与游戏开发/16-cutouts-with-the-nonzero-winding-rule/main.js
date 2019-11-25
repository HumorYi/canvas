/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @Date: 2019-11-13 23:23:33
 * @Description: 入口文件
 * @LastEditors:
 * @LastEditorsEmail:
 * @LastEditTime: 2019-11-24 21:05:40
 * @LastEditorsDescription:
 */
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const directionCheckbox = document.getElementById('directionCheckbox')
const annotationCheckbox = document.getElementById('annotationCheckbox')

const drawText = () => {
  context.save()

  context.font = '18px Arial'
  context.fillStyle = 'rgb(0, 0, 200)'
  context.fillText('Two arcs, one path', 10, 30)


  context.font = '16px Lucida Sans'
  context.fillStyle = 'navy'
  context.fillText('context.arc(300, 200, 150, 0, Math.PI*2, false)', 10, 360);
  context.fillText('context.arc(300, 200, 100, 0, Math.PI*2, !sameDirection)', 10, 380);

  context.restore()
}

const drawArcAnnotations = sameAnnotation => {
  context.save()

  context.font = '16px Lucida Sans'
  context.fillStyle = 'blue'
  context.fillText('CW', 345, 145)
  context.fillText(sameAnnotation ? 'CW' : 'CCW', 425, 75)

  context.restore()
}

const drawOuterCircleAnnotations = sameAnnotation => {
  context.save()

  context.beginPath()
  context.moveTo(410, 210)
  context.lineTo(500, 250)
  context.stroke()

  context.beginPath()
  context.arc(500, 250, 3, 0, Math.PI * 2, false)
  context.fillStyle = 'navy'
  context.fill()

  context.font = '16px Lucida Sans'
  context.fillText(sameAnnotation ? '+1' : '-1', 455, 225)
  context.fillText(sameAnnotation ? '1' : '-1', 515, 255)

  context.restore()
}

const drawInnerCircleAnnotations = sameAnnotation => {
  context.save()

  context.beginPath()
  context.moveTo(300, 175)
  context.lineTo(100, 250)
  context.stroke()

  context.beginPath()
  context.arc(100, 250, 3, 0, Math.PI * 2, false)
  context.fillStyle = 'navy'
  context.fill()

  context.font = '16px Lucida Sans'
  context.fillText(sameAnnotation ? '+1' : '-1', 215, 185)
  context.fillText(sameAnnotation ? '2' : '0', 75, 255)

  context.restore()
}

const drawAnnotations = sameAnnotation => {
  context.save()

  context.strokeStyle = 'blue'
  drawInnerCircleAnnotations(sameAnnotation)
  drawOuterCircleAnnotations(sameAnnotation)
  drawArcAnnotations(sameAnnotation)

  context.restore()
}

const drawTwoArcs = sameDirection => {
  context.beginPath()

  context.arc(300, 170, 150, 0, Math.PI * 2, false) // outer: CW
  context.arc(300, 170, 100, 0, Math.PI * 2, !sameDirection) // innner

  context.fill()
  context.shadowColor = undefined
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0
  context.stroke()
}

const draw = (sameDirection, sameAnnotation) => {
  context.clearRect(0, 0, context.canvas.width,
    context.canvas.height)

  drawGrid(context)

  context.save()

  context.shadowColor = 'rgba(0, 0, 0, 0.8)'
  context.shadowOffsetX = 12
  context.shadowOffsetY = 12
  context.shadowBlur = 15

  drawTwoArcs(sameDirection)

  context.restore()

  drawText()

  sameAnnotation && drawAnnotations(sameAnnotation)
}

annotationCheckbox.onclick = () => draw(directionCheckbox.checked, annotationCheckbox.checked)

directionCheckbox.onclick = () => draw(directionCheckbox.checked, annotationCheckbox.checked)


context.fillStyle = 'rgba(100, 140, 230, 0.5)'
context.strokeStyle = context.fillStyle; //'rgba(20, 60, 150, 0.5)'

draw(directionCheckbox.checked, annotationCheckbox.checked)