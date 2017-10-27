class HandstandInput extends Handstand {
    get template() {
        return `<input bind></input>`;
    }
    setUp() {
        this.style.lineHeight = this.getAttribute('line-height') || '1em';
        this.inputSetUp();
    }
    inputSetUp() {
    }
    buildUp() {
        var placeholder = this.getAttribute('placeholder'),
        fontSize = this.getAttribute('font-size');
        this.input = this.childNodes[0];
        if (placeholder) {
             this.input.placeholder = placeholder;
        }
        if (fontSize) {
             this.input.style.fontSize = fontSize;
        }
        this.inputBuildUp();
    }
    inputBuildUp() {
    }
    configureMonitoring() {
        var monitoring = this.getAttribute('monitor');
        if (monitoring === 'true' && this.id && !this.monitoring) {
            this.monitoring = true;
            HandstandEventManager.listen('#' + this.id, 'input', this.onChange.bind(this));
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
    onSetHandler(key, value, model) {
        this.input.value = model.Get('value');
    }
    stopMonitoring() {
        HandstandEventManager.clear('#' + this.id, 'input', this.onChange.bind(this));
        this.monitoring = false;
    }
}
try { module.exports = HandstandInput; } catch(x) {}