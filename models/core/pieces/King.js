const Piece = require('../Piece');
const Bishop = require('./Bishop');
const Knight = require('./Knight');
const Queen = require('./Queen');

class King extends Piece {

    constructor(id, name, image, x, y, player){
        super(id, name, image, x, y, player);
    }

    canMove(final_x, final_y, board){

        // vertical / honrizontal
        if((this.x * 1) + 1 == final_x && this.y == final_y) return true;
        if((this.x * 1) - 1 == final_x && this.y == final_y) return true;
        if(this.x == final_x && (this.y * 1) + 1 == final_y) return true;
        if(this.x == final_x && (this.y * 1) - 1 == final_y) return true;

        // diagonal
        if((this.x * 1) + 1 == final_x && (this.y * 1) + 1 == final_y) return true;
        if((this.x * 1) + 1 == final_x && (this.y * 1) - 1 == final_y) return true;
        if((this.x * 1) - 1 == final_x && (this.y * 1) + 1 == final_y) return true;
        if((this.x * 1) - 1 == final_x && (this.y * 1) - 1 == final_y) return true;
        
        return false
    };

    isFailure(board){
        if(this.checkDiagonal(1, 1, board)) return true;
        if(this.checkDiagonal(1, -1, board)) return true;
        if(this.checkDiagonal(-1, 1, board)) return true;
        if(this.checkDiagonal(-1, -1, board)) return true;

        return false
    }

    checkDiagonal(x, y, board){
        let l = this.y * 1 + y;
        for(let k = this.x * 1 + x; (k <= 0 || k >= 0); k += x){
            if(board[k][l] != null) return this.checkDiagonalPiece(board[k][l]) ? true : false;
            if(k == 0 || l == 0 || k == 7 || l == 7) return false;
            l += y;
        }
    }

    checkDiagonalPiece(p){
        if(p.player.id == this.player.id) return false;
        if(p.player.id != this.player.id){
            if(p instanceof Queen || p instanceof Bishop) return true;
        }
        return false;
    }
}

module.exports = King;