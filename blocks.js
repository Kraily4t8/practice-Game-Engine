class Ground {
    constructor(game, x, y, w, spritesheet) {
        Object.assign(this, { game, x, y, w, spritesheet});

        this.BB = new BoundingBox(this.x, this.y, 50, 50);
        // this.leftBB = new BoundingBox(this.x, this.y, 30, 30 * 2)
        // this.rightBB = new BoundingBox(this.x + this.w - 30, this.y, 30, 30 * 2)
    };

    update(){

    };

    draw(ctx) {
        ctx.strokeRect(this.x, this.y, 50, 50);
    };
}