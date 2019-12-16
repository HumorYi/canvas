/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription: 文本编辑器
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-17 00:40:15
 * @LastEditTime: 2019-12-17 01:29:42
 */
class TextCursor {
  constructor(fillStyle, width) {
    this.fillStyle = fillStyle || 'rgba(0, 0, 0, 0.7)'
    this.width = width || 2
    this.left = 0
    this.top = 0
  }

  getHeight(context) {
    let w = context.measureText('W').width
    return w + w / 6
  }

  createPath(context) {
    context.beginPath()
    context.rect(this.left, this.top, this.width, this.getHeight(context))
  }

  draw(context, left, bottom) {
    context.save()

    this.left = left
    this.top = bottom - this.getHeight(context)

    this.createPath(context)

    context.fillStyle = this.fillStyle
    context.fill()

    context.restore()
  }

  erase(context, imageData) {
    context.putImageData(
      imageData, 0, 0,
      this.left, this.top,
      this.width, this.getHeight(context)
    )
  }
}

class TextLine {
  constructor(x, y) {
    this.left = x
    this.bottom = y
    this.text = ''
    this.caret = 0
  }

  insert(text) {
    let first = this.text.slice(0, this.caret)
    let last = this.text.slice(this.caret)

    this.text = first + text + last
    this.caret += text.length
  }

  getCaretX(context) {
    let s = this.text.substring(0, this.caret)
    let w = context.measureText(s).width

    return this.left + w
  }

  removeCharacterBeforeCaret() {
    if (this.caret === 0) {
      return
    }

    this.text = this.text.substring(0, this.caret - 1) + this.text.substring(this.caret)

    this.caret--
  }

  removeLastCharacter() {
    this.text = this.text.slice(0, -1)
  }

  getWidth(context) {
    return context.measureText(this.text).width
  }

  getHeight(context) {
    let h = context.measureText('W').width
    return h + h / 6
  }

  draw(context) {
    context.save()
    context.textAlign = 'start'
    context.textBaseline = 'bottom'

    context.strokeText(this.text, this.left, this.bottom)
    context.fillText(this.text, this.left, this.bottom)

    context.restore()
  }

  erase(context, imageData) {
    context.putImageData(imageData, 0, 0)
  }
}

class Paragraph {
  constructor(context, left, top, imageData, cursor) {
    this.context = context
    this.drawingSurface = imageData
    this.left = left
    this.top = top
    this.lines = []
    this.activeLine = undefined
    this.cursor = cursor
    this.blinkingInterval = undefined
  }

  isPointInside(loc) {
    let c = this.context

    c.beginPath()
    c.rect(this.left, this.top,
      this.getWidth(), this.getHeight())

    return c.isPointInPath(loc.x, loc.y)
  }

  getHeight() {
    let h = 0

    this.lines.forEach(line => {
      h += line.getHeight(this.context)
    })

    return h;
  }

  getWidth() {
    let w = 0
    let widest = 0

    this.lines.forEach(line => {
      w = line.getWidth(this.context)
      if (w > widest) {
        widest = w
      }
    })

    return widest
  }

  draw() {
    this.lines.forEach(line => line.draw(this.context))
  }

  erase(context, imageData) {
    context.putImageData(imageData, 0, 0)
  }

  addLine(line) {
    this.lines.push(line)
    this.activeLine = line
    this.moveCursor(line.left, line.bottom)
  }

  insert(text) {
    this.erase(this.context, this.drawingSurface)
    this.activeLine.insert(text)

    let t = this.activeLine.text.substring(0, this.activeLine.caret)
    let w = this.context.measureText(t).width

    this.moveCursor(this.activeLine.left + w, this.activeLine.bottom)

    this.draw(this.context)
  }

  blinkCursor() {
    let BLINK_OUT = 200
    let BLINK_INTERVAL = 900

    this.blinkingInterval = setInterval(() => {
      cursor.erase(context, this.drawingSurface)
      setTimeout(() => cursor.draw(context, cursor.left, cursor.top + cursor.getHeight(context)), BLINK_OUT)
    }, BLINK_INTERVAL)
  }

