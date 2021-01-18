const Piece = require('../Piece')

class Bishop extends Piece {

    constructor(id, name, image, x, y, player){
        super(id, name, image, x, y, player);
    }

    canMove(final_x, final_y, board){

        if(final_y == this.y || final_x == this.x) return false;
        var move_x = 0;
        var move_y = 0;
        var last_x = 0;
        var last_y = 0;

        move_x = final_x > this.x ? 1 : -1;
        move_y = final_y > this.y ? 1 : -1;

        let l = this.y * 1 + move_y;
        last_x = this.x;
        last_y = this.y;
        
        for(let k = this.x * 1 + move_x; k != final_x; k += move_x){
            if(board[k][l] != null) return false;
            last_x = k; last_y = l;
            l += move_y;
        }
        if(final_x == (parseInt(last_x, 10) + parseInt(move_x, 10)) && final_y == (parseInt(last_y, 10) + parseInt(move_y, 10))) return this.save(final_x, final_y);
        
        return false;
    };
}

module.exports = Bishop;