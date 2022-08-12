const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const toolbox = document.querySelector(".toolbox")
const sizeEl = document.getElementById("size")
const range = document.getElementById("size-range")
const colors = document.getElementById("color")
const clear = document.getElementById("clear")

let size = +sizeEl.textContent
let color = colors.value
let isPressed = false
let x
let y

function useMobile() {
  if (window.innerWidth < 500) {
    canvas.width = window.innerWidth - window.innerWidth * 0.25
    canvas.height = canvas.width
    toolbox.style.width = `${canvas.width + 4}px`
  }
  return
}

function drawCircle(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.stroke()
}

function setColor(e) {
  color = e.target.value
}

function updateSize(e) {
  size = e.target.value
  sizeEl.textContent = size
}

function beginDraw(e) {
  isPressed = true
  x = e.offsetX
  y = e.offsetY
  drawCircle(x, y)
}

function endDraw(e) {
  isPressed = false
  x = undefined
  y = undefined
}

function draw(e) {
  if (isPressed) {
    const x2 = e.offsetX
    const y2 = e.offsetY
    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)
    x = x2
    y = y2
  }
}

function clearDraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function main() {
  useMobile()
  window.onresize = useMobile
  canvas.addEventListener("pointerdown", beginDraw)
  canvas.addEventListener("pointermove", draw)
  canvas.addEventListener("pointerup", endDraw)
  range.addEventListener("change", updateSize)
  colors.addEventListener("change", setColor)
  clear.addEventListener("pointerup", clearDraw)
}

main()
