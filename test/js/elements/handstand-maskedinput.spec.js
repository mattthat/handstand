require('../../harness');

let HandstandMaskedInput = require(path.join(__dirname, '../../../src/js/elements',
    'handstand-maskedinput'));

describe('HandstandMaskedInput', () => {

    describe('provisions', () => {
        
        let maskedinput = new HandstandMaskedInput();

        it('extends Handstand', () => {
            expect(maskedinput instanceof Handstand).to.equal(true);
        });

        it('provides a way to do the "inputBuildUp" lifecycle phase', () => {
            expect(typeof maskedinput.inputBuildUp).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('lifecycle', () => {

            let maskedinput;

            beforeEach(() => {
                maskedinput = new HandstandMaskedInput();
                maskedinput.childNodes[0] = {};
                maskedinput.setUp();
            });

            afterEach(() => {
                maskedinput = null;
                maskedinput = undefined;
            });

            it('should inputBuildUp', () => {
                maskedinput.buildUp();
                expect(maskedinput.input.type).to.equal('password');
            });

        });

    });

});