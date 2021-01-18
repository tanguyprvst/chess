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

    save(x, y){
        this.x = x;
        this.y = y;
        return true;
    }
}

module.exports = Piece