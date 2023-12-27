class EggNest {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("/assets/Sprout Lands - Sprites - Basic pack/Characters/Egg_And_Nest.png");
    }

    update() {

    }

    draw(ctx) { //render
        ctx.fillStyle = "blue";
        // ctx.fillRect(0, 0, 64 * 8, 16 * 8);
        ctx.drawImage(this.spritesheet, 34, 6, 12, 12, 100, 100, 120, 128);
    }
};