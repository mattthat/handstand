export class HandstandContainer extends HandstandConfigurableElement {
    get state() {
        return this.getAttribute('state');
    }
    set state(state) {
        this.setAttribute('state', state);
        if (state === 'opened') {
            this.open();
        } else {
            this.close();
        }
    }
    constructor(attributes, options) {
        super(attributes);
        if (options && options.events) {
            if (typeof options.events.onOpen === 'function') {
                this.onOpen = options.events.onOpen;
            }
            if (typeof options.events.onClose === 'function') {
                this.onClose = options.events.onClose;
            }
        }
        this.state = 'opened'
        delete this.model;
    }
    contents() {
        return Array.from(this.children).filter((child) => {
            if (child instanceof
                HandstandConfigurableElement) return child;
        });
    }
    open() {
        if (this.state !== 'opened') this.setAttribute('state', 'opened');
        if (typeof this.onOpen === 'function') this.onOpen();
    }
    close() {
        if (this.state !== 'closed') this.setAttribute('state', 'closed');
        if (typeof this.onClose === 'function') this.onClose();        
    }
}
HandstandConfigurableElement.tag('handstand-container', HandstandContainer);
module.exports = HandstandContainer;