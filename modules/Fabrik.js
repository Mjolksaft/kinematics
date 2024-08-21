import Vector from "./vector.js";

export default class Fabrik {
    constructor(joints, rootPosition) {
        this.joints = joints
        this.rootPosition = rootPosition
        this.target = new Vector(this.joints[0].x - 25, this.joints[0].y)
        this.newTarget= null;
        this.size = 10
        this.length = 30
        this.speed = 3
        this.directon = new Vector(0, -1)
    }

    update() {
        this.movement();

        this.adjustTargetPosition(this.target, this.rootPosition, 40);

        this.forwardReaching(this.target);
        this.backwardReaching(this.rootPosition);

        if (this.newTarget) {
            this.target = this.lerp(this.target, this.newTarget, 0.1)
        }
    }

    movement() {
        if (this.joints[0].y < 0) {
            this.directon.y = 1
        }
        if (this.joints[0].y > 500) {
            this.directon.y = -1
        }

        this.joints[0].y += 0.5 * this.directon.y
    }

    adjustTargetPosition(target, rootPosition, x) {
        let distance = Vector.distance(target, rootPosition);
        if (distance > x) {
            this.newTarget = new Vector(rootPosition.x - 25, rootPosition.y + this.directon.y * 30) 
        }
    }

    lerp (start, end, amt){
        return Vector.add(Vector.scale(start,(1-amt)), Vector.scale(end,amt))
    }

    forwardReaching(target) {
        // // Move the end effector to the target
        this.joints[this.joints.length - 1] = target;
        for (let i = this.joints.length - 2; i >= 0; i--) {
            let subVector = Vector.sub(this.joints[i + 1], this.joints[i])
            let normalizedVector = Vector.norm(subVector)

            this.joints[i] = Vector.sub(this.joints[i + 1], Vector.scale(normalizedVector, this.length))
        }
    }

    backwardReaching(rootPosition) {
        this.joints[0] = rootPosition

        for (let i = 1; i < this.joints.length; i++) {
            let subVector = Vector.sub(this.joints[i], this.joints[i - 1])
            let normalizedVector = Vector.norm(subVector)

            this.joints[i] = Vector.add(this.joints[i - 1], Vector.scale(normalizedVector, this.length))
        }
    }

    draw(ctx) {

        // draw control points 
        for (let i = 0; i < this.joints.length; i++) {
            const joint = this.joints[i];
            ctx.lineWidth = 2;
            ctx.beginPath()
            ctx.arc(joint.x, joint.y, this.size, 0, Math.PI * 2)
            ctx.stroke()
        }

        // draw Line between
        for (let i = 0; i < this.joints.length - 1; i++) {
            const limb = this.joints[i];
            const next = this.joints[i + 1];

            const angle = Vector.angle(next, limb)

            ctx.lineWidth = 4;
            ctx.beginPath()
            ctx.moveTo(limb.x + Math.cos(angle) * this.size, limb.y + Math.sin(angle) * this.size)
            ctx.lineTo(next.x - Math.cos(angle) * this.size, next.y - Math.sin(angle) * this.size)
            ctx.stroke()
        }

        //draw target
        ctx.beginPath()
        ctx.arc(this.target.x, this.target.y, this.size, 0, Math.PI * 2)
        ctx.stroke()

        if (this.newTarget) {
            //draw target
            ctx.beginPath()
            ctx.arc(this.newTarget.x, this.newTarget.y, this.size, 0, Math.PI * 2)
            ctx.stroke()
        }
    }
}