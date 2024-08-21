import Fabrik from './modules/Fabrik.js'
import Vector from './modules/vector.js'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 500
canvas.height = 500

let limb;
let points = [new Vector(250, 250), new Vector(200, 250), new Vector(150, 250)]
function setup() {
    limb = new Fabrik(points, points[0])
    draw()
    // addEventListener('mousemove', mouse)
}

function mouse(event) {
    let x = event.x
    let y = event.y
    if (x || y) {
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
            limb.followMouse(new Vector(x, y))
        }
    }
}

function draw() {
    // redraw first frame
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    limb.draw(ctx)
    limb.update()

    requestAnimationFrame(draw)
}

setup()