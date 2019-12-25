/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-25 14:31:55
 * @LastEditTime : 2019-12-25 15:57:57
 */
;(() => {
  const topCanvas = document.querySelector('#topCanvas')
  const topContext = topCanvas.getContext('2d')
  const width = topCanvas.width
  const height = topCanvas.height
  const animateButton = document.querySelector('#topAnimateButton')
  const timeBasedMotionCheckbox = document.querySelector('#timeBasedMotionCheckbox')
  const discs = [
    {
      x: 150,
      y: 250,
      lastX: 150,
      lastY: 250,
      velocityX: -3.2,
      velocityY: 3.5,
      radius: 25,
      innerColor: 'rgba(255,255,0,1)',
      middleColor: 'rgba(255,255,0,0.7)',
      outerColor: 'rgba(255,255,0,0.5)',
      shadowColor: 'rgba(175,175,175,0.7)',
      strokeStyle: 'gray'
    },
    {
      x: 50,
      y: 150,
      lastX: 50,
      lastY: 150,
      velocityX: 2.2,
      velocityY: 2.5,
      radius: 25,
      innerColor: 'rgba(100,145,230,1.0)',
      middleColor: 'rgba(100,145,230,0.7)',
      outerColor: 'rgba(100,145,230,0.5)',
      shadowColor: 'rgba(100,145,230,0.8)',
      strokeStyle: 'blue'
    },
    {
      x: 150,
      y: 75,
      lastX: 150,
      lastY: 75,
      velocityX: 1.2,
      velocityY: 1.5,
      radius: 25,
      innerColor: 'rgba(255,0,0,1.0)',
      middleColor: 'rgba(255,0,0,0.7)',
      outerColor: 'rgba(255,0,0,0.5)',
      shadowColor: 'rgba(255,0,0,0.7)',
      strokeStyle: 'orange'
    },
    {
      x: 50,
      y: 150,
      lastX: 150,
      lastY: 250,
      velocityX: -3.2,
      velocityY: -3.5,
      radius: 25,
      innerColor: 'rgba(255,255,0,1)',
      middleColor: 'rgba(255,255,0,0.7)',
      outerColor: 'rgba(255,255,0,0.5)',
      shadowColor: 'rgba(175,175,175,0.7)',
      strokeStyle: 'gray'
    },
    {
      x: 50,
      y: 75,
      lastX: 50,
      lastY: 150,
      velocityX: 2.2,
      velocityY: -2.5,
      radius: 25,
      innerColor: 'rgba(100,145,230,1.0)',
      middleColor: 'rgba(100,145,230,0.7)',
      outerColor: 'rgba(100,145,230,0.5)',
      shadowColor: 'rgba(100,145,230,0.8)',
      strokeStyle: 'blue'
    },
    {
      x: 200,
      y: 175,
      lastX: 150,
      lastY: 75,
      velocityX: -1.9,
      velocityY: 1.2,
      radius: 25,
      innerColor: 'rgba(255,0,0,1.0)',
      middleColor: 'rgba(255,0,0,0.7)',
      outerColor: 'rgba(255,0,0,0.5)',
      shadowColor: 'rgba(255,0,0,0.7)',
      strokeStyle: 'orange'
    },
    {
      x: 250,
      y: 250,
      lastX: 150,
      lastY: 250,
      velocityX: 5.2,
      velocityY: -3.5,
      radius: 25,
      innerColor: 'rgba(255,255,0,1)',
      middleColor: 'rgba(255,255,0,0.7)',
      outerColor: 'rgba(255,255,0,0.5)',
      shadowColor: 'rgba(175,175,175,0.7)',
      strokeStyle: 'gray'
    },
    {
      x: 150,
      y: 100,
      lastX: 50,
      lastY: 150,
      velocityX: -2.9,
      velocityY: -1.5,
      radius: 25,
      innerColor: 'rgba(100,145,230,1.0)',
      middleColor: 'rgba(100,145,230,0.7)',
      outerColor: 'rgba(100,145,230,0.5)',
      shadowColor: 'rgba(100,145,230,0.8)',
      strokeStyle: 'blue'
    },
    {
      x: 215,
      y: 175,
      lastX: 150,
      lastY: 75,
      velocityX: -2.2,
      velocityY: 2.5,
      radius: 25,
      innerColor: 'rgba(255,0,0,1.0)',
      middleColor: 'rgba(255,0,0,0.7)',
      outerColor: 'rgba(255,0,0,0.5)',
      shadowColor: 'rgba(255,0,0,0.7)',
      strokeStyle: 'orange'
    },
    {
      x: 250,
      y: 150,
      lastX: 150,
      lastY: 250,
      velocityX: 4.2,
      velocityY: -5.5,
      radius: 25,
      innerColor: 'rgba(255,255,0,1)',
      middleColor: 'rgba(255,255,0,0.7)',
      outerColor: 'rgba(255,255,0,0.5)',
      shadowColor: 'rgba(175,175,175,0.7)',
      strokeStyle: 'gray'
    },
    {
      x: 150,
      y: 75,
      lastX: 50,
      lastY: 150,
      velocityX: 3.2,
      velocityY: -3.5,
      radius: 25,
      innerColor: 'rgba(100,145,230,1.0)',
      middleColor: 'rgba(100,145,230,0.7)',
      outerColor: 'rgba(100,145,230,0.5)',
      shadowColor: 'rgba(100,145,230,0.8)',
      strokeStyle: 'blue'
    },
    {
      x: 100,
      y: 100,
      lastX: 150,
      lastY: 75,
      velocityX: -2.9,
      velocityY: -2.2,
      radius: 25,
      innerColor: 'rgba(255,0,0,1.0)',
      middleColor: 'rgba(255,0,0,0.7)',
      outerColor: 'rgba(255,0,0,0.5)',
      shadowColor: 'rgba(255,0,0,0.7)',
      strokeStyle: 'orange'
    },
    {
      x: 150,
      y: 250,
      lastX: 150,
      lastY: 250,
      velocityX: -5.2,
      velocityY: 5.5,
      radius: 25,
      innerColor: 'rgba(255,255,0,1)',
      middleColor: 'rgba(255,255,0,0.7)',
      outerColor: 'rgba(255,255,0,0.5)',
      shadowColor: 'rgba(175,175,175,0.7)',
      strokeStyle: 'gray'
    },
    {
      x: 50,
      y: 150,
      lastX: 50,
      lastY: 150,
      velocityX: 4.2,
      velocityY: 4.5,
      radius: 25,
      innerColor: 'rgba(100,145,230,1.0)',
      middleColor: 'rgba(100,145,230,0.7)',
      outerColor: 'rgba(100,145,230,0.5)',
      shadowColor: 'rgba(100,145,230,0.8)',
      strokeStyle: 'blue'
    },
    {
      x: 150,
      y: 75,
      lastX: 150,
      lastY: 75,
      velocityX: 2.2,
      velocityY: 2.5,
      radius: 25,
      innerColor: 'rgba(255,0,0,1.0)',
      middleColor: 'rgba(255,0,0,0.7)',
      outerColor: 'rgba(255,0,0,0.5)',
      shadowColor: 'rgba(255,0,0,0.7)',
      strokeStyle: 'orange'
    },
    {
      x: 50,
      y: 150,
      lastX: 150,
      lastY: 250,
      velocityX: -0.2,
      velocityY: -1.5,
      radius: 25,
      innerColor: 'rgba(255,255,0,1)',
      middleColor: 'rgba(255,255,0,0.7)',
      outerColor: 'rgba(255,255,0,0.5)',
      shadowColor: 'rgba(175,175,175,0.7)',
      strokeStyle: 'gray'
    },
    {
      x: 50,
      y: 75,
      lastX: 50,
      lastY: 150,
      velocityX: 1.2,
      velocityY: -2.5,
      radius: 25,
      innerColor: 'rgba(100,145,230,1.0)',
      middleColor: 'rgba(100,145,230,0.7)',
      outerColor: 'rgba(100,145,230,0.5)',
      shadowColor: 'rgba(100,145,230,0.8)',
      strokeStyle: 'blue'
    },
    {
      x: 200,
      y: 175,
      lastX: 150,
      lastY: 75,
      velocityX: 1.9,
      velocityY: -1.2,
      radius: 25,
      innerColor: 'rgba(255,0,0,1.0)',
      middleColor: 'rgba(255,0,0,0.7)',
      outerColor: 'rgba(255,0,0,0.5)',
      shadowColor: 'rgba(255,0,0,0.7)',
      strokeStyle: 'orange'
    },
    {
      x: 250,
      y: 250,
      lastX: 150,
      lastY: 250,
      velocityX: 3.2,
      velocityY: -5.5,
      radius: 25,
      innerColor: 'rgba(255,255,0,1)',
      middleColor: 'rgba(255,255,0,0.7)',
      outerColor: 'rgba(255,255,0,0.5)',
      shadowColor: 'rgba(175,175,175,0.7)',
      strokeStyle: 'gray'
    },

    {
      x: 150,
      y: 100,
      lastX: 50,
      lastY: 150,
      velocityX: -1.9,
      velocityY: -2.5,
      radius: 25,
      innerColor: 'rgba(100,145,230,1.0)',
      middleColor: 'rgba(100,145,230,0.7)',
      outerColor: 'rgba(100,145,230,0.5)',
      shadowColor: 'rgba(100,145,230,0.8)',
      strokeStyle: 'blue'
    },

    {
      x: 215,
      y: 175,
      lastX: 150,
      lastY: 75,
      velocityX: -3.2,
      velocityY: 4.5,
      radius: 25,
      innerColor: 'rgba(255,0,0,1.0)',
      middleColor: 'rgba(255,0,0,0.7)',
      outerColor: 'rgba(255,0,0,0.5)',
      shadowColor: 'rgba(255,0,0,0.7)',
      strokeStyle: 'orange'
    },
    {
      x: 250,
      y: 150,
      lastX: 150,
      lastY: 250,
      velocityX: 2.2,
      velocityY: -4.5,
      radius: 25,
      innerColor: 'rgba(255,255,0,1)',
      middleColor: 'rgba(255,255,0,0.7)',
      outerColor: 'rgba(255,255,0,0.5)',
      shadowColor: 'rgba(175,175,175,0.7)',
      strokeStyle: 'gray'
    },

    {
      x: 150,
      y: 75,
      lastX: 50,
      lastY: 150,
      velocityX: 2.2,
      velocityY: -1.5,
      radius: 25,
      innerColor: 'rgba(100,145,230,1.0)',
      middleColor: 'rgba(100,145,230,0.7)',
      outerColor: 'rgba(100,145,230,0.5)',
      shadowColor: 'rgba(100,145,230,0.8)',
      strokeStyle: 'blue'
    },

    {
      x: 100,
      y: 100,
      lastX: 150,
      lastY: 75,
      velocityX: -5.9,
      velocityY: -0.2,
      radius: 25,
      innerColor: 'rgba(255,0,0,1.0)',
      middleColor: 'rgba(255,0,0,0.7)',
      outerColor: 'rgba(255,0,0,0.5)',
      shadowColor: 'rgba(255,0,0,0.7)',
      strokeStyle: 'orange'
    }
  ]
  const lastFpsUpdate = { time: 0, value: 0 }

  let paused = true
  let startTime = new Date().getTime()
  let lastTime = 0
  let elapsedTime = 0
  let fps = 0

  const calculateFps = now => {
    elapsedTime = now - lastTime
    fps = 1000 / elapsedTime
    lastTime = now
  }

  const updateFps = () => {
    let now = new Date().getTime()

    calculateFps(now)

    if (now - startTime < 2000) {
      return
    }

    if (now - lastFpsUpdate.time > 1000) {
      lastFpsUpdate.time = now
      lastFpsUpdate.value = fps
    }

    if (!paused) {
      topContext.fillStyle = 'cornflowerblue'
      topContext.fillText(lastFpsUpdate.value.toFixed() + ' fps', 50, 48)
    }
  }

  const updateTimeBased = time => {
    let deltaX
    let deltaY
    let rate = elapsedTime / 1000

    if (fps == 0) return

    discs.forEach(disc => {
      deltaX = disc.velocityX * rate
      deltaY = disc.velocityY * rate

      if (disc.x + deltaX + disc.radius > width || disc.x + deltaX - disc.radius < 0) {
        disc.velocityX = -disc.velocityX
        deltaX = -deltaX
      }

      if (disc.y + deltaY + disc.radius > height || disc.y + deltaY - disc.radius < 0) {
        disc.velocityY = -disc.velocityY
        deltaY = -deltaY
      }

      disc.x += deltaX
      disc.y += deltaY

      drawDisc(topContext, disc)
    })
  }

  const animate = time => {
    if (time === undefined) {
      time = new Date().getTime()
    }

    if (!paused) {
      topContext.clearRect(0, 0, width, height)
      drawBackground(topContext, width, height)
      timeBasedMotionCheckbox.checked ? updateTimeBased(time) : update(discs, topContext, width, height)
    }

    updateFps()
  }

  animateButton.onclick = () => {
    paused = !paused
    animateButton.value = paused ? 'Animate' : 'Pause'
  }

  timeBasedMotionCheckbox.addEventListener('click', () => {
    timeBasedMotionHandle(discs, timeBasedMotionCheckbox.checked)
  })

  topContext.font = '36px Helvetica'
  drawBackground(topContext, width, height)
  setInterval(animate, 1000 / 60)
})()
