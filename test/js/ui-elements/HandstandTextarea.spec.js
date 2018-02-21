require('../../ui-core_harness');

let HandstandTextarea = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandTextarea.js'));

describe('HandstandTextarea', () => {

    describe('provisions', () => {
        
        let element = new HandstandTextarea();

        it('extends HandstandConfigurableElement', () => {
            expect(element instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a template property', () => {
            expect(element.template).to.equal('<textarea></textarea>');
        });

        it('provides a textarea property', () => {
            expect(element.textarea).not.to.equal(undefined);
        });

        it('provides a handler to delegate model property changes', () => {
            expect(typeof element.onSetHandler).to.equal('function');
        });

        it('provides an event for when the "value" model property changes', () => {
            expect(typeof element.onChange).to.equal('function');
        });

        it('provides a value property', () => {
            expect(element.value).to.equal('');
        });
    });

    describe('properties', () => {

        describe('value', () => {

            it('should meet initial and causal expectations', () => {
                let initial = 'test123',
                causal = 'test456',
                element = new HandstandTextarea({}, { value: initial });
                expect(element.value).to.equal(initial);
                element.value = causal;
                expect(element.value).to.equal(causal);
            });

        });

    });

    describe('methods', () => {

        describe('events', () => {

            let element = new HandstandTextarea();

            it('should handle onChange events by setting "value" model property', () => {
                let expectations = 'some user defined text';
                element.textarea = { value: expectations };
                element.onChange();
                expect(element.model.Get('value')).to.equal(expectations);
            });

        });

        describe('lifecycle', () => {

            let element, expectations = 'test123';

            beforeEach(() => {
                element = new HandstandTextarea({}, { value: expectations });
                element.childNodes[0] = {};
            });

            afterEach(() => {
                element = null;
                element = undefined;
            });

            it('should render', () => {
                element.render();
                expect(element.textarea.value).to.equal(expectations);
                expect(element.value).to.equal(expectations);
            });

        });

    });

});