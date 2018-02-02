class HandstandSwitch extends HandstandConfigurableElement {
    constructor(attributes) {
        super(attributes);
        this.model.Set('value', true);
        HandstandSwitch.unique++;
    }
    get template() {
        return '<div><input name="' + 
        HandstandSwitch.unique + '" id="' + HandstandSwitch.unique + 
        '" type="checkbox" checked><label for="' +
        HandstandSwitch.unique + '"></label></div>';
    }
    onRender() {
        this.div = this.childNodes[0],
        this.input = this.div.childNodes[0],
        this.label = this.div.childNodes[1];
    }
    isSwitched() {
        var checked = false;
        if (this.input) checked = this.input.checked;
        return checked;
    }
    onSetHandler(key, value, model) {
        if (this.input && model) this.input.checked = model.Get('value');
    }
    onChange(e) {
        this.model.Set('value', this.isSwitched());
    }
}
HandstandSwitch.unique = 1;
HandstandConfigurableElement.tag('handstand-switch', HandstandSwitch);
try { module.exports = HandstandSwitch; } catch(x) {}