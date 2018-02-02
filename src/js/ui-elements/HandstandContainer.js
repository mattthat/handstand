class HandstandContainer extends HandstandConfigurableElement {
    get state() {
        return this.getAttribute('state');
    }
    set state(state) {
        this.setAttribute('state', state);
    }
    constructor(attributes, events) {
        super(attributes);
        if (events) {
            if (typeof events.onOpen === 'function') {
                this.onOpen = events.onOpen;
            }
            if (typeof events.onClose === 'function') {
                this.onClose = events.onClose;
            }
        }
        this.state = 'opened'
    }
    contents() {
        return Array.from(this.children).filter((child) => {
            if (child instanceof
                HandstandConfigurableElement) return child;
        });
    }
    open() {
        this.state = 'opened';
        if (typeof this.onOpen === 'function') this.onOpen();
    }
    close() {
        this.state = 'closed';
        if (typeof this.onClose === 'function') this.onClose();
    }
}
HandstandConfigurableElement.tag('handstand-container', HandstandContainer);
try { module.exports = HandstandContainer; } catch(x) {}