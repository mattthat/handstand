import css from './HandstandSwitch.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';

export default class HandstandSwitch extends HandstandCustomElement {
    get value() {
        return this.conditions.properties.on;
    }
    set value(v) {
        this.conditions.properties.on = v;
        this.input.checked = v;
    }
    constructor(conditions) {
        super(conditions);
        if (this.conditions.properties.on === undefined)
           this.conditions.properties.on = true;
        HandstandSwitch.unique++;
        let key = 'handstandswitch-' + HandstandSwitch.unique;
        this.input = document.createElement('input');
        this.input.setAttribute('name', key);
        this.input.type = 'checkbox';
        this.input.checked = this.conditions.properties.on;
        this.label = document.createElement('label');
        this.label.setAttribute('for', key);
        this.div = document.createElement('div');
        this.div.append(this.input);
        this.div.append(this.label);
        this.append(this.div);
        this.on('click', this.onClick);
    }
    onClick() {
        if (this.value === true) {
            this.value = false;
        } else {
            this.value = true;
        }
        this.dispatchEvent(new Event('change'))
    }
}
HandstandSwitch.unique = 0;
customElements.define('handstand-switch', HandstandSwitch);
