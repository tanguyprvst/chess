class Player{

    constructor(id, name, socketid) {
        this.id = id
        this.name = name;
        this.socketid = socketid;
        this.color = null;
        this.listPieces = [];
    }
}

module.exports = Player