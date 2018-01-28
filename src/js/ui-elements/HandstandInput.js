class HandstandInput extends HandstandConfigurableElement {
    get template() {
        return `<input bind></input>`;
    }
    setUp() {
        this.inputSetUp();
    }
    inputSetUp() {
    }
    buildUp() {
        let placeholder = this.getAttribute('placeholder');
        this.input = this.childNodes[0];
        if (placeholder) {
             this.input.placeholder = placeholder;
        }
        this.inputBuildUp();
    }
    inputBuildUp() {
    }
    onSetHandler(key, value, model) {
        this.input.value = model.Get('value');
    }
}
try { module.exports = HandstandInput; } catch(x) {}