
function main() {
    var chess = new Chess(9, 9, 2)
    var divChess = e('#div-id-chess')
    // log(chess.arr)
    var html = ''
    var arr = chess.arr
    for (let i = 0; i < chess.arr.length; i++) {
        // log(arr[i])
        var line = `<div class = 'line'>`
        for (let j = 0; j < arr[i].length; j++) {
            // line += `<div data-x ='${i}' data-y = '${j}'>${arr[i][j]}</div>`
            line += `<div id = "${i}x${j}" class = 'cell' data-x ='${i}' data-y = '${j}'>&nbsp&nbsp&nbsp</div>`
        }
        line += '</div>'
        html += line
    }

    function open(arr, intx, inty) {
        let x = Number(intx)
        let y = Number(inty)
        if (arr[x][y] == 0) {
            for (let i = x - 1; i < x + 2; i++) {
                for (let j = y - 1; j < y + 2; j++) {
                    let node = document.getElementById(`${x}x${y}`)
                    log(node)
                    let isUp = node.classList.contains(up)
                    log(isUp)
                    if ((i != x && j != y) && chess.judgeCondition(i, j)) {
                        setNode(arr, i, j)
                        if (arr[i][j] !== 0) {
                            return
                        }
                        open(arr, i, j)
                    }
                }
            }
        } else {
            setNode(arr, x, y)
            return
        }
    }

    // 判断该位置是否符合条件并显示
    function setNode(arr, x, y) {
        if (chess.judgeCondition(x, y)) {
            let node = document.getElementById(`${x}x${y}`)
            if (arr[x][y] === 0) {
                node.innerHTML = arr[x][y]
                node.classList.add(up)
            } else {
                node.innerHTML = arr[x][y]
            }
        }
    }

    appendHtml(divChess, html)
    // 绑定左击事件
    bindEvent(divChess, 'click', function (event) {
        let target = event.target
        if (event.target.className === 'cell') {
            let data = target.dataset
            open(chess.arr, data.x, data.y)
            // target.innerHTML = chess.arr[data.x][data.y]
        }
    })

    // 绑定右击事件
    bindEvent(divChess, 'mousedown', function (event) {
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
        }
    })
}

main()