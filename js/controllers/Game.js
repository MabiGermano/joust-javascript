class Game {
    constructor() {
        const docSelect = document.querySelector.bind(document);
        const docSelectAll = document.querySelectorAll.bind(document);
        this._gameBoard = new GameBoardView(docSelect('#root'));
        this._gameBoard.update(null);

        this._rows = docSelectAll('tr');
        this._piece1 = new Piece(1);
        this._piece2 = new Piece(2);

        this._turnToPlay;
    }

    start() {
        this._piece1.build();
        this._piece2.build();

        if (!(this._piece1.positionY == this._piece2.positionY &&
                this._piece1.positionX == this._piece2.positionX)) {
            this.positionate(this._piece1);
            this.positionate(this._piece2);
        } else {
            this.start();
        }
        this._turnToPlay = this._piece1;
        this.nextTurn();
    }

    nextTurn() {
        console.log(this._turnToPlay);
        
        let oldPossibilities = document.querySelectorAll('.moveTo');
        oldPossibilities.forEach(possibility => {
            possibility.classList.remove('moveTo');
            possibility.onclick = "";
        })

        const moves = this._turnToPlay.possibleMoves();
        moves.forEach(move => {
            let cell = this._rows[move.y].cells[move.x];
            cell.classList.add('moveTo');
            cell.onclick = () => {
                
                this._turnToPlay.positionX = move.x;
                this._turnToPlay.positionY = move.y;
                this.positionate(this._turnToPlay);
       
                if(this._turnToPlay.player === 1){
                    this._turnToPlay = this._piece2;
                }else {
                    this._turnToPlay = this._piece1;
                }
       
                this.nextTurn();
            
            }
        });

       
    }

    positionate(piece) {
        this._rows[piece.positionY]
            .cells[piece.positionX]
            .appendChild(piece.element);
    }
}