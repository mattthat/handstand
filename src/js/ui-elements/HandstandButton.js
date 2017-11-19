class HandstandButton extends Handstand {
    get isInteractive() { return true }
    buttonPressed() {
        this.dispatchEvent(new CustomEvent('buttonPressed', {
            detail: {
                pressed: true
            }
        }));
    }
}
Handstand.tag('handstand-button', HandstandButton);
try { module.exports = HandstandButton; } catch(x) {}