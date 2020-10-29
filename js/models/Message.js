class Message {

    constructor(text = '') {
        this._message = text;
    }

    get message() {

        return this._message;
    }

    set message(text){
        this._message = text;
    }
}