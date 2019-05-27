class guagame {
    constructor(fps, images ,runcallback) {
        window.fps = fps
        this.images = images
        this.runcallback = runcallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas=document.querySelector("#canvas-box");
        this.context= this.canvas.getContext('2d');
        var self = this
        // events
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = false
        })
        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    //draw
    drawImage(img) {
        this.context.drawImage(img.image,img.x, img.y)
    }
    //updata
    update() {
        this.scene.update()
    }
    //draw
    draw() {
        this.scene.draw()
    }
    registeraction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        var g = this
        //events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions [i]
            if(g.keydowns[key]) {
                g.actions[key]()
            }
        }
        g.update()
        //clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height);
        //draw
        g.draw()
        // next run loop
        setTimeout(function(){
            g.runloop()
        },1000/window.fps)
    }
    imagebyname(name) {
        var g =this
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    runwithscene(scene) {
        var g =this
        g.scene = scene
        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        },1000/fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    _start(scene) {
        this.runcallback(this)
    }
    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
                //存入g.images 中
                g.images[name] = img
                //所有图片载入成功调用run
                loads.push(1)
                if (loads.length == names.length) {
                    g._start()
                }
            }
        }
    }
}
