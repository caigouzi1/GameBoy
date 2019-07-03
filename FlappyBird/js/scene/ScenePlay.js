class ScenePlay extends Scene {
    constructor(game){
        super(game)
        this.player = new Bird(this.game.images['bird'])

        window.addEventListener('keydown', event =>{
            if(event.key == 'j') {
                this.player.isJump = true
            }
        })

        window.addEventListener('keyup', event =>{
            if(event.key == 'j') {
                this.player.isJump = false
            }
        })
    }

    draw() {
        this.scence.drawList.map(k => {
            this.drawImage(k)
        })
        this.scence.drawBird()
        
    }

    drawBird(){
        let bird = this.player
        let ctx = this.game.ctx
        ctx.save();//保存状态
        ctx.translate(bird.x,bird.y);//设置画布上的(0,0)位置，也就是旋转的中心点
        ctx.rotate(bird.angle*Math.PI/180);
        ctx.drawImage(this.player.img,-this.player.w/2,-this.player.w/2);//把图片绘制在旋转的中心点，
        ctx.restore();//恢复状态
    }



    update() {
        if(this.scence.player.alive) {
            this.scence.player.animation()
            this.scence.player.jump()
        }
    }

}