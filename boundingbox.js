class BoundingBox {
    constructor (x, y, width, height) {
        Object.assign(this, {x, y, width, height});

        this.left = x;
        this.right = x + this.width;
        this.top = y;
        this.bot = y + this.height;
    }

    //checking for collision with other
    collide(other) {
        if(this.right > other.left) { // if right side is to the left of other
            if(this.left < other.right) {// if left is to the right of other
                if(this.top < other.bot) { //if top is below the other
                    if(this.bot < other.top) { // if bot is above the other
                        return true;
                    }
                }
            }
        }
        return false;
    }

    overlap(other) {
        
    }
}