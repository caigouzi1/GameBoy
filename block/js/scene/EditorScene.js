// 关卡编辑
class EditorScene extends Scene {
    constructor(game) {
        super(game)
    }

    // 画出图形
    draw() {
        this.game.drawBlock(this.blocks)
    }
}