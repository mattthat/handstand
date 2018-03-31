import css from './WaitingMask.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';
import HandstandMask from '../../ui-elements/HandstandMask/HandstandMask.js';

export default class WaitingMask extends HandstandCustomElement {
    constructor(conditions) {
        super(conditions);
        this.div = document.createElement('div');
        this.mask = new HandstandMask();
        this.mask.append(this);
        this.append(this.div);
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
customElements.define('waiting-mask', WaitingMask);