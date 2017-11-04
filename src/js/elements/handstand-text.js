class HandstandText extends Handstand {
    get template() {
        return `<span bind>[[text]]</span>`;
    }
    setUp() {
        this.text = this.getAttribute('text');
    }
    buildUp() {
        this.span = this.childNodes[0];
    }
}
Handstand.tag('handstand-text', HandstandText);
try { module.exports = HandstandText; } catch(x) {}