class HandstandButton extends HandstandConfigurableElement {
    constructor(attributes, events) {
        super(attributes);
        if (events && events.onPress) {
            this.onPress = events.onPress;
            this.on('click', this.onPress.bind(this));
        }
    }
}
HandstandConfigurableElement.tag('handstand-button', HandstandButton);
try { module.exports = HandstandButton; } catch(x) {}