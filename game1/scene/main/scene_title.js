class sceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registeraction('k', function() {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        //draw text
        this.game.context.fillText('按k开始游戏',290, 195)
    }
}
