//animation cycle
class AnimationCycle {
    constructor(frameArray, x, y, dt) {
        this.frameArray = frameArray;
        this.x=x;
        this.y=y;
        this.dt=dt;
    }
    
    
}
//frame
class frame {
    constructor(img, sx, sy, sWidth, sHeight, dWidth, dHeight) {
        this.img = img;
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
    }

    draw(ctx,x,y) {
        ctx.drawImage(img, this.sx, this.sy, this.sWidth, this.sHeight, x, y, this.dWidth, this.dHeight);
    }
}
//create a cell reference to a frame within an img
//after one second, move to the next frame