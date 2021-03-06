class Game {
    constructor() {
        const docSelect = document.querySelector.bind(document);

        this._gameBoardView = new GameBoardView(docSelect('#root'));
        this._gameBoardView.update(null);

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

        this._clearOldPossibilities();
        this._updateGameMessage(`É a vez do Jogador ${turnToPlay.player}`);

        let abletoMove = false;

        const moves = turnToPlay.possibleMoves();
        abletoMove = this.possibleMoves(moves, turnToPlay);
       
        if (!abletoMove) {

            const opponent = this._gameBoard.nextPlayer();
            const otherCanMove = this.possibleMoves(opponent.possibleMoves(), opponent);
            
            if(otherCanMove) {
                this._updateGameMessage(`Fim do jogo!! O Jogador ${opponent.player} venceu!`);
                this._clearOldPossibilities();
            }else {
                this._updateGameMessage(`Fim do jogo!! EMPATE.`);
            }
        }
    }

    possibleMoves(moves, turnToPlay) {

        let hasMoves = false;
        moves.forEach(move => {
            
            const samePosition = this._positionsHelper.isSamePosition({
                positionX: move.x,
                positionY: move.y
            }, this._gameBoard.nextPlayer());

            if (!samePosition) {
                const cell = this._gameBoard.rows[move.y].cells[move.x];
                if (!cell.classList.contains('disabled')) {
                   
                    hasMoves = true;
                    
                    cell.classList.add(`moveTo${turnToPlay.player}`);
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
            }
        });

        return hasMoves;
    }

    positionate(piece, old = {}) {
        if (Object.keys(old).length > 0) {
            this._gameBoard.rows[old.positionY]
                .cells[old.positionX].classList.add('disabled');
        }

        this._gameBoard.rows[piece.positionY]
            .cells[piece.positionX]
            .appendChild(piece.element);
    }

    _updateGameMessage(text) {
        this._message.message = text;
        this._messageComponent.update(this._message);
    }

    _clearOldPossibilities() {
        const nextPlayer = this._gameBoard.nextPlayer();
        let classToRemove = `moveTo${nextPlayer.player}`;
        let oldPossibilities = document.querySelectorAll(`.${classToRemove}`);
        
        if(oldPossibilities.length === 0) {
            classToRemove = `moveTo${this._gameBoard.turnToPlay.player}`;
            oldPossibilities = document.querySelectorAll(`.${classToRemove}`);
            
        }
        
        oldPossibilities.forEach(possibility => {
            possibility.classList.remove(classToRemove);
            possibility.onclick = "";
        });
    }
}