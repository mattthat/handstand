class HandstandButton extends HandstandConfigurableElement {
    constructor(attributes, options) {
        super(attributes);
        if (options && options.events.onPress) {
            this.onPress = options.events.onPress;
            this.on('click', this.onPress.bind(this));
        }
    }
    press() {
    	if (this.onPress) this.onPress.call(this);
    }
}
HandstandConfigurableElement.tag('handstand-button', HandstandButton);
try { module.exports = HandstandButton; } catch(x) {}