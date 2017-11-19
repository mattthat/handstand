class HandstandButton extends Handstand {
    constructor(attributes, events) {
        super(attributes);
        if (events && events.onPress) {
            this.onPress = events.onPress;
            this.on('click', this.onPress.bind(this));
        }
    }
}
Handstand.tag('handstand-button', HandstandButton);
try { module.exports = HandstandButton; } catch(x) {}