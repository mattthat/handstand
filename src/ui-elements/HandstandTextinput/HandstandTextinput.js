import css from './HandstandTextinput.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';

export default class HandstandTextinput extends HandstandCustomElement {
    get value() {
        return this.conditions.properties.value;
    }
    set value(v) {
        this.conditions.properties.value = v;
        this.input.value = v;
    }
    constructor(conditions) {
        super(conditions);
        this.input = document.createElement('input');
        this.input.value = this.conditions.properties.value || '';
        this.on('input', this.onInput.bind(this));
        this.append(this.input);
    }
    onInput() {
        if (this.input) this.value = this.input.value;
    }
    onRender() {
        if (this.conditions.properties.placeHolder)
            this.input.placeholder = this.conditions.properties.placeHolder;
        if (typeof this.conditions.events.onKeyUp === 'function')
            this.input.onkeyup = this.conditions.events.onKeyUp.bind(this);
        if (typeof this.conditions.events.onKeyDown === 'function')
            this.input.onkeydown = this.conditions.events.onKeyDown.bind(this);
        if (typeof this.conditions.events.onKeyPress === 'function')
            this.input.onkeypress = this.conditions.events.onKeyPress.bind(this);
        if (typeof this.conditions.events.onChange === 'function')
            this.input.onchange = this.conditions.events.onChange.bind(this);
    }
}
customElements.define('handstand-textinput', HandstandTextinput);