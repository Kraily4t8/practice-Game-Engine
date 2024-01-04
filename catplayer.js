class CatPlayer {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet});
        //spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
        this.walkRight = new Animator(this.spritesheet, 67, 160, 11, 16, 3, 0.4, 37, false, true);
        this.walkLeft = new Animator(this.spritesheet, 67, 112, 11, 16, 3, 0.4, 37, false, true);
        this.walkX = 10;
        this.walkD = 1;
        this.runRight = new Animator(this.spritesheet, 67, 160, 11, 16, 3, 0.3, 37, false, true);
        this.runLeft = new Animator(this.spritesheet, 67, 112, 11, 16, 3, 0.2, 37, false, true);
        this.runX = 10;
        this.runD = 1;
    }

    update() {

    }

    draw(ctx) { //render
        // if(this.game.keys[right.key]) {
        //     console.log("stuff");
        // }
        //drawFrame(tick, ctx, x, y, scale)
        if(this.walkX > 150) {
            this.walkD = -1;
        } else if (this.walkX < 0) {
            this.walkD = 1;
        }
        this.walkX += 0.2 * this.walkD;
        if(this.walkD > 0) {
            this.walkRight.drawFrame(this.game.clockTick, ctx, this.walkX, 10, 3);    
        } else if(this.walkD < 0) {
            this.walkLeft.drawFrame(this.game.clockTick, ctx, this.walkX, 10, 3);    
        }

        if(this.runX > 150) {
            this.runD = -1;
        } else if (this.runX < 0) {
            this.runD = 1;
        }
        this.runX += 0.4 * this.runD;
        if(this.runD > 0) {
            this.runRight.drawFrame(this.game.clockTick, ctx, this.runX, 80, 3);    
        } else if(this.runD < 0) {
            this.runLeft.drawFrame(this.game.clockTick, ctx, this.runX, 80, 3);    
        }

        this.walkRight.drawFrame(this.game.clockTick, ctx, 10, 150, 3);
        this.walkLeft.drawFrame(this.game.clockTick, ctx, 80, 150, 3);
        this.runRight.drawFrame(this.game.clockTick, ctx, 10, 220, 3);
        this.runLeft.drawFrame(this.game.clockTick, ctx, 80, 220, 3);
        // this.walkRight2(ctx,200,50);
    }

    walkRight2(ctx,x,y) {
        ctx.drawImage(this.spritesheet, this.cellStart + this.cellJump * this.iteration, 160, 20, 20, x, y, 60,60);
        if(this.elapsedTime > this.looptime) {
            this.iteration++;
            if(this.iteration > 3) this.iteration = 0;
        }
        
    }
    //animate
    //selectcell
    //cellsize
    //wavelength
    //gridify
    
};