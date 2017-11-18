class HandstandContainer extends Handstand {
    setUp() {
        this.style.display = this.getAttribute('display') || 'inline-block';
    }
}
Handstand.tag('handstand-container', HandstandContainer);
try { module.exports = HandstandContainer; } catch(x) {}