  moveCursorCloseTo(x, y) {
    let line = this.getLine(y)

    if (line) {
      line.caret = this.getColumn(line, x)
      this.activeLine = line
      this.moveCursor(line.getCaretX(context), line.bottom)
    }
  }

  moveCursor(x, y) {
    this.cursor.erase(this.context, this.drawingSurface)
    this.cursor.draw(this.context, x, y)

    !this.blinkingInterval && this.blinkCursor()
  }

  moveLinesDown(start) {
    for (let i = start, len = this.lines.length; i < len; ++i) {
      let line = this.lines[i]
      line.bottom += line.getHeight(this.context)
    }
  }

  newline() {
    let textBeforeCursor = this.activeLine.text.substring(0, this.activeLine.caret)
    let textAfterCursor = this.activeLine.text.substring(this.activeLine.caret)
    let height = this.context.measureText('W').width + this.context.measureText('W').width / 6
    let bottom = this.activeLine.bottom + height
    let activeIndex
    let line

    this.erase(this.context, this.drawingSurface)     // Erase paragraph
    this.activeLine.text = textBeforeCursor           // Set active line's text

    line = new TextLine(this.activeLine.left, bottom) // Create a new line
    line.insert(textAfterCursor)                      // containing text after cursor

    activeIndex = this.lines.indexOf(this.activeLine) // Splice in new line
    this.lines.splice(activeIndex + 1, 0, line)

    this.activeLine = line                            // New line is active with
    this.activeLine.caret = 0                         // caret at first character

    activeIndex = this.lines.indexOf(this.activeLine) // Starting at the new line...

    for (let i = activeIndex + 1, len = this.lines.length; i < len; ++i) { //...loop over remaining lines
      let line = this.lines[i]
      line.bottom += height // move line down one row
    }

    this.draw()
    this.cursor.draw(this.context, this.activeLine.left, this.activeLine.bottom)
  }

  getLine(y) {
    for (let i = 0; i < this.lines.length; ++i) {
      let line = this.lines[i]
      if (y > line.bottom - line.getHeight(context) && y < line.bottom) {
        return line
      }
    }
  }

  getColumn(line, x) {
    let tmpLine = new TextLine(line.left, line.bottom)
    let found = false
    let before
    let after
    let closest
    let column

    tmpLine.insert(line.text)

    while (!found && tmpLine.text.length > 0) {
      before = tmpLine.left + tmpLine.getWidth(context)
      tmpLine.removeLastCharacter()
      after = tmpLine.left + tmpLine.getWidth(context)

      if (after < x) {
        closest = x - after < before - x ? after : before
        column = closest === before ? tmpLine.text.length + 1 : tmpLine.text.length
        found = true
      }
    }
    return column
  }

  activeLineIsOutOfText() {
    return this.activeLine.text.length === 0
  }

  activeLineIsTopLine() {
    return this.lines[0] === this.activeLine
  }

  moveUpOneLine() {
    let lastActiveText = '' + this.activeLine.text
    let activeIndex = this.lines.indexOf(this.activeLine)

    this.activeLine = this.lines[activeIndex - 1]
    this.activeLine.caret = this.activeLine.text.length

    this.lines.splice(activeIndex, 1)

    this.moveCursor(
      this.activeLine.left + this.activeLine.getWidth(this.context),
      this.activeLine.bottom
    )

    this.activeLine.text += lastActiveText

    for (let i = activeIndex; i < this.lines.length; ++i) {
      let line = this.lines[i]
      line.bottom -= line.getHeight(this.context)
    }
  }

  backspace() {
    let t, w

    this.context.save()

    if (this.activeLine.caret === 0) {
      if (!this.activeLineIsTopLine()) {
        this.erase(this.context, this.drawingSurface)
        this.moveUpOneLine()
        this.draw()
      }
    }
    else {  // active line has text
      this.context.fillStyle = fillStyleSelect.value
      this.context.strokeStyle = strokeStyleSelect.value

      this.erase(this.context, this.drawingSurface)
      this.activeLine.removeCharacterBeforeCaret()

      t = this.activeLine.text.slice(0, this.activeLine.caret)
      w = this.context.measureText(t).width

      this.moveCursor(this.activeLine.left + w, this.activeLine.bottom)

      this.draw(this.context)

      context.restore()
    }
  }
}