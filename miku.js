class Miku {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet});
        //(spritesheet, xStart, yStart, refWidth, refHeight, frameCount, frameDuration, framePadding, reverse, loop)
        
        this.x = x;
        this.y = y;
        this.velocity = {x:0, y:0};

        this.facing = false; //facing true: left false: right
        this.state = 0; //0 = idle, 1 = walking, 2 = running, 3= jump, 4= falling, 5= landing, 6= attacking, 7= dancing, 8 = jumping
        this.defeat = false;
        this.flickerflag = true; //when hurt
        //defeat
        
        this.animations = [];
        this.animationIterator = 0;
        this.elaspedTime = 0;
        this.elaspedTimeFlicker = 0;
        //loop length
        this.loadAnimations();
        this.currentAnimation = this.idle;
    }
    
    loadAnimations() {
        for (let i = 0; i < 9; i++) { //9 total animations
            this.animations.push([]);
        }
        
        this.animations[0] = new Animator(this.spritesheet, 0, 1, 59, 64, 10, 0.2, 0, false, true);
        this.animations[1] = new Animator(this.spritesheet, 2, 65, 75, 67, 8, 0.2, 2, false, true);
        this.animations[2] = new Animator(this.spritesheet, 2, 65, 75, 67, 8, 0.1, 2, false, true);
        this.animations[3] = new Animator(this.spritesheet, 1, 134, 74, 100, 5, 0.23, 4, false, true);
        this.animations[4] = new Animator(this.spritesheet, 395, 134, 75, 100, 2, 0.23, 2.25, false, true);
        this.animations[5] = new Animator(this.spritesheet, 552, 134, 75, 100, 2, 0.23, 2.25, false, true);
        this.animations[6] = new Animator(this.spritesheet, 5, 236, 82, 65, 8, 0.2, 2.25, false, true);
        this.animations[7] = new Animator(this.spritesheet, 0, 432, 83.5, 64, 12, 0.25, 0.45, false, true);
        this.animations[8] = new Animator(this.spritesheet, 1, 134, 74, 100, 9, 0.23, 4, false, true);
        this.defeatAnim = new Animator(this.spritesheet, 0, 370, 86, 60, 3, 0.6, 0, false, true);
    }

    update() {
        // this.moving();
        this.physics();
        // console.log(this.game.timer.tick() + "");
    }
    
    draw(ctx) {
        // this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 2, this.facing);
        // this.animationTest(ctx, 2.2);
        // this.eachAnimation(ctx,2.75);
        // this.elaspedTime += this.game.clockTick;
        // this.elaspedTimeFlicker += this.game.clockTick;
        this.currentAnimation = this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.2, this.facing);

        // this.idle.drawFrame(this.game.clockTick, ctx, 0, 0, scale, false);
        // this.idle.drawFrame(this.game.clockTick, ctx, 175, 0, scale, true);
    }

    moving() {
        if(this.game.right) {
            // console.log("right");
            this.currentAnimation = this.animations[1];
            this.x++;
            this.facing = false;
        }
        if(this.game.left) {
            // console.log("left");
            this.currentAnimation = this.animations[1];
            this.x--;
            this.facing = true;
        }
        if(this.game.up) {
            // this.currentAnimation = this.jump;
            // this.y--;
            this.currentAnimation = this.animations[6];
        }
        if(this.game.down) {
            this.currentAnimation = this.animations[4];
            this.y++;
        }
        if (!this.game.right && !this.game.left && !this.game.up && !this.game.down) {
            this.currentAnimation = this.animations[0];
        }
    }

    physics() {
        const TICK = this.game.clockTick;

        const MIN_WALK = 20;
        const MAX_WALK = 160;
        const ACC_WALK = 40;
        const DEC_SKID = 200;
        const DEC_REL = 70;

        if (Math.abs(this.velocity.x) < MIN_WALK) { //if not moving, check for button then add movement
            this.velocity.x = 0;
            this.state = 0;
            if(this.game.right) {
                this.velocity.x += ACC_WALK;
            }
            if(this.game.left) {
                this.velocity.x -= ACC_WALK;
            }
        } else if (Math.abs(this.velocity.x) >= MIN_WALK) { // if greater than min_walk, check if player wants to speed up or slow down
            if(this.facing == false) { //facing right
                if (this.game.right && !this.game.left && !this.game.down) {
                    this.velocity.x += ACC_WALK * TICK;
                } else if (this.game.left && !this.game.right && !this.game.down) {
                    this.velocity.x -= DEC_SKID * TICK;
                } else {
                    this.velocity.x -= DEC_REL * TICK;
                }
            } else {
                if (this.game.left && !this.game.right && !this.game.down) {
                    this.velocity.x -= ACC_WALK * TICK;
                } else if (this.game.right && !this.game.left && !this.game.down) {
                    this.velocity.x += DEC_SKID * TICK;
                } else {
                    this.velocity.x += DEC_REL * TICK;
                }
            }
        } else if(Math.abs(this.velocity.x) > MAX_WALK) {

        }

        //update max
        if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        if (this.velocity.x <= -1 * MAX_WALK) this.velocity.x = -MAX_WALK;

        //update state
        if(this.velocity.x == 0) this.state = 0;
        if(80 > Math.abs(this.velocity.x) && Math.abs(this.velocity.x) > 0) this.state = 1;
        if(Math.abs(this.velocity.x) > 80) this.state = 2;
        
        //update direction 
        if (this.velocity.x < 0) this.facing = true;
        if (this.velocity.x > 0) this.facing = false;

        //update speed
        this.x += this.velocity.x * TICK * 2;
        console.log("velx " + this.velocity.x)
    }

    flickerTest(ctx) {
        if(this.elaspedTimeFlicker >  0.5) {
            this.flickerflag = !this.flickerflag;
            this.elaspedTimeFlicker = 0;
        } 
        // else if (this.flickerflag && this.elaspedTimeFlicker > 0.1) {
        //     this.flickerflag = false;
        //     this.elaspedTimeFlicker = 0;
        // }
        if(this.flickerflag) {
            this.animations[0].drawFrame(this.game.clockTick, ctx, 0, 0, 3);
        }
    }

    eachAnimation(ctx, time) {
        if(this.animationIterator == this.animations.length - 1) {
            this.facing = !this.facing;
            this.animationIterator = 0;
        }
        if(this.elaspedTime > time) {
            this.animationIterator++;
            this.elaspedTime = 0;
        }
        
        this.animations[this.animationIterator].drawFrame(this.game.clockTick, ctx, 0, 0, 3,this.facing);
    }

    animationTest(ctx,scale, flip) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, 0, 0, scale,flip);
        this.animations[1].drawFrame(this.game.clockTick, ctx, 180, 0, scale, flip);
        this.animations[2].drawFrame(this.game.clockTick, ctx, 350, 0, scale, flip);
        this.animations[8].drawFrame(this.game.clockTick, ctx, 0, 200, scale, flip);
        this.animations[3].drawFrame(this.game.clockTick, ctx, 210, 200, scale, flip);
        this.animations[4].drawFrame(this.game.clockTick, ctx, 400, 200, scale, flip);
        this.animations[5].drawFrame(this.game.clockTick, ctx, 600, 200, scale, flip);
        this.animations[6].drawFrame(this.game.clockTick, ctx, 530, 0, scale, flip);
        this.defeatAnim.drawFrame(this.game.clockTick, ctx, 0, 500, scale, flip);
        this.animations[7].drawFrame(this.game.clockTick, ctx, 250, 500, scale, flip);
    }
}