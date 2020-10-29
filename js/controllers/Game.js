class Game {
    constructor() {
        const docSelect = document.querySelector.bind(document);
        const docSelectAll = document.querySelectorAll.bind(document);

        this._gameBoardView = new GameBoardView(docSelect('#root'));
        this._gameBoardView.update(null);

        this._rows = docSelectAll('tr');
        this._turnToPlay;

        this._gameBoard = new GameBoard(new Piece(1), new Piece(2));
        this._positionsHelper = new PositionsHelper();

        this._message = new Message();
        this._messageComponent = new MessageView(docSelect('#messages'));
    }

    start() {

        let disabled = document.querySelectorAll('td.disabled');
        disabled.forEach(item => {
            item.classList.remove('disabled');
        })
        
        this._gameBoard.initPlayers();
        this.positionate(this._gameBoard.player1);
        this.positionate(this._gameBoard.player2);

        this.nextTurn();
    }

    nextTurn() {
        const { turnToPlay } = this._gameBoard;
       
        this._message.message = `É a vez do Jogador ${turnToPlay.player}`;
        this._messageComponent.update(this._message);

        let oldPossibilities = document.querySelectorAll('.moveTo');
        oldPossibilities.forEach(possibility => {
            possibility.classList.remove('moveTo');
            possibility.onclick = "";
        });

        const moves = turnToPlay.possibleMoves();
        let abletoMove = false;
        moves.forEach(move => {
            let cell = this._rows[move.y].cells[move.x];
            //TODO: Improve it
            const isSamePosition = this._positionsHelper.isSamePosition(
                    {positionX: move.x, positionY: move.y}, this._gameBoard.nextPlayer);

            if (!cell.classList.contains('disabled') && !isSamePosition) {
                abletoMove = true;  
                cell.classList.add('moveTo');
                cell.onclick = () => {
                    const old = {};
                    old.positionX = turnToPlay.positionX;
                    old.positionY = turnToPlay.positionY;


                    turnToPlay.positionX = move.x;
                    turnToPlay.positionY = move.y;
                    this.positionate(turnToPlay, old);

                    this._gameBoard.nextPlayerTurn();

                    this.nextTurn();
                }
            }

            

        });

        if(!abletoMove){
            alert("não pode mais mover");
        }

    }

    positionate(piece, old = {}) {
        if (Object.keys(old).length > 0) {
            console.log(old);

            this._rows[old.positionY]
                .cells[old.positionX].classList.add('disabled');
        }

        this._rows[piece.positionY]
            .cells[piece.positionX]
            .appendChild(piece.element);
    }
}