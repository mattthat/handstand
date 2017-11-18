require('../../harness');

let HandstandTextInput = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandTextInput.js'));

describe('HandstandTextInput', () => {

    describe('provisions', () => {
        
        let textinput = new HandstandTextInput();

        it('extends Handstand', () => {
            expect(textinput instanceof Handstand).to.equal(true);
        });

        it('provides a way to do the "inputBuildUp" lifecycle phase', () => {
            expect(typeof textinput.inputBuildUp).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('lifecycle', () => {

            let textinput;

            beforeEach(() => {
                textinput = new HandstandTextInput();
                textinput.childNodes[0] = {};
                textinput.setUp();
            });

            afterEach(() => {
                textinput = null;
                textinput = undefined;
            });

            it('should inputBuildUp', () => {
                textinput.buildUp();
                expect(textinput.input.type).to.equal('text');
            });

        });

    });

});