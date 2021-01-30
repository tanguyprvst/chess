const Piece = require('../Piece')

class Queen extends Piece {

    constructor(id, name, image, x, y, player){
        super(id, name, image, x, y, player);
    }

    canMove(final_x, final_y, board){
        if(final_x == this.x) return this.lineCheck(this.y, final_y, false, board);
        if(final_y == this.y) return this.lineCheck(this.x, final_x, true, board);

        return this.diagonalCheck(final_x, final_y, board);
    };

    
}

module.exports = Queen;