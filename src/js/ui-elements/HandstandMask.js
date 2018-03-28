export class HandstandMask extends HandstandConfigurableElement {
    get state() {
        return this.getAttribute('state');
    }
    set state(state) {
        this.setAttribute('state', state);
        if (state === 'shown') {
            this.show();
        } else {
            this.hide();
        }
    }
    constructor(attributes, options) {
        super(attributes);
        this.selector = (options && options.selector) || 'body';
        if (options && options.events) {
            if (typeof options.events.onHide === 'function') {
                this.onHide = options.events.onHide;
            }
            if (typeof options.events.onShow === 'function') {
                this.onShow = options.events.onShow;
            }
        }
        this.state = 'hidden';
        this.masked = document.querySelector(this.selector);
        if (this.masked) {
            this.masked.prepend(this);
        }
        delete this.model;
    }
    hide() {
        if (this.state !== 'hidden') this.setAttribute('state', 'hidden');
        this.style.display = 'none';
        if (typeof this.onHide === 'function') this.onHide();
        return this;
    }
    show() {
        if (this.state !== 'shown') this.setAttribute('state', 'shown');
        this.style.display = 'block';
        if (typeof this.onShow === 'function') this.onShow();
        return this;
    }
}
HandstandConfigurableElement.tag('handstand-mask', HandstandMask);
module.exports = HandstandMask;