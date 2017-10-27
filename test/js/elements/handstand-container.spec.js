require('../../harness');

let HandstandContainer = require(path.join(__dirname, '../../../src/js/elements',
    'handstand-container'));

describe('HandstandContainer', () => {
    
    describe('provisions', () => {

        let container = new HandstandContainer();

        it('extends Handstand', () => {
            expect(container instanceof Handstand).to.equal(true);
        });

        it('provides a way to do the "setUp" lifecycle phase', () => {
            expect(typeof container.setUp).to.equal('function');
        });

    });

    describe('methods', () => {
    
        describe('lifecycle', () => {
    
            it('should setUp', () => {
                let display = 'none';
                let container = new HandstandContainer();
                container.setAttribute('display', display);
                container.setUp();
                expect(container.style.display).to.equal(display);
            });
        });

    });

});