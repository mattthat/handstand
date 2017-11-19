require('../../harness');

let HandstandButton = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandButton.js'));

describe('HandstandButton', () => {
    
    describe('provisions', () => {

        let button = new HandstandButton();

        it('extends Handstand', () => {
            expect(button instanceof Handstand).to.equal(true);
        });

    });

    describe('methods', () => {

        it('should handle button being pressed', () => {
            let x = 0, button = new HandstandButton({ id: 'button-test' }, {
                onPress: () => {
                    x = 20;
                }
            });
            button.onPress();
            expect(x).to.equal(20);
        });
        
    });

});