class HandstandMaskedInput extends HandstandInput {
    inputBuildUp() {
        this.input.type = 'password';
    }
}
Handstand.tag('handstand-maskedinput', HandstandMaskedInput);
try { module.exports = HandstandMaskedInput; } catch(x) {}