var Scene = function(game) {
    var s = {
        game: game,
    }
    //初始化
    var logo = Logo(game)
    var ball = Ball(game)
    var score = 0
    var blocks = loadLevel(game, 1)

    game.registeraction('ArrowLeft', function() {
        logo.moveleft()
    })
    game.registeraction('ArrowRight', function() {
        logo.moveright()
    })
    game.registeraction(' ', function() {
        ball.fire()
    })

    s.draw = function() {
        //draw 背景
        game.context.fillStyle = 'rgb(113, 179, 247)';
        game.context.fillRect(0, 0, 600, 400)
        game.drawImage(logo)
        game.drawImage(ball)
        for (var i = 0;i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        //draw text
        game.context.fillText('分数：' + score,10, 380)
    }
    s.update = function() {
        ball.move()
        // 游戏结束
        if (ball.y > logo.y) {
            //跳转到游戏结束的场景
            var end = sceneEnd.new(game)
            game.replaceScene(end)
        }
        // 判断相撞ball logo
        if (logo.collide(ball)) {
            ball.fantan()
        }
        //判断相撞ball blocks
        for (var i = 0;i < blocks.length; i++) {
            var block = blocks[i]
            if(block.collide(ball)) {
                block.kill()
                ball.fantan()
                //更新分数
                score += 50
            }
        }
    }

    //mouse events
    var enableDrag = false
    game.canvas.addEventListener('mousedown' ,function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y)
        if (ball.hasPoint(x, y)) {
        //设置拖拽状态
        enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove' ,function(event) {
        var x = event.offsetX
        var y = event.offsetY
        if(enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup' ,function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, 'up')
        enableDrag = false
    })

    return s
}
