class PositionsHelper {

    isSamePosition(piece1, piece2) {
        return piece1.positionY == piece2.positionY &&
        piece1.positionX == piece2.positionX;
    }
}