var Pawn = require('./core/pieces/Pawn')
var Rook = require('./core/pieces/Rook')
var Knight = require('./core/pieces/Knight')
var Bishop = require('./core/pieces/Bishop')
var King = require('./core/pieces/King')
var Queen = require('./core/pieces/Queen')

class Game {

    constructor(id, player = null){
        
        this.id = id;
        this.listPlayers = [];
        this.code = this._code(8);
        this.board = [];

        this.winner = null;
        this.turn = 0;

        this.current_player = null;
        this.second_player = null;

        this.listPlayers.push(player);
        
    }
    
    _generateBoard(){
        var id = 0;
        for (let x = 0; x < 8; x++) {
            this.board[x] = [];
            for (let y = 0; y < 8; y++) {
                id += 10;
                
                this.board[x][y] = null;

                // white
                if(y == 1) this.board[x][y] = new Pawn(id, "Pion", "white_p.png", x, y, this.current_player);
                if(y == 0 && (x == 0 || x == 7)) this.board[x][y] = new Rook(id, "Tour", "white_t.png", x, y, this.current_player);
                if(y == 0 && (x == 1 || x == 6)) this.board[x][y] = new Knight(id, "Cavalier", "white_c.png", x, y, this.current_player);
                if(y == 0 && (x == 2 || x == 5)) this.board[x][y] = new Bishop(id, "Fou", "white_f.png", x, y, this.current_player);
                if(y == 0 && x == 3) this.board[x][y] = new Queen(id, "Dame", "white_d.png", x, y, this.current_player);
                if(y == 0 && x == 4) this.board[x][y] = new King(id, "Roi", "white_r.png", x, y, this.current_player);

                // black
                if(y == 6) this.board[x][y] = new Pawn(id, "Pion", "black_p.png", x, y, this.listPlayers[1]);
                if(y == 7 && (x == 0 || x == 7)) this.board[x][y] = new Rook(id, "Tour", "black_t.png", x, y, this.listPlayers[1]);
                if(y == 7 && (x == 1 || x == 6)) this.board[x][y] = new Knight(id, "Cavalier", "black_c.png", x, y, this.listPlayers[1]);
                if(y == 7 && (x == 2 || x == 5)) this.board[x][y] = new Bishop(id, "Fou", "black_f.png", x, y, this.listPlayers[1]);
                if(y == 7 && x == 3) this.board[x][y] = new Queen(id, "Dame", "black_d.png", x, y, this.listPlayers[1]);
                if(y == 7 && x == 4) this.board[x][y] = new King(id, "Roi", "black_r.png", x, y, this.listPlayers[1]);
            }
        }
    }

    _code(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    _start(){
        this.current_player = this.listPlayers[0]; //this.listPlayers[Math.floor(Math.random() * 2)];
        this.listPlayers[0].color = "white";
        this.listPlayers[1].color = "black";
        this._generateBoard();
    }

    _turn(){
        this.turn++;
        this.current_player = this.listPlayers[this.turn%2];
        this.second_player = this.listPlayers[this.turn%2];
    }

    play(played_case, next_case, auth_player_id, callback){
        let sc = played_case.split('-');
        let snc = next_case.split('-');
        let c = this.board[sc[1]][sc[2]];
        let nc = this.board[snc[1]][snc[2]];
        
        let pid = c.id;

        if(c.player.id == this.current_player.id && auth_player_id == this.current_player.id && c != nc){
            if(nc != null && nc.player.id == c.player.id) return callback(false);

            var base_x = sc[1];
            var base_y = sc[2];

            var move_x = snc[1];
            var move_y = snc[2];

            if(c.canMove(move_x, move_y, this.board)){

                // move
                this.board[move_x][move_y] = c;
                this.board[base_x][base_y] = null;
                c.save(move_x, move_y)

                if(this.isFailure(this.current_player)){
                    // remove
                    this.board[move_x][move_y] = null;
                    this.board[base_x][base_y] = c;
                    c.save(base_x, base_y)
                    return callback(false);
                }
                
                // save and move piece
                c.save(move_x, move_y)
                this.board[move_x][move_y] = c;
                this.board[base_x][base_y] = null;
                this._turn();

                return callback(true, "p-" + pid, next_case);
            }
        }
    }

    isFailure(player){
        var king = null;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if(this.board[i][j] instanceof King && player.id == this.board[i][j].player.id ){
                    king = this.board[i][j];
                }
            }
        }
        if(king == null) return false
        return king.isFailure(this.board);
    }

}

module.exports = Game;