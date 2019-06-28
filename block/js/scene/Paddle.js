class Paddle {
    constructor(image) {
        this.img = image
        let self = this
        this.img.onload = function () {
            self.w = this.width
            self.h = this.height
        }
        this.x = 210
        this.y = 550
        this.speed = 5
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed
        }

    }
    moveRight(max) {
        if ((this.x + this.w) < max) {
            this.x += this.speed
        }
    }

    aInb(x, y, pad) {
        return (x >= pad.x && x <= (pad.x + pad.w)) && (y >= pad.y && y <= (pad.y + pad.h))
    }

    collide(ball) {
        let a = this
        let b = ball
        return (this.aInb(b.x, b.y, a) || this.aInb(b.x + b.w, b.y, a) || this.aInb(b.x, b.y + b.h, a) || this.aInb(b.x + b.w, b.y + b.h, a))
    }
}