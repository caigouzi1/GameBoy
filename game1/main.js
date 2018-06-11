var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i=0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        // block 坐标
        blocks.push(b)
    }
    return blocks
}


var enabledebugmode = function(game, enable) {
    if(!enable) {
        return
    } else {
        window.addEventListener('keydown', function(event){
            var k = event.key
            if(k == 'p') {
                window.paused = !window.paused
            } else if ('1234567'.includes(k)) {
                blocks = loadLevel(game, Number(k))
            }
        })
    }
}
var main = function() {
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        logo: 'img/logo.png',
    }
    var game = guagame.instance(60, images, function(g){
        var s =  sceneTitle.new(game)
        g.runwithscene(s)
    })
    enabledebugmode(game, true)


    //控制速度
    document.querySelector('#inputspeed').addEventListener('input', function(event){
        var input = event.target
        window.fps = Number(input.value)
        log('fps='+window.fps)
    })
}
main()
