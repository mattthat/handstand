export class MutableLabel extends HandstandConfigurableElement {
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
        return this.model.Get('value');
    }
    set value(label) {
        this.model.Set('value', label);
    }
    constructor(attributes, options) {
        super(attributes);
        this.setAttribute('state', 'modeled');
        if (options) {
            this.value = options.value;
            if (options.events) {
                if (typeof options.events.onModeled === 'function') {
                    this.onModeled = options.events.onModeled;
                }
                if (typeof options.events.onMutable === 'function') {
                    this.onMutable = options.events.onMutable;
                }
            }
        }
        this.label = {};
        this.mutable = {};
    }
    onCreated() {
        let component = this;
        this.on('click', () => {
            if (component.state === 'modeled')
                component.state = 'mutable';
        });
        this.on('focusout', () => {
            if (component.state === 'mutable')
                component.state = 'modeled';
        });
    }
    onAdded() {
        this.label = new HandstandLabel({}, {
            value: this.value
        });
        this.mutable = new HandstandTextarea({}, {
            value: this.value
        });
        this.append(this.label);
    }
    beModeled() {
        this.value = this.mutable.value;
        this.childNodes[0].remove();
        this.label.value = this.value;
        this.append(this.label);
        if (typeof this.onModeled === 'function')
            this.onModeled.call(this);
    }
    beMutable() {
        this.childNodes[0].remove();
        this.mutable.value = this.value;
        this.append(this.mutable);
        if (typeof this.onMutable === 'function')
            this.onMutable.call(this);
    }
}
HandstandConfigurableElement.tag('mutable-label', MutableLabel);
module.exports = MutableLabel;