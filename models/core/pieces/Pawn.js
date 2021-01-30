const Piece = require('../Piece')

class Pawn extends Piece {

    constructor(id, name, image, x, y, player){
        super(id, name, image, x, y, player);
        this.first = true;
    }

    canMove(final_x, final_y, board){

        var nc = board[final_x][final_y];
        // check si il y a une piece devant lui et la mange si c'est en diagonal
        if(nc != null){
            var y = this.player.color == "white" ? (parseInt(this.y, 10) + 1) : (this.y -1);
            if(final_y == y && (final_x == parseInt(this.x, 10) + 1 || final_x == this.x - 1)){
                if(this.first) this.first = false;
                return true;
            }
            return false
        }

        // avance le pion de 2 cases si c'est son premier mouvement
        if(this.first){
            var y = this.player.color == "white" ? (parseInt(this.y, 10) + 2) : (this.y - 2);
            if(final_y == y && final_x == this.x){
                this.first = false;
                return true;
            }
        }
        
        // deplace le pion normalement
        var y = this.player.color == "white" ? (parseInt(this.y, 10) + 1) : (this.y - 1);
        if(final_y == y && final_x == this.x){
            if(this.first) this.first = false;
            return true;
        }
        
        return false
    };
}

module.exports = Pawn;