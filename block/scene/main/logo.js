var Logo = function(game) {
    var o = game.imagebyname('logo')
    o.x = 290
    o.y = 350
    o.speed = 7
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 600 - o.w) {
            x = 600 - o.w
        }
        o.x = x
    }
    o.moveleft = function() {
        o.move(o.x - o.speed)
    }
    o.moveright = function() {
        o.move(o.x + o.speed)
    }
    var aInb = function(x, x1 ,x2){
        return x >= x1 && x <= x2
    }
    o.collide = function (ball) {
        // if (ball.y +ball.image.height > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.image.width) {
        //             return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        if(aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if(aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    return o
}
