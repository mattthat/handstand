require('../../harness');

let HandstandLabel = require(path.join(__dirname, '../../../src/js/elements',
    'handstand-label'));

describe('HandstandLabel', () => {
    
    describe('provisions', () => {

        let label = new HandstandLabel();

        it('extends Handstand', () => {
            expect(label instanceof Handstand).to.equal(true);
        });

        it('provides a template property', () => {
            expect(label.template).to.equal('<div bind>[[text]]</div>');
        });

        it('provides a way to do the "setUp" lifecycle phase', () => {
            expect(typeof label.setUp).to.equal('function');
        });

        it('provides a way to do the "buildUp" lifecycle phase', () => {
            expect(typeof label.buildUp).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('lifecycle', () => {
        
            it('should setUp', () => {
                let text = 'test 123';
                let label = new HandstandLabel();
                label.setAttribute('label', text);
                label.setUp();
                expect(label.text).to.equal(text);
            });

            it('should buildUp', () => {
                let label = new HandstandLabel();
                label.childNodes[0] = label.template;
                label.render();
                expect(label.div).to.equal(label.template);
            });
            
        });

    });

});