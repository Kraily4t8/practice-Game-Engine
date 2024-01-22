class BoundingBox {
    constructor (x, y, width, height, name) {
        Object.assign(this, {x, y, width, height, name});

        this.left = x;
        this.right = x + this.width;
        this.top = y;
        this.bottom = y + this.height;
    }

    //checking for collision with other
    collide(oth) {
        // console.log("this.top < oth.bottom" + this.top < oth.bottom);
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) {
            return true;
        }
        return false;
    }

    overlap(other) {
        
    }
}