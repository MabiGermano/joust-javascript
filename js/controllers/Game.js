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
        
        let oldPossibilities = document.querySelectorAll('.moveTo');
        oldPossibilities.forEach(possibility => {
            possibility.classList.remove('moveTo');
        })

        const moves = this._piece1.possibleMoves();
        moves.forEach(move => {
            let cell = this._rows[move.y].cells[move.x];
           cell.classList.add('moveTo');
           cell.onclick = () => { alert("it works!") }
        });
        
    }
}