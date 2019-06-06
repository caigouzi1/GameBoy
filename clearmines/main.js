
// 判断该位置并显示
function setNode(arr, x, y) {
    let node = document.getElementById(`${x}x${y}`)
    let num = arr[x][y]
    node.innerHTML = num
    node.classList.add(`x${num}`)
    if (num > 4) {
        node.classList.add(`x4`)
    }

}

// 生成html页面并插入到网页中
function insertHtml(arr) {
    let html = ''
    for (let i = 0; i < arr.length; i++) {
        var line = `<div class = 'line'>`
        for (let j = 0; j < arr[i].length; j++) {
            line += `<div id = "${i}x${j}" class = 'cell' data-x ='${i}' data-y = '${j}'>&nbsp</div>`
        }
        line += '</div>'
        html += line
    }
    return html
}

// 递归显示结果
function open(chess, intx, inty) {
    let x = Number(intx)
    let y = Number(inty)
    let arr = chess.arr
    let node = document.getElementById(`${x}x${y}`)
    let isUp = node.classList.contains('up')
    // TODO: 如果是旗子则不应该被翻开
    if (isUp) {
        return
    } else {
        node.classList.add('up')
        if (arr[x][y] == 0) {
            for (let i = x - 1; i < x + 2; i++) {
                for (let j = y - 1; j < y + 2; j++) {
                    if (chess.judgeCondition(i, j)) {
                        if (i !== x || j !== y) {
                            setNode(arr, i, j)
                            if (arr[i][j] === 0) {
                                open(chess, i, j)
                            }
                        }
                    }
                }
            }
        } else {
            return
        }
    }
}

// 遍历所有地雷
function getAllMines(chess, callback) {
    let mines = chess.Mines
    for (var [key, value] of mines) {
        for (let item of value.values()) {
            callback(key, item)
        }
    }
}

// 显示所有炸弹
function showAllBoom(chess) {
    getAllMines(chess, function (x, y) {
        setNode(chess.arr, x, y)
    })
}

function init(row, line, num) {
    var chess = new Chess(row, line, num)
    var divChess = e('#div-id-chess')
    var arr = chess.arr
    var html = insertHtml(arr)

    // 找出地雷的个数
    var findMineNum = 0
    // 标记地雷的个数
    var flagMineNum = 0

    appendHtml(divChess, html)
    appendHtml(e('#count'), `剩余地雷&nbsp${chess.num}&nbsp`)

    // 鼠标左击事件
    var leftClick = function (event) {
        let target = event.target
        if (event.target.className === 'cell') {
            let data = target.dataset
            target.innerHTML = chess.arr[data.x][data.y]

            // 判断是否爆炸
            if (chess.arr[data.x][data.y] === 'x') {
                showAllBoom(chess)
                alert('你玩的像cxk')

                // 解绑事件
                divChess.removeEventListener("click", leftClick);
                divChess.removeEventListener("mousedown", rightClick);
            }

            open(chess, data.x, data.y)
        }
    }
    // 绑定左击事件
    bindEvent(divChess, 'click', leftClick)

    // 鼠标右击事件
    var rightClick = function (event) {
        // 禁止右键弹出选项卡
        divChess.oncontextmenu = function (e) {
            return false;
        }
        let target = event.target

        // 判断是否为右击操作
        if (event.button == 2) {
            if (target.classList.contains('cell')) {
                toggleClass(target, 'flag')
            }

            // 判断是否找出地雷并计数
            let data = target.dataset
            if (target.classList.contains('flag')) {
                flagMineNum++
                if (chess.arr[data.x][data.y] === 'x') {
                    findMineNum++
                }
            } else {
                flagMineNum--
                if (chess.arr[data.x][data.y] === 'x') {
                    findMineNum--
                }
            }
            if (flagMineNum == chess.num) {
                if (findMineNum == chess.num) {
                    alert('suc')
                } else {
                    // 全部标记但是有错误
                    // alert('有错误')
                }
            } else if (flagMineNum > chess.num) {
                alert('game over')
                // 解绑事件
                divChess.removeEventListener("click", leftClick);
                divChess.removeEventListener("mousedown", rightClick);
            }
            countNum = chess.num - flagMineNum
            if (countNum <= 0) {
                countNum = 0
            }
            document.getElementById('count').innerHTML = `剩余地雷&nbsp${countNum}&nbsp`
        }
    }
    // 绑定右击事件
    bindEvent(divChess, 'mousedown', rightClick)
}

function main() {
    init(9, 9, 9)
}

main()