export default class Vector {
    constructor(x, y) { 
        this.x = x
        this.y = y

    }

    static angle(v0, v1) {
        return Math.atan2(v0.y - v1.y, v0.x - v1.x )
    }

    static sub(v0, v1) {
        return new Vector(v0.x - v1.x, v0.y - v1.y);
    }

    static add(v0, v1) {
        return new Vector(v0.x + v1.x, v0.y + v1.y);
    }

    static norm(v) {
        let mag = Math.sqrt(v.x**2 + v.y**2)

        return new Vector(v.x / mag, v.y / mag);

    }

    static scale(v, s) { 
        return new Vector(v.x * s, v.y * s); 
    }

    static distance (v0,v1) {
        return Math.sqrt((v0.x -v1.x)**2 + (v0.y -v1.y)**2)
    }

    static lerp(start, end, t) {
        return new Vector(
            start.x + (end.x - start.x) * t,
            start.y + (end.y - start.y) * t
        );
    }

}