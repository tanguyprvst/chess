var Case = require("./Case");

class Board{

    constructor(){
        this.listCases = [];
        this._initCases();
    }

    _initCases() 
    {
        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        for(let x = 0; x < 8; x++)
        {
            for(let y = 0; y < 8; y++)
            {
                var name = alphabet[x] + (y + 1);
                this.listCases.push(new Case(name, x, y));
            }
        }
    }

    getCase(x, y){
        let output = null;
        this.listCases.forEach(c => {
            if (c.x == x && c.y == y) { 
                output = c;
            }
        })
        return output;
    }

    getCaseByName(name){
        let output = null;
        this.listCases.forEach(c => {
            if (c.name == name) { 
                output = c;
            }
        })
        return output;
    }
}

module.exports = Board