class Piece {
    constructor() {
        this._positionX;
        this._positionY;
        this._element = document.createElement('span');
        this._element.innerHTML = "\u265E";

    }

    get positionX() {
        return this._positionX;
    }

    get positionY() {
        return this._positionY;
    }

    set positionX (value) {
        this._positionX = value;
    }

    set positionY (value) {
        this._positionY = value;
    }

    get element () {
        return this._element;
    }

    // TODO: Improve this code, verify the possibility to implement observer pattern.
    possibleMoves () {
        let coordinates = [];

        if(this._positionX + 2 < 8 ) {
            if(this._positionY - 1 >= 0) {
                coordinates.push({x: this._positionX + 2, y: this._positionY - 1});
            }
            if(this._positionY + 1 < 8) {
                coordinates.push({x: this._positionX + 2, y: this._positionY + 1});
            }
        }
        if(this._positionX - 2 >= 0) {
            if(this._positionY - 1 >= 0) {
                coordinates.push({x: this._positionX - 2, y: this._positionY - 1});
            }
            if(this._positionY + 1 < 8) {
                coordinates.push({x: this._positionX - 2, y: this._positionY + 1});
            }
        }
        if(this._positionY + 2 < 8) {
            if(this._positionX - 1 >= 0) {
                coordinates.push({y: this._positionY + 2, x: this._positionX - 1});
            }
            if(this._positionX + 1 < 8) {
                coordinates.push({y: this._positionY + 2, x: this._positionX + 1});
            }
        }
        if(this._positionY - 2 >= 0) {
            if(this._positionX - 1 >= 0) {
                coordinates.push({y: this._positionY - 2, x: this._positionX - 1});
            }
            if(this._positionX + 1 < 8) {
                coordinates.push({y: this._positionY - 2, x: this._positionX + 1});
            }
        }
        return coordinates;
    }

    build() {
        this._positionX =  Math.floor(Math.random() * 8);
        this._positionY =  Math.floor(Math.random() * 8);
    }
}