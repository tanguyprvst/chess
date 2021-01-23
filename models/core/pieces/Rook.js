const Piece = require('../Piece')

class Rook extends Piece {

    constructor(id, name, image, x, y, player){
        super(id, name, image, x, y, player);
        this.move = false;
    }

    canMove(final_x, final_y, board){
        // regarde si il bouge en horizontal ou vertical
        console.log("x: " + this.x + " - y: " + this.y + " - final_x: " + final_x + " - final_y: " + final_y);
        if(final_x * 1 == this.x * 1) return this.lineCheck(this.y, final_y, false, board, final_x, final_y);
        if(final_y * 1 == this.y * 1) return this.lineCheck(this.x, final_x, true, board, final_x, final_y);

        return false
    };

}

module.exports = Rook;