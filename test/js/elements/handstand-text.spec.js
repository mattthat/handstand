require('../../harness');

let HandstandText = require(path.join(__dirname, '../../../src/js/elements',
    'handstand-text'));

describe('HandstandText', () => {
    
    describe('provisions', () => {

        let text = new HandstandText();

        it('extends Handstand', () => {
            expect(text instanceof Handstand).to.equal(true);
        });

        it('provides a template property', () => {
            expect(text.template).to.equal('<span bind>[[text]]</span>');
        });

        it('provides a way to do the "buildUp" lifecycle phase', () => {
            expect(typeof text.buildUp).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('lifecycle', () => {

            it('should buildUp', () => {
                let text = new HandstandText();
                text.childNodes[0] = text.template;
                text.render();
                expect(text.span).to.equal(text.template);
            });
        });
        
    });

});