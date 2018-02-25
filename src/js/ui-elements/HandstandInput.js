export class HandstandInput extends HandstandConfigurableElement {
    get template() {
        return `<input></input>`;
    }
    constructor(attributes, options) {
        super(attributes);
        if (options) {
            this.model.Set('value', options.value);
        }
        this.input = {};
    }
    onRender() {
        let placeholder = this.getAttribute('placeholder');
        this.input = this.childNodes[0];
        if (this.model.Get('value')) this.input.value = this.model.Get('value');
        if (placeholder) {
             this.input.placeholder = placeholder;
        }
    }
    onSetHandler(key, value, model) {
        if (this.input) this.input.value = model.Get('value');
    }
}
module.exports = HandstandInput;