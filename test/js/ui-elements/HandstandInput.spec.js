require('../../ui-core_harness');

let HandstandInput = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandInput.js'));

describe('HandstandInput', () => {
    
    describe('provisions', () => {

        let input = new HandstandInput();

        it('extends HandstandConfigurableElement', () => {
            expect(input instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a template property', () => {
            expect(input.template).to.equal('<input></input>');
        });

        it('provides a handler to delegate model property changes', () => {
            expect(typeof input.onSetHandler).to.equal('function');
        });

        it('provides a way to dismantle monitoring', () => {
            expect(typeof input.stopMonitoring).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('events', () => {

            let input = new HandstandInput();

            it('should have a way to handle onSet events', () => {
                input.input = {};
                expect(input.onSetHandler('anything','something', input.model)).not.to.throw;
            });

        });

        describe('lifecycle', () => {
           
            let input;

            beforeEach(() => {
                input = new HandstandInput();
            });

            afterEach(() => {
                input = null;
                input = undefined;
            });

            it('should render with attributes', () => {
                let node = { style: {} }, placeholder = 'word';
                input.childNodes[0] = node;
                input.setAttribute('placeholder', placeholder);
                input.render();
                expect(input.input).to.equal(node);
                expect(input.input.placeholder).to.equal(placeholder);
            });

            it('should render without attributes', () => {
                let node = { style: {} };
                input.childNodes[0] = node;
                expect(input.render()).not.to.throw;
            });

        });

    });

});