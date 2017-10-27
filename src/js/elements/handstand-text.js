class HandstandText extends Handstand {
    get template() {
        return `<span bind>[[text]]</span>`;
    }
    buildUp() {
        this.span = this.childNodes[0];
    }
}
Handstand.tag('handstand-text', HandstandText);
try { module.exports = HandstandText; } catch(x) {}