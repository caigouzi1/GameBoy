var Ball = function(game) {
    var o = game.imagebyname('ball')
    o.x = 290
    o.y = 150
    o.speedx = 5
    o.speedy = 5
    o.fired = false
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            if (o.x < 0 || o.x > 600) {
                o.speedx = -o.speedx
            }
            if (o.y < 0 || o.y > 400) {
                o.speedy = -o.speedy
            }
            o.x += o.speedx
            o.y += o.speedy
        }
    }
    o.fantan = function() {
        o.speedy *= -1
    }
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}
