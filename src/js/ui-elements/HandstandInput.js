class HandstandInput extends HandstandConfigurableElement {
    get template() {
        return `<input></input>`;
    }
    onRender() {
        let placeholder = this.getAttribute('placeholder');
        this.input = this.childNodes[0];
        if (placeholder) {
             this.input.placeholder = placeholder;
        }
    }
    onSetHandler(key, value, model) {
        this.input.value = model.Get('value');
    }
}
try { module.exports = HandstandInput; } catch(x) {}