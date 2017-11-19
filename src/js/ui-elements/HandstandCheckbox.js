class HandstandCheckbox extends HandstandInput {
    constructor(attributes) {
        super(attributes);
        this.model.Set('value', false);
    }
    inputBuildUp() {
        this.input.type = 'checkbox';
        this.input.checked = false;
    }
    configureMonitoring() {
        var monitoring = this.getAttribute('monitor');
        if (monitoring === 'true' && this.id && !this.monitoring) {
            this.monitoring = true;
            this.on('change', this.onChange.bind(this));
        } else {
            this.monitoring = false;
        }
    }
    configureTwoway() {
        var twoway = this.getAttribute('twoway');
        if (twoway === 'true' && !this.twoway) {
            this.twoway = true;
            this.model.onSet(this.onSetHandler.bind(this));
        } else {
            this.twoway = false;
        }
    }
    isChecked() {
        var checked = false;
        if (this.input) checked = this.input.checked;
        return checked;
    }
    onSetHandler(key, value, model) {
        if (this.input) this.input.checked = model.Get('value');
    }
    onChange(e) {
        this.model.Set('value', this.isChecked());
    }
    stopMonitoring() {
        this.off('change', this.onChange.bind(this));
        this.monitoring = false;
    }
}
HandstandConfigurableElement.tag('handstand-checkbox', HandstandCheckbox);
try { module.exports = HandstandCheckbox; } catch(x) {}