import { vector } from "./vector.js"

export class limb  {

    constructor(pos, length, parent, rotationSpeed) {
        this.pos = pos
        this.length = length
        this.parent = parent
        this.rotationSpeed = 0.01
        this.limit = Math.PI/3
        this.angle = new vector(0,-1)
        this.finalRotation = null
        this.targetPos = null
        this.calculateB()
    }

    lookAt(x,y) {
        this.targetPos = new vector(x,y)
        let targetAngle = Math.atan2(this.targetPos.y - this.pos.y, this.targetPos.x - this.pos.x);
        this.angle.setRotation(targetAngle)
        this.angle.mult(-1)
        this.pos = this.targetPos.add(this.angle)
    }
    
    calculateB() {
        const rad = Math.atan2(this.angle.y, this.angle.x)
        const newEndPosX = this.pos.x + this.length * Math.cos(rad);
        const newEndPosY = this.pos.y + this.length * Math.sin(rad);
        this.endPos = new vector(newEndPosX, newEndPosY);
        if (this.parent) {
            this.pos = this.parent.endPos
        } 
    }

    angleBetweenParent(rotation) {
        // dot product a.b/|a||b|
        const a = new vector(this.endPos.x - this.pos.x, this.endPos.y - this.pos.y)
        const b = this.parent ? new vector(this.parent.endPos.x - this.parent.pos.x, this.parent.endPos.y - this.parent.pos.y) : new vector(this.pos.x + this.angle.x, this.pos.y + this.angle.y)
        const mag1 = Math.sqrt(a.x**2 + a.y**2)
        const mag2 = Math.sqrt(b.x**2 + b.y**2)

        a.rotate(rotation) // rotate by new rotation then check angle 
        const dot = (a.x*b.x + a.y*b.y)/(mag1*mag2)
        // Calculate the angle in radians
        const angleRadians = Math.acos(dot);

        return angleRadians
    }   

    update() {
        if (this.parent) {
            this.pos = this.parent.endPos
        }
        this.calculateB()
    }

    show(c) {

        c.strokeStyle = 'white'
        c.beginPath()
        c.moveTo(this.pos.x, this.pos.y) 
        c.lineTo(this.endPos.x, this.endPos.y)
        c.stroke()

        c.fillStyle = 'white'
        c.beginPath()
        c.arc(this.pos.x, this.pos.y, 5, 0, Math.PI * 2, false)
        c.fill()
    }
}