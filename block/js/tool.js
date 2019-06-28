var log = console.log.bind(console)

var imgFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}