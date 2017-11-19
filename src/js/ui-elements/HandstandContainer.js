class HandstandContainer extends HandstandConfigurableElement {
    setUp() {
        this.style.display = this.getAttribute('display') || 'inline-block';
    }
}
HandstandConfigurableElement.tag('handstand-container', HandstandContainer);
try { module.exports = HandstandContainer; } catch(x) {}