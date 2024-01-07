class SpecterKnight {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet});
        //(spritesheet, xStart, yStart, refWidth, refHeight, frameCount, frameDuration, framePadding, reverse, loop)
        this.idle1 = new Animator(this.spritesheet, 2, 2, 41, 64, 4, 0.2, 2, false, true);
        this.idle2 = new Animator(this.spritesheet, 2, 68, 68, 69, 4, 0.2, 2, false, true);
        this.foward = new Animator(this.spritesheet, 2, 139, 71, 69, 4, 0.2, 2, false, true);
        this.slash = new Animator(this.spritesheet, 2, 478, 161, 82, 3, 0.325, 2, false, true);
        //loop length
    }

    update() {
        
    }

    draw(ctx) {
        this.idle1.drawFrame(this.game.clockTick, ctx, 0, 0, 2);
        this.idle2.drawFrame(this.game.clockTick, ctx, 0, 127, 2);
        this.foward.drawFrame(this.game.clockTick, ctx, 135, 127, 2);
        this.slash.drawFrame(this.game.clockTick, ctx, 0, 264, 2);
    }
}