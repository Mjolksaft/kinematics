import Vector from "./vector.js";

export default class Fabrik {
    constructor(joints, rootPosition) {
        this.joints = joints;
        this.rootPosition = rootPosition;
        this.target = new Vector(this.joints[0].x - 25, this.joints[0].y);
        this.newTarget = null;
        
        this.size = 10;
        this.length = 30;
        this.speed = 3;
        this.direction = new Vector(0, -1);
        this.moving = false;
    }

    update() {
        this.handleMovement();
        this.adjustTargetIfNeeded(this.target, this.rootPosition, 40);
        this.performForwardReaching(this.target);
        this.performBackwardReaching(this.rootPosition);

        if (this.newTarget) {
            this.target = this.lerp(this.target, this.newTarget, 0.03);
        }
    }

    handleMovement() {
        if (this.joints[0].y < 0) {
            this.direction.y = 1;
        } else if (this.joints[0].y > 500) {
            this.direction.y = -1;
        }

        this.joints[0].y += 0.5 * this.direction.y;
    }

    adjustTargetIfNeeded(target, rootPosition, threshold) {
        let distance = Vector.distance(target, rootPosition);
        if (distance > threshold) {

            this.newTarget = new Vector(
                rootPosition.x - 25,
                rootPosition.y + this.direction.y * 30
            );
        }
    }

    lerp(start, end, t) {
        return Vector.add(Vector.scale(start, 1 - t), Vector.scale(end, t));
    }

    performForwardReaching(target) {
        this.joints[this.joints.length - 1] = target;
        for (let i = this.joints.length - 2; i >= 0; i--) {
            let direction = Vector.norm(Vector.sub(this.joints[i + 1], this.joints[i]));
            this.joints[i] = Vector.sub(this.joints[i + 1], Vector.scale(direction, this.length));
        }
    }

    performBackwardReaching(rootPosition) {
        this.joints[0] = rootPosition;
        for (let i = 1; i < this.joints.length; i++) {
            let direction = Vector.norm(Vector.sub(this.joints[i], this.joints[i - 1]));
            this.joints[i] = Vector.add(this.joints[i - 1], Vector.scale(direction, this.length));
        }
    }

    draw(ctx) {
        this.drawJoints(ctx);
        this.drawLimbs(ctx);
        this.drawTarget(ctx, this.target);

        if (this.newTarget) {
            this.drawTarget(ctx, this.newTarget, "blue"); // Optionally use different color for new target
        }
    }

    drawJoints(ctx) {
        ctx.lineWidth = 2;
        for (let joint of this.joints) {
            ctx.beginPath();
            ctx.arc(joint.x, joint.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    drawLimbs(ctx) {
        ctx.lineWidth = 4;
        for (let i = 0; i < this.joints.length - 1; i++) {
            const limb = this.joints[i];
            const next = this.joints[i + 1];
            const angle = Vector.angle(next, limb);

            ctx.beginPath();
            ctx.moveTo(limb.x + Math.cos(angle) * this.size, limb.y + Math.sin(angle) * this.size);
            ctx.lineTo(next.x - Math.cos(angle) * this.size, next.y - Math.sin(angle) * this.size);
            ctx.stroke();
        }
    }

    drawTarget(ctx, target, color = "black") {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(target.x, target.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "black"; // Reset to default color
    }
}
