class Piece {
     constructor(x = Math.floor(Math.random() * 8), y = Math.floor(Math.random() * 8)) {
         this._positionX = x;
         this._positionY = y;
     }

     get positionX () {
         return this._positionX;
     }

     get positionY () {
        return this._positionY;
     }
}