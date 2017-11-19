class HandstandTextInput extends HandstandInput {
    inputBuildUp() {
        this.input.type = 'text';
    }
}
HandstandConfigurableElement.tag('handstand-textinput', HandstandTextInput);
try { module.exports = HandstandTextInput; } catch(x) {}