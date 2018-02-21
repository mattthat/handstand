require('../../ui-core_harness');

let HandstandInput = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandInput.js'));

describe('HandstandInput', () => {
    
    describe('provisions', () => {

        let element = new HandstandInput();

        it('extends HandstandConfigurableElement', () => {
            expect(element instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a template property', () => {
            expect(element.template).to.equal('<input></input>');
        });

        it('provides an input property', () => {
            expect(element.input).not.to.equal(undefined);
        })

        it('provides a handler to delegate model property changes', () => {
            expect(typeof element.onSetHandler).to.equal('function');
        });

        it('provides a way to dismantle monitoring', () => {
            expect(typeof element.stopMonitoring).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('events', () => {

            let element = new HandstandInput();

            it('should have a way to handle onSet events', () => {
                expect(element.onSetHandler('anything','something', element.model)).not.to.throw;
            });

        });

        describe('lifecycle', () => {
           
            let element, expectations = 'test123';

            beforeEach(() => {
                element = new HandstandInput({}, { value: expectations });
                element.childNodes[0] = {};
            });

            afterEach(() => {
                element = null;
                element = undefined;
            });

            it('should render', () => {
                element.render();
                expect(element.model.Get('value')).to.equal(expectations);
            });

            it('should render with attributes', () => {
                let node = { style: {} }, placeholder = 'word';
                element.childNodes[0] = node;
                element.setAttribute('placeholder', placeholder);
                element.render();
                expect(element.input).to.equal(node);
                expect(element.input.placeholder).to.equal(placeholder);
            });

            it('should render without attributes', () => {
                let node = { style: {} };
                element.childNodes[0] = node;
                expect(element.render()).not.to.throw;
            });

        });

    });

});