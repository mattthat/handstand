export class HandstandLabel extends HandstandConfigurableElement {
    get template() {
        return `<div></div>`;
    }
    get value() {
        return this.model.Get('value') || '';
    }
    set value(label) {
        this.div.innerText = label;
        this.model.Set('value', label);
    }
    constructor(attributes, options) {
        super(attributes);
        if (options) {
            this.model.Set('value', options.value);
        }
        this.div = {};
    }
    onRender() {
        this.div = this.childNodes[0];
        this.div.innerText = this.model.Get('value');
    }
}
HandstandConfigurableElement.tag('handstand-label', HandstandLabel);
module.exports = HandstandLabel;