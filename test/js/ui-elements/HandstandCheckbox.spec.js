require('../../ui-core_harness');

let HandstandCheckbox = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandCheckbox.js'));

describe('HandstandCheckbox', () => {

    describe('provisions', () => {

        let checkbox = new HandstandCheckbox();

        it('extends HandstandConfigurableElement', () => {
            expect(checkbox instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('extends HandstandInput', () => {
            expect(checkbox instanceof HandstandInput).to.equal(true);
        });

        it('provides a way to determine if the checkbox is checked', () => {
            expect(typeof checkbox.isChecked).to.equal('function');
        });

        it('provides a handler to delegate model property changes', () => {
            expect(typeof checkbox.onSetHandler).to.equal('function');
        });

        it('provides an event for when the "value" model property changes', () => {
            expect(typeof checkbox.onChange).to.equal('function');
        });

    });

    describe('methods', () => {

        it('should be able to determine if checkbox is checked', () => {
            let checkbox = new HandstandCheckbox();
            expect(checkbox.isChecked()).to.equal(false);
            checkbox.input = { checked: true };
            expect(checkbox.isChecked()).to.equal(true);
        });

        describe('events', () => {

            let checkbox = new HandstandCheckbox();

            it('should handle onChange events by setting "value" model property', () => {
                let spy = sinon.spy(checkbox,'isChecked');
                checkbox.onChange();
                expect(spy.called).to.equal(true);
                checkbox.isChecked.restore();
            });

            it('should have a stub to handle onSet events', () => {
                checkbox.input = { checked: true };
                expect(checkbox.onSetHandler(null, null, checkbox.model)).not.to.throw;
            });

        });

        describe('lifecycle', () => {

             let checkbox;

             beforeEach(() => {
                 checkbox = new HandstandCheckbox();
                 checkbox.input = {
                     type: 'checkbox',
                     checked: false
                 };
             });

             it('should render', () => {
                 checkbox.childNodes[0] = { type: 'checkbox', checked: false };
                 checkbox.render();
                 expect(checkbox.input.type).to.equal('checkbox');
                 expect(checkbox.input.checked).to.equal(false);
                 expect(checkbox.model.Get('value')).to.equal(false);
             });
         
         });

    });

});