class HandstandTextInputLabel extends Handstand {
    setUp() {
        this.container = new HandstandContainer();
        this.textinput = new HandstandTextInput();
        this.label = new HandstandLabel();
        this.container.render();
        this.textinput.render();
        this.label.render();
        this.textValue = this.getAttribute('label') || this.textinput.input.value;
    }
    buildUp() {
        this.append(this.container);
        this.label.onclick = this.writeMode.bind(this);
        this.textinput.input.onblur = this.readMode.bind(this);
        HandstandEventManager.afterReflow(this.readMode.bind(this), 50);
    }
    get textValue() {
        return this.model.Get('value');
    }
    set textValue(something) {
        this.model.Set('value', something);
        this.textinput.input.value = something;
        this.label.changeText(something);
    }
    readMode() {
        this.model.Set('mode', 'read');
        this.textValue = this.textinput.input.value;
        this.container.destroyInnerHTML();
        this.container.append(this.label);
    }
    writeMode() {
        this.model.Set('mode', 'write');
        this.textValue = this.label.text;
        this.container.destroyInnerHTML();
        this.container.append(this.textinput);
    }
}
Handstand.tag('handstand-textinputlabel', HandstandTextInputLabel);
try { module.exports = HandstandTextInputLabel; } catch(x) {}