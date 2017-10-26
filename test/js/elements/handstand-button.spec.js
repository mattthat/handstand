require('../../harness');

let HandstandButton = require(path.join(__dirname, '../../../src/js/elements',
    'handstand-button'));

describe('HandstandButton', () => {
    
    describe('provisions', () => {

        let button = new HandstandButton();

        it('extends Handstand', () => {
            expect(button instanceof Handstand).to.equal(true);
        });

        it('provides a isInteractive property', () => {
            expect(button.isInteractive).to.equal(true);
        });

        it('provides a way to handle a CustomEvent called buttonPressed', () => {
            expect(typeof button.buttonPressed).to.equal('function');
        });

    });

    describe('methods', () => {

        it('should handle button being pressed', () => {
            let button = new HandstandButton();
            let spy = sinon.spy(button, 'dispatchEvent');
            button.buttonPressed();
            expect(spy.called).to.equal(true);
            button.dispatchEvent.restore();
        });
        
    });

});