class HandstandLabel extends Handstand {
    get template() {
        return `<div bind>[[text]]</div>`;
    }
    setUp() {
      this.text = this.getAttribute('label');
    }
    buildUp() {
      this.div = this.childNodes[0];
    }
}
Handstand.tag('handstand-label', HandstandLabel);
try { module.exports = HandstandLabel; } catch(x) {}