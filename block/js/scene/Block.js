class Block {
    constructor(images, p) {
        this.x = p[0]
        this.y = p[1]
        this.lifes = p[2] || 1
        this.img = images[this.lifes]
        this.h = 40
        this.w = 20
        // let self = this
        // this.img.onload = function () {
        //     self.w = this.width
        //     self.h = this.height
        //     log(`H: ${self.h}`)
        //     log(`W: ${self.w}`)
        // }
        this.alive = true
    }

    kill() {
        if (this.lifes > 1) {
            this.lifes--
        } else {
            this.alive = false
        }
    }

    aInb(x, y, pad) {
        return (x >= pad.x && x <= (pad.x + pad.w)) && (y >= pad.y && y <= (pad.y + pad.h))
    }

    // 碰撞检测
    collide(ball) {
        let a = this
        let b = ball
        return (this.aInb(b.x, b.y, a) || this.aInb(b.x + b.w, b.y, a) || this.aInb(b.x, b.y + b.h, a) || this.aInb(b.x + b.w, b.y + b.h, a))
    }
}