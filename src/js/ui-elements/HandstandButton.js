export class HandstandButton extends HandstandConfigurableElement {
    constructor(attributes, options) {
        super(attributes);
        if (options && options.events && 
            typeof options.events.onPress === 'function') {
            this.onPress = options.events.onPress;
            this.on('click', this.onPress.bind(this));
        }
    }
}
HandstandConfigurableElement.tag('handstand-button', HandstandButton);
module.exports = HandstandButton;