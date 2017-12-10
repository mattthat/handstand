class HandstandInput extends HandstandConfigurableElement {
    get template() {
        return `<input bind></input>`;
    }
    setUp() {
        this.style.lineHeight = this.getAttribute('line-height') || '1em';
        this.inputSetUp();
    }
    inputSetUp() {
    }
    buildUp() {
        var placeholder = this.getAttribute('placeholder'),
        fontSize = this.getAttribute('font-size');
        this.input = this.childNodes[0];
        if (placeholder) {
             this.input.placeholder = placeholder;
        }
        if (fontSize) {
             this.input.style.fontSize = fontSize;
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