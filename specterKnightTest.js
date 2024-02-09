class SpecterKnightTest {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet});

        this.velocity = {x:0, y:0};
        this.facing = false;

        this.state = 0; //0 = idle, 1 = foward, 2= backward, 3 = attack, 4 = spawn, 5 = death;
        this.animations = [];
        
        this.loadAnimations();
        //loop length
        this.adjustTime = 0;
        this.adjustDuration = 300;
    }

    loadAnimations() {
        for (let i = 0; i < 9; i++) { //9 total animations//0-5 states, unused 6-9
            this.animations.push([]);
        }
        //(spritesheet, xStart, yStart, refWidth, refHeight, frameCount, frameDuration, framePadding, reverse, loop)
        this.animations[0] = new Animator(this.spritesheet, 2, 68, 68, 69, 4, 0.2, 2, false, true); //weapon idle
        this.animations[1] = new Animator(this.spritesheet, 2, 139, 71, 72, 4, 0.2, 2, false, true); // forward
        this.animations[2] = new Animator(this.spritesheet, 2, 212, 78, 72, 4, 0.2, 2, false, true); // backward

        this.animations[3] = new Animator(this.spritesheet, 2, 478, 161, 82, 3, 0.28, 2, false, true); //slash
        
        this.animations[4] = new Animator(this.spritesheet, 2, 348, 74, 62, 7, 0.128, 2, false, true); //appear
        this.animations[5] = new Animator(this.spritesheet, 2, 285, 64, 62, 10, 0.14, 2, false, true); //dissappear
        
        this.animations[6] = new Animator(this.spritesheet, 2, 2, 41, 64, 4, 0.2, 2, false, true); //idle
        this.animations[7] = new Animator(this.spritesheet, 2, 412, 68, 64, 4, 0.285, 2, false, true); //prepare slash
        this.animations[8] = new Animator(this.spritesheet, 2, 649, 86, 65, 7, 0.2, 2, false, false); //throw weapon
        this.animations[9] = new Animator(this.spritesheet, 721, 649, 67, 67, 8, 0.1, 2, false, true); //become weapon O_O // this.weaponSpin 
    }

    adjustSpritePosition(ctx, scale) {
        // this.adjustTime++;
        // if(this.adjustTime >= this.adjustDuration) {
        //     this.state++;
        //     this.adjustTime = 0;
        //     if(this.state == 6) this.state = 0;
        // }

        let direction = 1;
        if(this.facing) direction = -1;

        let disjointX = 0;
        let alignX = 0;
        let alignY = 0;
        switch(this.state) {
            case 0:
                disjointX = 18;
                alignX = -20;
                break;
            case 1:
                disjointX = 15;
                alignX = -17;
                break;
            case 2:
                disjointX = 18;
                alignX = -13;
                break;
            case 3:
                disjointX = -40;
                alignX = 50;
                alignY = 0;
                break;
            case 4:
                disjointX = 9;
                alignX = 10;
                alignY = 50;
                break;
            case 5:
                disjointX = 0;
                alignX = 15;
                alignY = 50;
                break;
            case 6:
                disjointX = 20;
                alignX = 18;
                break;
            case 7:
                alignX - 15;
                break;
        }
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - (disjointX * direction) - alignX, this.y - alignY, scale, this.facing);
    }

    eachAnimation(ctx) {
        let scale = 1.5;
        this.state = 3;
        let disjointX = 0;
        let alignX = 0;
        let alignY = 0;

        disjointX = -40;
        alignX = 50;
        alignY = 0;
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - (disjointX * 1) - alignX, this.y - alignY, scale, false);
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - (disjointX * -1) - alignX, 100 + this.y - alignY, scale, true);
        //frame 2 dmg box
        // ctx.strokeRect(this.x - 10, this.y + 35, 240, 70); //facing right 
        // ctx.strokeRect(this.x - 10 - 78, this.y + 100 + 35, 240, 70); //facing left

        ctx.strokeRect(this.x + 40, this.y + 40, 60, 55);
        ctx.strokeRect(this.x + 40, this.y + 100 + 40, 60, 55);
    }

    update() {
        // this.physics();
        this.updateLastBB();
        this.updateBB();
    }

    draw(ctx) {
        // this.animationTest(ctx,1.5, false);
        // this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5, this.facing);
        // this.adjustSpritePosition(ctx,1.5);
        this.eachAnimation(ctx);
        // this.idle1.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5, this.facing);
        // ctx.strokeRect(this.x + 50, this.y + 5, 42, 90);
        // ctx.strokeRect(this.x + 50, this.y + 100 + 5, 42, 90);
    }

    updateBB() {
        //this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.BB = new BoundingBox(this.x + 10, this.y + 5, 42, 70);
        // console.log("specter knight BB");
    }

    updateLastBB() {
        this.lastBB = this.BB;
    }

    physics() {
        const TICK = this.game.clockTick;
        //horizontal speed
        const MIN_DRIFTX = 10;
        const MAX_DRIFTX = 50;
        const ACC_DRIFTX = 20;
        //vertical speed
        const MIN_DRIFTY = 10;
        //fall speed
        const FALL = 10;

        if (Math.abs(this.velocity.x) < MIN_DRIFTX) { //if not moving, check for button then add movement
            this.velocity.x = 0;
            this.state = 0;
            if(this.game.right) {
                this.velocity.x += ACC_DRIFTX;
            }
            if(this.game.left) {
                this.velocity.x -= ACC_DRIFTX;
            }
        } else if (Math.abs(this.velocity.x) >= MIN_DRIFTX) { // if greater than min_walk, check if player wants to speed up or slow down
            if(this.facing == false) { //facing right
                if (this.game.right && !this.game.left && !this.game.down) {
                    this.velocity.x += ACC_DRIFTX * TICK;
                } else if (this.game.left && !this.game.right && !this.game.down) {
                    // this.velocity.x -= DEC_SKID * TICK;
                } else {
                    // this.velocity.x -= DEC_REL * TICK;
                }
            }
        }
        this.x += this.velocity.x * TICK * 2;
        this.y += this.velocity.y * TICK * 2;
    }

    animationTest(ctx,scale,flip) {
        this.animations[6].drawFrame(this.game.clockTick, ctx, 0, 0, scale,flip);
        this.animations[4].drawFrame(this.game.clockTick, ctx, 70, 0, scale,flip);
        this.animations[5].drawFrame(this.game.clockTick, ctx, 190, 0, scale,flip);

        this.animations[7].drawFrame(this.game.clockTick, ctx, 235, 210, scale,flip);
        this.animations[0].drawFrame(this.game.clockTick, ctx, 0, 100, scale,flip);
        this.animations[1].drawFrame(this.game.clockTick, ctx, 110, 100, scale,flip);
        this.animations[2].drawFrame(this.game.clockTick, ctx, 230, 100, scale,flip);
        this.animations[3].drawFrame(this.game.clockTick, ctx, 0, 210, scale,flip);
        this.animations[7].drawFrame(this.game.clockTick, ctx, 235, 210, scale,flip);
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