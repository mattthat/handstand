export class HandstandSwitch extends HandstandConfigurableElement {
    constructor(attributes, options) {
        super(attributes);
        HandstandSwitch.unique++;
        if (options) {
            this.model.Set('value', options.value);
        } else {
            this.model.Set('value', true);
        }
        this.div = {};
        this.input = { checked: this.model.Get('value') };
        this.label = {};
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
        this.input.checked = this.model.Get('value');
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
module.exports = HandstandSwitch;