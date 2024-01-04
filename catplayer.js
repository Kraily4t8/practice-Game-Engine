class CatPlayer {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/Sprout Lands - Sprites - Basic pack/Characters/Basic Charakter Spritesheet.png");
        //spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
        this.walkRight = new Animator(this.spritesheet, 67, 160, 11, 16, 2, 0.4, 37, false, true);
        this.runRight = new Animator(this.spritesheet, 67, 160, 11, 16, 3, 0.3, 37, false, true);
        this.walkX = 10;
        this.runX = 10;
    }

    update() {

    }

    draw(ctx) { //render
        // if(this.game.keys[right.key]) {
        //     console.log("stuff");
        // }
        //drawFrame(tick, ctx, x, y, scale)
        this.walkX += 0.2;
        this.runX += 0.4;
        this.walkRight.drawFrame(this.game.clockTick, ctx, this.walkX, 10, 3);
        this.runRight.drawFrame(this.game.clockTick, ctx, this.runX, 80, 3);
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