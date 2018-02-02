require('../../ui-core_harness');

let HandstandTextInput = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandTextInput.js'));

describe('HandstandTextInput', () => {

    describe('provisions', () => {
        
        let textinput = new HandstandTextInput();

        it('extends HandstandConfigurableElement', () => {
            expect(textinput instanceof HandstandConfigurableElement).to.equal(true);
        });

    });

    describe('methods', () => {

        describe('lifecycle', () => {

            let textinput;

            beforeEach(() => {
                textinput = new HandstandTextInput();
                textinput.childNodes[0] = {};
            });

            afterEach(() => {
                textinput = null;
                textinput = undefined;
            });

            it('should render', () => {
                textinput.render();
                expect(textinput.input.type).to.equal('text');
            });

        });

    });

});