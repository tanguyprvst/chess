const Piece = require('../Piece')

class Bishop extends Piece {

    constructor(id, name, image, x, y, player){
        super(id, name, image, x, y, player);
    }

    canMove(final_x, final_y, board){

        if(final_y == this.y || final_x == this.x) return false;

        var result = this.diagonalCheck(final_x, final_y, board);
        if(result) this.save(final_x, final_y);
        return result;
    };

    
}

module.exports = Bishop;