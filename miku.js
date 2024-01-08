class Miku {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet});
        //(spritesheet, xStart, yStart, refWidth, refHeight, frameCount, frameDuration, framePadding, reverse, loop)
        this.idle = new Animator(this.spritesheet, 0, 1, 59, 64, 10, 0.2, 0, false, true);
        this.walkRight = new Animator(this.spritesheet, 2, 65, 75, 67, 8, 0.2, 2, false, true);
        this.jumping = new Animator(this.spritesheet, 1, 134, 74, 100, 9, 0.23, 4, false, true);
        this.jump = new Animator(this.spritesheet, 1, 134, 74, 100, 5, 0.23, 4, false, true);
        this.falling = new Animator(this.spritesheet, 395, 134, 75, 100, 2, 0.23, 2.25, false, true);
        this.landing = new Animator(this.spritesheet, 552, 134, 75, 100, 2, 0.23, 2.25, false, true);
        this.attack = new Animator(this.spritesheet, 5, 236, 82, 65, 8, 0.2, 2.25, false, true);
        this.defeat = new Animator(this.spritesheet, 0, 370, 86, 60, 3, 0.6, 0, false, true);
        this.dance = new Animator(this.spritesheet, 0, 432, 83.5, 64, 12, 0.25, 0.45, false, true);
        //loop length
        this.currentAnimation = this.idle;
        this.flipped = false;

        this.x = x;
        this.y = y;
        this.counter = 20;
    }

    update() {
        if(this.game.right) {
            // console.log("right");
            this.currentAnimation = this.walkRight;
            this.x++;
            this.flipped = false;
        }
        if(this.game.left) {
            // console.log("left");
            this.currentAnimation = this.walkRight;
            this.x--;
            this.flipped = true;
        }
        if(this.game.up) {
            // this.currentAnimation = this.jump;
            // this.y--;
            this.currentAnimation = this.attack;
        }
        if(this.game.down) {
            this.currentAnimation = this.falling;
            this.y++;
        }
        if (!this.game.right && !this.game.left && !this.game.up && !this.game.down) {
            this.currentAnimation = this.idle;
        }
    }

    draw(ctx) {
        this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 2, this.flipped);
        // this.animationTest(ctx, 2.2);
        // let scale = 3;
        // this.idle.drawFrame(this.game.clockTick, ctx, 0, 0, scale, false);
        // this.idle.drawFrame(this.game.clockTick, ctx, 175, 0, scale, true);
    }
    
    animationTest(ctx,scale, flip) {
        this.idle.drawFrame(this.game.clockTick, ctx, 0, 0, scale,flip);
        this.walkRight.drawFrame(this.game.clockTick, ctx, 180, 0, scale, flip);
        this.jumping.drawFrame(this.game.clockTick, ctx, 0, 200, scale, flip);
        this.jump.drawFrame(this.game.clockTick, ctx, 210, 200, scale, flip);
        this.falling.drawFrame(this.game.clockTick, ctx, 400, 200, scale, flip);
        this.landing.drawFrame(this.game.clockTick, ctx, 600, 200, scale, flip);
        this.attack.drawFrame(this.game.clockTick, ctx, 400, 0, scale, flip);
        this.defeat.drawFrame(this.game.clockTick, ctx, 0, 500, scale, flip);
        this.dance.drawFrame(this.game.clockTick, ctx, 250, 500, scale, flip);
    }
}