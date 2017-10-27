class HandstandTextInput extends HandstandInput {
    inputBuildUp() {
        this.input.type = 'text';
    }
}
Handstand.tag('handstand-textinput', HandstandTextInput);
try { module.exports = HandstandTextInput; } catch(x) {}