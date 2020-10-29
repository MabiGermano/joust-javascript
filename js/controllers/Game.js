class Game {
    constructor() {
        const docSelect = document.querySelector.bind(document);
        const docSelectAll = document.querySelectorAll.bind(document);
        this._gameBoard = new GameBoardView(docSelect('#root'));
        this._gameBoard.update(null);
        
        this._rows = docSelectAll('tr');
        this._piece1 = new Piece();
        this._piece2 = new Piece();
    }

    start () {
        this._piece1.build();
        this._piece2.build();
        
        if(!(this._piece1.positionY == this._piece2.positionY  
            && this._piece1.positionX == this._piece2.positionX)) {

            this._rows[this._piece1.positionY]
            .cells[this._piece1.positionX]
            .appendChild(this._piece1.element);
            
            this._rows[this._piece2.positionY]
            .cells[this._piece2.positionX]
            .appendChild(this._piece2.element);
        }else {
            this.start();
        }
        this.nextTurn();
    }

    nextTurn() {
        const moves = this._piece1.possibleMoves();
        console.log(`ATUAL => X: ${this._piece1.positionX}, Y: ${this._piece1.positionY} `);
        
        moves.forEach(move => {
            console.log(move);
            console.log(this._rows[move.y].cells[move.x].classList.add('moveTo'));
        });
    }
}