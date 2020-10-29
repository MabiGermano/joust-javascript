class App {
    constructor() {
        const docSelect = document.querySelector.bind(document);
        const docSelectAll = document.querySelectorAll.bind(document);
        this._gameBoard = new GameBoardView(docSelect('#root'));
        this._gameBoard.update(null);
        
        const piece1 = document.createElement('span');
        piece1.innerHTML = "\u265E";
        const piece2 = document.createElement('span');
        piece2.innerHTML = "\u265E";
        

        const rows = docSelectAll('tr');
        rows[5].cells[5].appendChild(piece1);
        
    
        
        
    }
}