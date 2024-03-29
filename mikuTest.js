class MikuTest {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet});
        //(spritesheet, xStart, yStart, refWidth, refHeight, frameCount, frameDuration, framePadding, reverse, loop)
        
        this.x = x - 25;
        this.y = y;
        this.velocity = {x:0, y:0};

        this.facing = false; //facing true: left false: right
        this.state = 0; //0 = idle, 1 = walking, 2 = running, 3= jump, 4= falling, 5= landing, 6= attacking, 7= dancing, 8 = jumping
        this.defeat = false;
        this.flickerflag = true; //when hurt
        //defeat
        this.fall_acc = 30;

        this.BB;
        this.lastBB;
        
        this.animations = [];
        this.animationIterator = 0;
        this.elaspedTime = 0;
        this.elaspedTimeFlicker = 0;
        //loop length
        this.loadAnimations();
    }
    
    loadAnimations() {
        for (let i = 0; i < 9; i++) { //9 total animations
            this.animations.push([]);
        }
        //spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop
        this.animations[0] = new Animator(this.spritesheet, 0, 1, 59, 64, 10, 0.2, 0, false, true); //0 = idle
        this.animations[1] = new Animator(this.spritesheet, 2, 65, 75, 67, 8, 0.2, 2, false, true); //1 = walking
        this.animations[2] = new Animator(this.spritesheet, 2, 65, 75, 67, 8, 0.1, 2, false, true);//2 = running 
        this.animations[3] = new Animator(this.spritesheet, 1, 134, 74, 100, 6, 0.23, 4, false, true);//3= jump
        this.animations[4] = new Animator(this.spritesheet, 395, 134, 75, 100, 2, 0.23, 2.25, false, true);//4= falling 
        this.animations[5] = new Animator(this.spritesheet, 552, 134, 75, 100, 2, 0.23, 2.25, false, true);//5= landing 
        this.animations[6] = new Animator(this.spritesheet, 5, 236, 82, 65, 8, 0.2, 2.25, false, true);//6= attacking
        this.animations[7] = new Animator(this.spritesheet, 0, 432, 83.5, 64, 12, 0.25, 0.45, false, true);//7= dancing 
        this.animations[8] = new Animator(this.spritesheet, 1, 134, 74, 100, 9, 0.23, 4, false, true);//8 = jumping
        this.defeatAnim = new Animator(this.spritesheet, 0, 370, 86, 60, 3, 0.6, 0, false, true);
    }

    update() {
        // this.moving();
        this.physics();

        // console.log(this.game.timer.tick() + "");
    }
    
    draw(ctx) {
        // this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 2, this.facing);
        // this.animationTest(ctx, 1.5, false);
        // this.eachAnimation(ctx,1.5);
        // this.alignAnimation(ctx, 50, 50, 1.5, true);
        // this.alignAnimation(ctx, 50, 150, 1.5, false);
        // this.elaspedTimeFlicker += this.game.clockTick;
        this.adjustSpritePosition(ctx, 1.5);

        //bounding circle
        // ctx.beginPath();
        // ctx.arc(this.x + 50,this.y + 50, 35, 50, 0, 2* Math.PI);
        // ctx.stroke();

        //bounding box
        ctx.strokeRect(this.x + 25, this.y + 5, 42, 86);

        // this.idle.drawFrame(this.game.clockTick, ctx, 0, 0, scale, false);
        // this.idle.drawFrame(this.game.clockTick, ctx, 175, 0, scale, true);
    }

    adjustSpritePosition(ctx, scale) {
        let facing = 1;
        if(this.facing) facing = -1;

        let disjointX = 0;
        let alignX = 0;
        let alignY = 0;
        switch(this.state) {
            case 0:
                disjointX = 3;
                break;
            case 1:
            case 2:
                disjointX = 25;
                alignX = 13;
                alignY = 3;
                break;
            case 3:
                disjointX = 17;
                alignX = 12;
                alignY = 50;
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
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - (disjointX * facing) - alignX, this.y - alignY, scale, this.facing);
    }
    
    updateBB() {
        //this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        this.BB = new BoundingBox(this.x + 25, this.y + 5, 42, 86);
    }

    updateLastBB() {
        this.lastBB = this.BB;
    }

    physics() {
        const TICK = this.game.clockTick;

        const MIN_WALK = 30;
        const MAX_WALK = 160;
        const ACC_WALK = 40;
        const DEC_SKID = 200;
        const DEC_REL = 70;
        
        this.fall_acc = 100;
        const MIN_FALL = 20;
        const MAX_FALL = 100;

        const FLOOR = 250;

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

        this.velocity.y += this.fall_acc * TICK;

        if(this.game.up) {
            // console.log("jump");
            if(this.y >=  FLOOR) {
                this.velocity.y = -80;
                
            }
        }
        //update min y
        if(this.y >= FLOOR && !this.game.up) this.velocity.y = 0;

        //update max
        if (this.velocity.x >= MAX_WALK) this.velocity.x = MAX_WALK;
        if (this.velocity.x <= -1 * MAX_WALK) this.velocity.x = -MAX_WALK;

        //update state
        if(this.velocity.y == 0) {//on ground
            if(this.velocity.x == 0) this.state = 0;
            if(Math.abs(this.velocity.x) > 40) {
                this.state = 2;
            } else if(Math.abs(this.velocity.x) > 0) {
                this.state = 1;
            }
            
        } else {
            if(this.velocity.y < 0 && this.state != 5) this.state = 3;//jumping
            if(this.velocity.y > 0 && this.state != 5) this.state = 4;//falling
            if(this.velocity.y == 0) this.state = 5 // just before landing
        }
        //update direction 
        if (this.velocity.x < 0) this.facing = true;
        if (this.velocity.x > 0) this.facing = false;

        //update position
        this.x += this.velocity.x * TICK * 2;
        this.y += this.velocity.y * TICK * 2;
        this.updateLastBB();
        this.updateBB();
        // console.log(" vely " + this.velocity.y);

        //update collision
        // var that = this;
        // this.game.entities.forEach(function(entity) {
        //     if(entity.BB && that.BB.collide(entity.BB)) {
        //         if(that.velocity.y > 0) { //if falling
        //             if(that.y >= 200) {
        //                 that.y = 200 - 0;
        //                 that.velocity.y = 0;
        //                 if(that.state === 4) that.state = 0;
        //             }
        //             if((entity instanceof Ground)//landing
        //             && (that.lastBB.bot) <= entity.BB.top) { 
        //                 that.y = entity.BB.top - 91.07; //PARAMS.BLOCKWIDTH
        //                 that.velocity.y = 0;
        //             }
        //             console.log(" vely " + that.velocity.y);
        //             // 
        //         }
        //     }
        // });
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

    alignAnimation(ctx, x, y, scale, flip) {
        let facing = 1;
        if(flip) facing = -1;
        // this.animations[0].drawFrame(this.game.clockTick, ctx, x - (3 * facing), y, scale, flip);
        // this.animations[1].drawFrame(this.game.clockTick, ctx, x - (25 * facing) - 13, y - 3, scale,flip);
        // this.animations[2].drawFrame(this.game.clockTick, ctx, x - (25 * facing) - 13, y, scale,flip);
        // this.animations[3].drawFrame(this.game.clockTick, ctx, x - (17 * facing) - 12, y - 50, scale,flip);
        // this.animations[4].drawFrame(this.game.clockTick, ctx, x - (9 * facing) - 10, y - 50, scale,flip);
        // this.animations[5].drawFrame(this.game.clockTick, ctx, x - 15, y - 50, scale,flip);
        // this.animations[6].drawFrame(this.game.clockTick, ctx, x - (facing * 20) - 18, y, scale,flip);
        this.animations[7].drawFrame(this.game.clockTick, ctx, x + (0 * facing) - 15, y, scale,flip);
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
        
        if(this.animationIterator == 3) {
            this.animations[this.animationIterator].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5,this.facing);
        } else {
            this.animations[this.animationIterator].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5,this.facing);
        }
        this.elaspedTime += this.game.clockTick;
    }

    animationTest(ctx,scale, flip) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, 0, 0, scale,flip);
        this.animations[1].drawFrame(this.game.clockTick, ctx, 90, 0, scale, flip);
        this.animations[2].drawFrame(this.game.clockTick, ctx, 200, 0, scale, flip);
        this.animations[8].drawFrame(this.game.clockTick, ctx, 0, 100, scale, flip);
        this.animations[3].drawFrame(this.game.clockTick, ctx, 110, 100, scale, flip);
        this.animations[4].drawFrame(this.game.clockTick, ctx, 210, 100, scale, flip);
        this.animations[5].drawFrame(this.game.clockTick, ctx, 320, 100, scale, flip);
        this.animations[6].drawFrame(this.game.clockTick, ctx, 320, 0, scale, flip);
        this.defeatAnim.drawFrame(this.game.clockTick, ctx, 0, 260, scale, flip);
        this.animations[7].drawFrame(this.game.clockTick, ctx, 110, 260, scale, flip);
        this.elaspedTime += this.game.clockTick;
    }
}