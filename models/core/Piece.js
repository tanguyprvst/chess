class Piece{

    constructor(id, name, image, x, y, player){
        this.id = id;
        this.name = name;
        this.image = image;
        this.x = x;
        this.y = y;
        this.isTaken = false;
        this.player = player;
    }

    canMove(x, y, board){};

    lineCheck(actual, final, honrizontal, board){
        var move = final > actual ? 1 : -1;

        for(let i = actual * 1 + move; (i < final || i > final); i += move){
            if(!honrizontal ) console.log(board[this.x][i]);
            if(honrizontal) console.log(board[i][this.y]);
            if(!honrizontal && board[this.x][i] != null) return false;
            if(honrizontal && board[i][this.y] != null) return false;
        }
        //this.save(save_x, save_y);
        return true;
    }

    diagonalCheck(final_x, final_y, board){
        var move_x = 0;
        var move_y = 0;

        move_x = final_x > this.x ? 1 : -1;
        move_y = final_y > this.y ? 1 : -1;

        let l = this.y * 1 + move_y;
        for(let k = this.x * 1 + move_x; (k <= final_x || k >= final_x); k += move_x){
            if(final_x == k && final_y == l) return true; //this.save(final_x, final_y);
            if(board[k][l] != null) return false;
            if(k == 0 || l == 0 || k == 7 || l == 7) return false;
            l += move_y;
        }
        return false;
    }

    save(x, y){
        this.x = x;
        this.y = y;
    }
}

module.exports = Piece