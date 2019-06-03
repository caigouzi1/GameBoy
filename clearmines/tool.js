
var log = console.log.bind(console)

// 返回1 - num 之间的数字（ 包括 num ）
function getRandNum(num) {
    return Math.floor(Math.random() * num + 1)
}

// 获取页面元素
var e = function (element) {
    return document.querySelector(element)
}

var appendHtml = function (element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}