// 关卡编辑
class EditorScene extends Scene {
    constructor(game) {
        super(game)
        this.game.canvas.addEventListener('click', event => {
            let x = event.offsetX
            let y = event.offsetY
            if (event.offsetY < 400) {
                this.click(event.offsetX, event.offsetY)
            } else if (y >= 400) {
                if (x >= 50 && x <= 145) {
                    log('退出')
                } else if (x >= 300 && x <= 395) {
                    log('保存')
                    this.saveEdit()
                    showLevel()
                }
            }
        })
    }

    getBlockPoint(p) {
        let [x, y] = p
        x = x - (x % 40)
        y = y - (y % 20)
        let point = [x, y]
        return new Block(this.game.images.block, point)
    }

    click(x, y) {
        let blocks = this.blocks
        let p = [x, y]
        if (blocks.length > 0) {
            for (let index = 0; index < blocks.length; index++) {
                let k = blocks[index]
                if (k.x <= p[0] && (k.x + k.w) >= p[0] && k.y <= p[1] && (k.y + k.h) >= p[1]) {
                    if (k.lifes < 3) {
                        k.lifes++
                        k.updateImg()
                    }
                    break
                }
                if ((index + 1) === blocks.length) {
                    blocks.push(this.getBlockPoint(p))
                    break
                }
            }
        } else {
            blocks.push(this.getBlockPoint(p))
        }
    }

    drawSave() {
        this.game.ctx.font = "48px serif";
        this.game.ctx.fillText("保存", 300, 500, 395, 500)
        this.game.ctx.fillText("退出", 50, 500, 145, 500)
    }

    drawLine() {
        this.game.ctx.beginPath() //新建一条path
        this.game.ctx.moveTo(0, 400) //把画笔移动到指定的坐标
        this.game.ctx.lineTo(this.game.w, 400)  //绘制一条从当前位置到指定坐标(200, 50)的直线.
        //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
        this.game.ctx.closePath()
        this.game.ctx.stroke() //绘制路径。
    }

    // 画出图形
    draw() {
        this.game.drawBlock(this.blocks)
        this.drawSave()
        this.drawLine()
    }

    update() {

    }

    saveEdit() {
        let len = this.blocks.length
        let arr = []
        if (len == 0) {
            alert("请编辑地图")
        } else {
            this.blocks.map((k) => {
                let p = [k.x, k.y, k.lifes]
                arr.push(p)
            })
        }
        let text = localStorage.levels || "[]"
        let data = JSON.parse(text)
        let str
        log(this.level)
        if (this.level === null) {
            data.push(arr)
        } else {
            data[this.level] = arr
        }
        str = JSON.stringify(data)
        localStorage.levels = str
    }
}