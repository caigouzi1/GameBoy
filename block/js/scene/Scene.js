class Scene {
    constructor(game) {
        this.game = game

        this.paddle = new Paddle(game.images.paddle)
        this.ball = new Ball(game.images.ball, game.canvas.width, game.canvas.height)
        this.blocks = []
        
        // 注册键盘响应
        this.register()
    }

    // 注册键盘响应
    register() {
        // 注册键盘响应
        let self = this
        this.game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        this.game.registerAction('ArrowLeft', () => {
            this.paddle.moveLeft()
        })
        this.game.registerAction('d', () => {
            this.paddle.moveRight(this.game.w)
        })
        this.game.registerAction('ArrowRight', () => {
            this.paddle.moveRight(this.game.w)
        })
        // 空格发射
        addEventListener('keyup', (event) => {
            if (event.key == ' ') {
                this.ball.fire()
            }
        })
    }

    loadBlock(bs) {
        bs.forEach(k => {
            this.blocks.push(new Block(this.game.images.block, k))
        })
    }


    // 画出图形
    draw() {
        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)
        this.game.drawBlock(this.blocks)
    }

    // 更新图形位置
    update() {
        this.ball.move()
        // ball反弹
        if (this.paddle.collide(this.ball)) {
            this.ball.speedY *= -1
        }
        this.blocks.forEach(k => {
            if (k.alive) {
                if (k.collide(this.ball)) {
                    k.kill()
                    this.ball.speedY *= -1
                }
            }
        })
    }



}