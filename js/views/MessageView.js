class MessageView extends View{

    constructor(elemento) {
        super(elemento);
    }

    template(model) {
        return model.message ? `<p>${model.message}</p>` : `<p></p>`
    }


}