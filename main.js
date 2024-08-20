import { limb } from './modules/limb.js'
import {vector} from './modules/vector.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 500
canvas.height = 500

const segment = new limb(new vector(250,250), 50, null, 0.0)
const limbs = []

function setup() {
    limbs.push(segment)
    // for (let i = 0; i < 9; i++) {
    //         const newSegment1 = new limb(limbs[i].endPos, 20, limbs[i], 0.01)
    //         limbs.push(newSegment1)

    // }
    draw() 
    addEventListener('mousemove', mouse) 
}

function mouse(event) {
    let x = event.x
    let y = event.y
    if (x || y) {
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
            for (let i = 0; i < limbs.length; i++) {
                limbs[i].lookAt(x,y) 
                
            }
        }
    }
}

function draw() {
    // redraw first frame
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)
    for (let i = 0; i < limbs.length; i++) {
        limbs[i].show(c)        
        limbs[i].update()
        
    }
    
    requestAnimationFrame(draw)
}

setup()