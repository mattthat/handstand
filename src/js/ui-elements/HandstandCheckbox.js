class HandstandCheckbox extends HandstandInput {
    constructor(attributes) {
        super(attributes);
        this.model.Set('value', false);
    }
    onRender() {
        super.onRender.call(this);
        this.input.type = 'checkbox';
        this.input.checked = false;
    }
    isChecked() {
        let checked = false;
        if (this.input) checked = this.input.checked;
        return checked;
    }
    onSetHandler(key, value, model) {
        if (this.input) this.input.checked = model.Get('value');
    }
    onChange(e) {
        this.model.Set('value', this.isChecked());
    }
}
HandstandConfigurableElement.tag('handstand-checkbox', HandstandCheckbox);
try { module.exports = HandstandCheckbox; } catch(x) {}