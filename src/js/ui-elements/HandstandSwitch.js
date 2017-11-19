class HandstandSwitch extends Handstand {
    constructor(attributes) {
        super(attributes);
        this.model.Set('value', true);
    }
    get template() {
        return `<div><input name="[[ident]]" id="[[ident]]" type="checkbox" checked><label for="[[ident]]"></label></div>`;
    }
    setUp() {
        this.ident = 'handstandswitch-' + this.id;
    }
    buildUp() {
        this.div = this.childNodes[0],
        this.input = this.div.childNodes[0],
        this.label = this.div.childNodes[1];
    }
    isSwitched() {
        var checked = false;
        if (this.input) checked = this.input.checked;
        return checked;
    }
    configureMonitoring() {
        var monitoring = this.getAttribute('monitor');
        if (monitoring === 'true') {
            this.monitoring = true
            this.on('change', this.onChange.bind(this));
       } else {
            this.monitoring = false;
        }
    }
    configureTwoway() {
        var twoway = this.getAttribute('twoway');
        if (twoway === 'true') {
            this.twoway = true;
            this.model.onSet(this.onSetHandler.bind(this));
        } else {
            this.twoway = false;
        }
    }
    onSetHandler(key, value, model) {
        if (this.input && model) this.input.checked = model.Get('value');
    }
    onChange(e) {
        this.model.Set('value', this.isSwitched());
    }
    stopMonitoring() {
        this.off('change', this.onChange.bind(this));
        this.monitoring = false;
    }
}
Handstand.tag('handstand-switch', HandstandSwitch);
try { module.exports = HandstandSwitch; } catch(x) {}