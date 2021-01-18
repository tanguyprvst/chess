const Piece = require('../Piece')

class Rook extends Piece {

    constructor(id, name, image, x, y, player){
        super(id, name, image, x, y, player);
        this.move = false;
    }

    canMove(final_x, final_y, board){
        var nc = board[final_x][final_y];

        // regarde si il bouge en horizontal ou vertical
        if(final_x == this.x) return this.check(this.y, final_y, false, board);
        if(final_y == this.y) return this.check(this.x, final_x, true, board);
    };
    
    check(actual, final, honrizontal, board){
        if(final > actual){
            for(let i = actual * 1 + 1; i < final; i++){
                if(!honrizontal && board[this.x][i] != null) return false;
                if(honrizontal && board[i][this.y] != null) return false;
            }
        }
        for(let i = actual - 1; i > final; i--){
            if(!honrizontal && board[this.x][i] != null) return false;
            if(honrizontal && board[i][this.y] != null) return false;
        }

        if(honrizontal) this.x = final;
        if(!honrizontal) this.y = final;

        if(!this.move) this.move = true;
        return true;
    }
}

module.exports = Rook;