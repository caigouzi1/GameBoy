class Game {
    constructor(images, callback) {
        this.canvas = document.getElementById('id-canvas-draw')
        this.ctx = this.canvas.getContext('2d')

        this.scence = null
        this.callback = callback
        this.w = this.canvas.width

        // 响应键盘操作
        this.keydowns = {}
        this.actions = {}

        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })

        this.images = this.load(images)
        while(this.images) {
            this.callback()
            break
        }
    }


    load = function (obj) {
        let imgs = {}
        let arr = Object.keys(obj)
        if (arr.length >= 1) {
            arr.map(x => {
                if (typeof obj[x] == 'object') {
                    imgs[x] = this.load(obj[x])
                } else {
                    let img = new Image()
                    img.src = obj[x]
                    imgs[x] = img
                }
            })
        }
        return imgs
    }





    // 注册响应事件
    registerAction(key, callback) {
        this.actions[key] = callback
    }

    // 载入图片
    drawImage(image) {
        this.ctx.drawImage(image.img, image.x, image.y)
    }

    // 载入砖块数组
    drawBlock(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].alive) {
                this.drawImage(blocks[i])
            }
        }
    }

    // 刷新函数 需要重写方法
    update() {
    }

    // 加载图像函数 需重写
    draw() {
    }

    // 刷新图片位置
    runloop() {
        let key = Object.keys(this.actions)
        for (let i = 0; i < key.length; i++) {
            if (this.keydowns[key[i]]) {
                this.actions[key[i]]()
            }
        }

        // 调用更新函数
        this.update()

        let self = this
        // 清空屏幕
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas

        // 画出图片
        this.draw()

        setTimeout((function () {
            self.runloop()
        }), 1000 / 60)
    }

}
