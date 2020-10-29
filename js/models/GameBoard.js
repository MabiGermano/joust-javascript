class GameBoard {
    constructor(piece1, piece2) {
        const docSelectAll = document.querySelectorAll.bind(document);
        this._rows = docSelectAll('tr');
        this._piece1 = piece1;
        this._piece2 = piece2;
        this._turnToPlay;

        this._positionsHelper = new PositionsHelper();
    }

    get player1() {
        return this._piece1;
    }

    get player2() {
        return this._piece2;
    }


    get turnToPlay() {
        return this._turnToPlay;
    }

    nextPlayer() {
        if (this._turnToPlay.player === 1) {
            return this._piece2;
        } else {
            return this._piece1;
        }
    }

    initPlayers() {
        this._piece1.build();
        this._piece2.build();

        if (this._positionsHelper.isSamePosition(this._piece1, this._piece2)) {
            this.initPlayers();
        }

        this._turnToPlay = this._piece1;
    }

    nextPlayerTurn() {
        if (this._turnToPlay.player === 1) {
            this._turnToPlay = this._piece2;
        } else {
            this._turnToPlay = this._piece1;
        }
    }

}