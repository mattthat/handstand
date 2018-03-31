import css from '../../css/ui-components/MutableLabel.css';
import HandstandCustomElement from '../ui-core/HandstandCustomElement.js';
import HandstandLabel from '../ui-elements/HandstandLabel.js';
import HandstandTextarea from '../ui-elements/HandstandTextarea.js';

export default class MutableLabel extends HandstandCustomElement {
    get state() {
        return this.getAttribute('state');
    }
    set state(state) {
        this.setAttribute('state', state);
        if (state === 'mutable') {
            this.beMutable();
        } else {
            this.beModeled();
        }
    }
    get value() {
        return this.conditions.properties.value
    }
    set value(v) {
        this.conditions.properties.value = v;
        this.label.innerText = v;
        this.mutable.value = v;
    }
    constructor(conditions) {
        super(conditions);
        this.setAttribute('state', 'modeled');
        this.mutable = new HandstandTextarea({
            properties: { 
                value: this.conditions.properties.value 
            }
        });
        this.label = new HandstandLabel({
            properties: { 
                innerText: this.conditions.properties.value
            }
        });
        let component = this;
        this.on('click', (e) => {
            if (component.state === 'modeled')
                component.state = 'mutable';
        });
        this.on('focusout', () => {
            if (component.state === 'mutable')
                component.state = 'modeled';
        });
        this.append(this.label)
    }
    beModeled() {
        this.value = this.mutable.value;
        this.mutable.remove();
        this.label.innerText = this.value;
        this.append(this.label);
    }
    beMutable() {
        this.value = this.label.innerText;
        this.label.remove();
        this.mutable.value = this.value;
        this.append(this.mutable);
        this.mutable.textarea.focus();
    }
}
customElements.define('mutable-label', MutableLabel);