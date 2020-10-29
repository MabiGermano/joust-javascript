class App {
    constructor() {
        const docSelect = document.querySelector.bind(document);
        const docSelectAll = document.querySelectorAll.bind(document);
        this._gameBoard = new GameBoardView(docSelect('#root'));
        this._gameBoard.update(null);
        // var texto=document.createTextNode("\u265E");
        // td.appendChild(texto);

        const rows = docSelectAll('tr');
        rows[5].cells[5].appendChild(document.cr("\u265E"));
        
    
        
        
    }
}