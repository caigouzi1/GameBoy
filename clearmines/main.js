
function main() {
    var chess = new Chess(9, 9, 15)
    var divChess = e('#div-id-chess')
    // log(chess.arr)
    var html = ''
    var arr = chess.arr
    for (let i = 0; i < chess.arr.length; i++) {
        // log(arr[i])
        var line = `<div class = 'line'>`
        for (let j = 0; j < arr[i].length; j++) {
            // line += `<div data-x ='${i}' data-y = '${j}'>${arr[i][j]}</div>`
            line += `<div class = 'cell' data-x ='${i}' data-y = '${j}'>&nbsp&nbsp&nbsp</div>`
        }
        line += '</div>'
        html += line
    }
    appendHtml(divChess, html)
    // 绑定左击事件
    bindEvent(divChess, 'click', function (event){
        let target = event.target
        if(event.target.className === 'cell'){
            let data =target.dataset
            target.innerHTML = chess.arr[data.x][data.y]
        }
    })

    // 绑定右击事件
    bindEvent(divChess, 'mousedown', function (event){
        // 禁止右键弹出选项卡
        divChess.oncontextmenu = function(e){
            　　return false;
        } 
        let target = event.target
        // 判断是否为右击操作
        if(event.button==2){
            if(target.classList.contains('cell')){
                toggleClass(target, 'flag')
            }
        }
     
    })
}

main()