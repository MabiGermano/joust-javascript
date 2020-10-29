class App {
    constructor() {
        const docSelect = document.querySelector.bind(document);

        this._gameBoard = new GameBoardView(docSelect('#root'));
        this._gameBoard.update('');


    }
}