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
        if((this.x * 1) + 1 == final_x && this.y == final_y) return this.save(final_x, final_y);
        if((this.x * 1) - 1 == final_x && this.y == final_y) return this.save(final_x, final_y);
        if(this.x == final_x && (this.y * 1) + 1 == final_y) return this.save(final_x, final_y);
        if(this.x == final_x && (this.y * 1) - 1 == final_y) return this.save(final_x, final_y);

        // diagonal
        if((this.x * 1) + 1 == final_x && (this.y * 1) + 1 == final_y) return this.save(final_x, final_y);
        if((this.x * 1) + 1 == final_x && (this.y * 1) - 1 == final_y) return this.save(final_x, final_y);
        if((this.x * 1) - 1 == final_x && (this.y * 1) + 1 == final_y) return this.save(final_x, final_y);
        if((this.x * 1) - 1 == final_x && (this.y * 1) - 1 == final_y) return this.save(final_x, final_y);
        
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
            console.log(board[k][l]);
            console.log('x: ' + k + " - y: " + l)
            if(board[k][l] != null) if(this.checkDiagonalPiece(board[k][l])) return true;
            if(k <= 0 || l <= 0 || k == 7 || l == 7) return false;
            l += y;
        }
    }

    checkDiagonalPiece(p){
        if(p.player != this.player){
            if(p instanceof Queen || p instanceof Bishop) return true;
        }
        return false;
    }
}

module.exports = King;