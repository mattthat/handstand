export class WaitingMask extends HandstandConfigurableElement {
    get template() {
        return '<div />';
    }
    constructor(attributes, options) {
        super(attributes);
    }
    onCreated() {
        this.mask = new HandstandMask();
        this.mask.append(this);
    }
    onRemoved() {
        this.mask.remove();
    }
    show() {
        this.mask.show();
        return this;
    }
    hide() {
        this.mask.hide();
        return this;
    }
}
HandstandConfigurableElement.tag('waiting-mask', WaitingMask);
module.exports = WaitingMask;