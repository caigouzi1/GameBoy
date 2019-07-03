class Bird {
    constructor(images) {
        this.images = images
        this.imgCount = 0
        this.img = images[0]
        this.x = 50
        this.y = 150
        this.speed = -2
        this.g = 0.9
        this.isJump = false
        this.alive = true
        this.w = 48
        this.h = 48
        this.angle = 0
    }


    gravity() {
        this.speed += this.g
        if (this.y < 400) {
            if (this.speed < 10) {
                this.speed += this.g
            }
            this.y += this.speed
        } else {
            this.alive = false
        }

        if (this.angle < 45) {
            this.angle += 5
        }
    }

    jump() {
        if (this.isJump) {
            if (this.speed > -5) {
                this.speed -= 2
            }
            this.y += this.speed
            if (this.angle > -45) {
                this.angle -= 5
            }
        }
    }

    animation() {
        let num
        if (this.imgCount < 7) {
            if ((this.imgCount % 3) == 0) {
                num = this.imgCount / 3
                this.img = this.images[num]
                this.gravity()
            }
            this.imgCount++
        } else {
            this.imgCount = 0
        }
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