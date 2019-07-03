var log = console.log.bind(console)

var imgFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

// 给父元素的子节点添加内容
var appendHtml = function (element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var e = function(element) {
    return document.querySelector(element)
}