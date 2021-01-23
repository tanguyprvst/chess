const Piece = require('../Piece')

class Knight extends Piece {

    constructor(id, name, image, x, y, player){
        super(id, name, image, x, y, player);
    }

    canMove(final_x, final_y, board){

        if((this.x * 1) + 2 == final_x && (this.y * 1) + 1 == final_y) return this.save(final_x, final_y);
        if((this.x * 1) + 2 == final_x && (this.y * 1) - 1 == final_y) return this.save(final_x, final_y);

        if((this.x * 1) -2 == final_x && (this.y * 1) + 1 == final_y) return this.save(final_x, final_y);
        if((this.x * 1) -2 == final_x && (this.y * 1) - 1 == final_y) return this.save(final_x, final_y);

        if((this.x * 1) + 1 == final_x && (this.y * 1) + 2 == final_y) return this.save(final_x, final_y);
        if((this.x * 1) + 1 == final_x && (this.y * 1) - 2 == final_y) return this.save(final_x, final_y);

        if((this.x * 1) - 1 == final_x && (this.y * 1) + 2 == final_y) return this.save(final_x, final_y);
        if((this.x * 1) - 1 == final_x && (this.y * 1) - 2 == final_y) return this.save(final_x, final_y);
        
        return false
    };
}

module.exports = Knight;