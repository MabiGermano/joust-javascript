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

    build() {
        this._positionX =  Math.floor(Math.random() * 8);
        this._positionY =  Math.floor(Math.random() * 8);
    }
}