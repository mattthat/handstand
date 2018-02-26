export class HandstandTextarea extends HandstandConfigurableElement {
    get template() {
        return `<textarea></textarea>`;
    }
    get value() {
        return this.model.Get('value') || '';
    }
    set value(text) {
        if (this.textarea) this.textarea.value = text;
        this.model.Set('value', text);
    }
    constructor(attributes, options) {
        super(attributes);
        if (options) {
            this.model.Set('value', options.value);
        }
        this.textarea = {};
    }
    onRender() {
        this.textarea = this.childNodes[0];
        this.textarea.value = this.model.Get('value');
    }
    onSetHandler(key, value, model) {
        if (this.textarea) this.textarea.value = model.Get('value');
    }
    onChange(e) {
        this.model.Set('value', this.textarea.value);
    }
}
HandstandConfigurableElement.tag('handstand-textarea', HandstandTextarea);
module.exports = HandstandTextarea;