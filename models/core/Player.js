class Player{

    constructor(id, name, socketid) {
        this.id = id
        this.name = name;
        this.socketid = socketid;
        this.color = null;
        this.listPieces = [];
    }

    play(c, nc){
        ArrayUtils.forEach(listPieces, c => {
            if(c.isEmpty()){
                c.player = this;
                this.listCases.push(c);
                console.log(this.name + " joue la case : Colonne " + (c.column.x + 1) + " Ligne " + (c.y + 1));
                return false;
            }
        });
    }

    hasCase(c) {
        if(!(c instanceof Case)) { return false; }
        return c.player == this;
    }
}

module.exports = Player