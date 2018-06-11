class sceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registeraction('r', function() {
            var s = sceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        //draw text
        this.game.context.fillText('游戏结束，按R返回标题界面',240, 195)
    }
}
