require('../../ui-core_harness');

let HandstandContainer = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandContainer'));

describe('HandstandContainer', () => {
    
    describe('provisions', () => {

        let container = new HandstandContainer();

        it('extends HandstandConfigurableElement', () => {
            expect(container instanceof HandstandConfigurableElement).to.equal(true);
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