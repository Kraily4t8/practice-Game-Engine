// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null; //on click jump
        this.mouse = null;
        this.wheel = null;
        
        this.left = null;
        this.right = null;
        this.up = null;
        this.down = null;

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        var that = this;

        this.ctx.canvas.addEventListener("keydown", function(e) {
            // console.log(e.code);
            switch(e.code) {
                case "KeyA": 
                    that.left = true;
                break;
                case "KeyD": 
                    that.right = true;
                break;
                case "KeyW": 
                    that.up = true;
                break;
                case "KeyS": 
                    that.down = true;
                break;
            }
        });
        
        this.ctx.canvas.addEventListener("keyup", function(e) {
            // console.log(e.code);
            switch(e.code) {
                case "KeyA": 
                    that.left = false;
                break;
                case "KeyD": 
                    that.right = false;
                break;
                case "KeyW": 
                    that.up = false;
                break;
                case "KeyS": 
                    that.down = false;
                break;
            }
        })
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {
        let entitiesCount = this.entities.length;
        // console.log(entitiesCount);
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        // console.log(this.clockTick);
        this.update();
        this.draw();
    };

};

// KV Le was here :)