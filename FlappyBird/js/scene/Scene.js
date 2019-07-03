class Scene {
    constructor(game) {
        this.game = game
        this.register()
        this.drawList = []
        this.background =  {
            'img': this.game.images['bg'],
            'x': 0,
            'y': 0,
        }
        this.init() 
    }


    addDraw(obj) {
        this.drawList.push(obj)
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


    update() {

    }

    draw() {
        this.scence.drawList.map(k => {
            this.drawImage(k)
        })
        
        
    }

    init() {
        this.game.draw = this.draw
        this.game.update = this.update
        this.addDraw(this.background)
    }

}