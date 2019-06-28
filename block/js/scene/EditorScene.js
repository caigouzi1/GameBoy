// 关卡编辑
class EditorScene extends Scene {
    constructor(game) {
        super(game)
        this.game.canvas.addEventListener('click', event => {
            if (event.offsetY < 400) {
                this.click(event.offsetX, event.offsetY)
            }
        })
    }


    // // BUG:响应点击操作
    // click(x, y) {
    //     let blocks = this.blocks
    //     let p = [x, y]
    //     if (blocks.length > 0) {
    //         for (let index = 0; index < blocks.length; index++) {
    //             let k = blocks[index]
    //             if (k.x <= p[0] && (k.x + k.w) >= p[0] && k.y <= p[1] && (k.y + k.h) >= p[1]) {
    //                 if (k.lifes < 3) {
    //                     log('21:  hou')
    //                     k.lifes++
    //                     break
    //                 }
    //             }
    //             if ((index + 1) == blocks.length) {
    //                 log('27:  xian')
    //                 blocks.push(new Block(this.game.images.block, p))
    //             }
    //         }
    //     } else {
    //         blocks.push(new Block(this.game.images.block, p))
    //     }
    // }

    // 响应点击操作
    click(x, y) {
        let blocks = this.blocks
        let p = [x, y]
        if (blocks.length > 0) {
            let flag = true
            for (let index = 0; index < blocks.length; index++) {
                let k = blocks[index]
                if (k.x <= p[0] && (k.x + k.w) >= p[0] && k.y <= p[1] && (k.y + k.h) >= p[1]) {
                    k.lifes ++
                    flag = false
                    break
                }
            }
            if(flag){
                blocks.push(new Block(this.game.images.block, p))
            }
        } else {
            blocks.push(new Block(this.game.images.block, p))
        }
    }

    // 画出图形
    draw() {
        this.game.drawBlock(this.blocks)
    }

    update() {

    }
}