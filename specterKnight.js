class SpecterKnight {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet});
        //(spritesheet, xStart, yStart, refWidth, refHeight, frameCount, frameDuration, framePadding, reverse, loop)
        this.idle1 = new Animator(this.spritesheet, 2, 2, 41, 64, 4, 0.2, 2, false, true);
        this.idle2 = new Animator(this.spritesheet, 2, 68, 68, 69, 4, 0.2, 2, false, true);
        this.foward = new Animator(this.spritesheet, 2, 139, 71, 69, 4, 0.2, 2, false, true);
        this.slash = new Animator(this.spritesheet, 2, 478, 161, 82, 3, 0.325, 2, false, true);
        this.appear = new Animator(this.spritesheet, 2, 348, 74, 62, 7, 0.128, 2, false, false);
        this.woosh = new Animator(this.spritesheet, 2, 412, 68, 64, 4, 0.285, 2, false, true);
        this.throwWeapon = new Animator(this.spritesheet, 2, 649, 86, 65, 7, 0.2, 2, false, false);
        this.weaponSpin = new Animator(this.spritesheet, 721, 649, 67, 67, 8, 0.1, 2, false, true);
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

    attack2(ctx) {
        // this.idle.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
        this.throwWeapon.drawFrame(this.game.clockTick, ctx, 0, 0, 2);
        if(this.throwWeapon.isDone()) {
            // this.mainChar = this.idle;
            this.idle.drawFrame(this.game.clockTick, ctx, 32, 0, 2);
            this.weaponSpin.drawFrame(this.game.clockTick, ctx, this.weaponX, 0, 2);
        }
    }
    spawn(ctx) {
        this.appear.drawFrame(this.game.clockTick, ctx, 14, 0, 2);
        if(this.appear.isDone()) {
            this.idle.drawFrame(this.game.clockTick, ctx, 24, 0, 2);
        }
    }
}