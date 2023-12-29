class CatPlayer {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("/assets/Sprout Lands - Sprites - Basic pack/Characters/Basic Charakter Spritesheet.png");
        this.elapsedTime = 0;
        this.frame = 1;

        this.cellStart = 18;
        this.cellJump = 48;
        this.iteration = 0;
    }

    update() {

    }

    draw(ctx) { //render
        this.elapsedTime++;
        this.walkRight(ctx,50,50);
        this.walkRight2(ctx,200,50);
        if(this.elapsedTime > 8) {
            this.elapsedTime = 0;
        }
    }

    walkRight(ctx,x,y) {
        if(this.elapsedTime > 8) {
            this.frame++;
            if (this.frame > 2) this.frame = 0;
        }
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        //
        if(this.frame == 0) {
            ctx.drawImage(this.spritesheet, 18, 160, 20, 20, x, y, 100, 100);
        } else if (this.frame == 1){
            ctx.drawImage(this.spritesheet, 67, 160, 20, 20, x, y, 100, 100);
        } else if (this.frame == 2){
            ctx.drawImage(this.spritesheet, 115, 160, 20, 20, x, y, 100, 100);
        } else {
            ctx.drawImage(this.spritesheet, 163, 160, 20, 20, x, y, 100, 100);
        }
    }

    walkRight2(ctx,x,y) {
        ctx.drawImage(this.spritesheet, this.cellStart + this.cellJump * this.iteration, 160, 20, 20, x, y, 100,100);
        if(this.elapsedTime > 8) {
            this.iteration++;
            if(this.iteration > 3) this.iteration = 0;
        }
        
    }
    // animatCell(image, startPosition, cellsize,) {
    //     console.log("potato");
    // }
    //animate
    //selectcell
    //cellsize
    //wavelength
    //gridify
    
};