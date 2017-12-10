class HandstandTextInput extends HandstandInput {
    inputBuildUp() {
        this.input.type = 'text';
    }
    configureMonitoring() {
        var monitoring = this.getAttribute('monitor');
        if (monitoring === 'true' && this.id && !this.monitoring) {
            this.monitoring = true;
            this.on('input', this.onChange.bind(this));
        } else {
            this.monitoring = false;
        }
    }
    stopMonitoring() {
        this.off('input', this.onChange.bind(this));
        this.monitoring = false;
    }
}
HandstandConfigurableElement.tag('handstand-textinput', HandstandTextInput);
try { module.exports = HandstandTextInput; } catch(x) {}