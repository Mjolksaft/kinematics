export class vector {
    constructor(x, y) { 
        this.x = x
        this.y = y

    }

    normalize() {
        const mag = Math.sqrt(this.x**2 + this.y**2) 

        if (mag == 0) {
            return
        }

        this.x = this.x/mag
        this.y = this.y/mag
    }

    add(term) {
        this.x += term.x
        this.y += term.y
        return this
    }

    sub(term) {
        this.x -= term.x
        this.y -= term.y
    }

    mult(factor) {
        this.x *= factor
        this.y *= factor
    }
    
    limit(max) {
        const mag = Math.sqrt(this.x ** 2 + this.y ** 2);
    
        if (mag > max) {
            this.x /= mag;
            this.y /= mag; // put it to one 
    
            this.x *= max; // make it 5 
            this.y *= max;
        }
    }   

    setRotation(angle) {
        const newX = Math.cos(angle)
        const newY = Math.sin(angle)
        this.x = newX
        this.y = newY
        return this
    }

    getRad() {
        return Math.atan2(this.y, this.x)
    }
    rotate(angle) {
        const newX = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        const newY = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        this.x = newX
        this.y = newY
        return this
    }
}