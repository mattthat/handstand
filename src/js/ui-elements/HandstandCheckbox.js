import css from '../../css/ui-elements/HandstandCheckbox.css';
import HandstandCustomElement from '../ui-core/HandstandCustomElement.js';

export default class HandstandCheckbox extends HandstandCustomElement {
    get value() {
        return this.conditions.properties.checked;
    }
    set value(v) {
        this.conditions.properties.checked = v;
        this.input.checked = v;
    }
    constructor(conditions) {
        super(conditions);
        if (this.conditions.properties.checked === undefined)
            this.conditions.properties.checked = true;
        this.input = document.createElement('input');
        this.input.type = 'checkbox';
        this.input.checked = this.conditions.properties.checked;
        this.on('change', this.onChange.bind(this));
        this.append(this.input);
    }
    onChange() {
        if (this.input) this.value = this.input.checked;
    }
    onRender() {
        if (typeof this.conditions.events.onChange === 'function')
            this.input.onchange = this.conditions.events.onChange.bind(this);
    }
}
customElements.define('handstand-checkbox', HandstandCheckbox);