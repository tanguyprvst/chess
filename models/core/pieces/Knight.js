const Piece = require('../Piece')

class Knight extends Piece {

    constructor(id, name, image, x, y, player){
        super(id, name, image, x, y, player);
    }

    canMove(final_x, final_y, board){

        if((this.x * 1) + 2 == final_x && (this.y * 1) + 1 == final_y) return this.setPost(final_x, final_y);
        if((this.x * 1) + 2 == final_x && (this.y * 1) - 1 == final_y) return this.setPost(final_x, final_y);

        if((this.x * 1) -2 == final_x && (this.y * 1) + 1 == final_y) return this.setPost(final_x, final_y);
        if((this.x * 1) -2 == final_x && (this.y * 1) - 1 == final_y) return this.setPost(final_x, final_y);

        if((this.x * 1) + 1 == final_x && (this.y * 1) + 2 == final_y) return this.setPost(final_x, final_y);
        if((this.x * 1) + 1 == final_x && (this.y * 1) - 2 == final_y) return this.setPost(final_x, final_y);

        if((this.x * 1) - 1 == final_x && (this.y * 1) + 2 == final_y) return this.setPost(final_x, final_y);
        if((this.x * 1) - 1 == final_x && (this.y * 1) - 2 == final_y) return this.setPost(final_x, final_y);
        
        return false
    };

    setPost(final_x, final_y){
        this.x = final_x;
        this.y = final_y;
        console.log(this);
        return true;
    }
}

module.exports = Knight;