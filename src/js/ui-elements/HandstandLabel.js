class HandstandLabel extends HandstandConfigurableElement {
    get template() {
        return `<div bind>{{label}}</div>`;
    }
    onRender() {
        this.label = this.getAttribute('label');
        this.div = this.childNodes[0];
    }
}
HandstandConfigurableElement.tag('handstand-label', HandstandLabel);
try { module.exports = HandstandLabel; } catch(x) {}