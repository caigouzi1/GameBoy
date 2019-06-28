class Ball {
    constructor(image, x, y) {
        this.img = image
        let self = this
        this.img.onload = function () {
            self.w = this.width
            self.h = this.height
        }
        this.x = 250
        this.y = 350
        this.boxWeight = x
        this.boxHeight = y
        this.speedX = 5
        this.speedY = 8
        this.isFire = false
    }

    // 发射
    fire() {
        this.isFire = !this.isFire
    }

    move() {
        if (this.isFire) {
            if (this.x < 0 || this.x + this.w > this.boxWeight) {
                this.speedX = -this.speedX
            }
            if (this.y < 0 || this.y + this.h > this.boxHeight) {
                this.speedY = -this.speedY
            }
            this.x += this.speedX
            this.y += this.speedY
        }
    }
}