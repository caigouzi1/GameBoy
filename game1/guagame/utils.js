// var e = sel => document.querySelector(sel)
// var log = function(s) {
//     e('#textlog').value += '\n' + s
// }

var log = console.log.bind(console)

var imagefrompath = function(path) {
    var img=new Image();
    img.src= path
    return img
}

var rectIntersects = function(a, b) {
    if (b.y > a.y && b.y < a.y +a.h) {
        if (b.x > a.x && b.x < a.x + a.w) {
            return true
        }
    }
    return false
}
