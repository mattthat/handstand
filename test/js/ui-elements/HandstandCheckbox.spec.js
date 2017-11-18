require('../../harness');

let HandstandCheckbox = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandCheckbox.js'));

describe('HandstandCheckbox', () => {

    describe('provisions', () => {

        let checkbox = new HandstandCheckbox();

        it('extends Handstand', () => {
            expect(checkbox instanceof Handstand).to.equal(true);
        });

        it('provide a way to do an input-specific buildUp', () => {
            expect(typeof checkbox.inputBuildUp).to.equal('function');
        });

        it('overrides the way to configure monitoring', () => {
            expect(typeof checkbox.configureMonitoring).to.equal('function');
        });

        it('overrides the way to configure two-way', () => {
            expect(typeof checkbox.configureTwoway).to.equal('function');
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

        it('provides a way to dismantle monitoring', () => {
            expect(typeof checkbox.stopMonitoring).to.equal('function');
        });

        it('provides a way to do the "ripDown" lifecycle phase', () => {
            expect(typeof checkbox.ripDown).to.equal('function');
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

             afterEach(() => {
                 checkbox = null;
                 checkbox = undefined;
             });

             it('should inputBuildUp', () => {
                  checkbox.inputBuildUp();
                  expect(checkbox.input.type).to.equal('checkbox');
                  expect(checkbox.input.checked).to.equal(false);
                  expect(checkbox.model.Get('value')).to.equal(false);
             });
         
         });

         describe('monitoring', () => {

             let checkbox = new HandstandCheckbox();
             checkbox.setAttribute('id', 'checkbox-monitoring-tests');

             it('should interrogate configured html attributes and set monitoring off', () => {
                 checkbox.configureMonitoring();
                 expect(checkbox.monitoring).to.equal(false);
             });

             it('should interrogate configured html attributes and set monitoring on', () => {
                 let spy = sinon.spy(checkbox, 'on');
                 checkbox.setAttribute('monitor', 'true');
                 checkbox.configureMonitoring();
                 expect(checkbox.monitoring).to.equal(true);
                 expect(spy.called).to.equal(true);
                 checkbox.on.restore();
             });

             it('should stop monitoring when told', () => {
                 let spy = sinon.spy(checkbox, 'off');
                 checkbox.stopMonitoring();
                 expect(spy.called).to.equal(true);
                 expect(checkbox.monitoring).to.equal(false);
                 checkbox.off.restore();
             });

         });

         describe('two-way', () => {

             let checkbox = new HandstandCheckbox();
             checkbox.setAttribute('id', 'checkbox-twoway-tests');

             it('should interrogate configured html attributes and set twoway off', () => {
                 checkbox.configureTwoway();
                 expect(checkbox.twoway).to.equal(false);
             });

             it('should interrogate configured html attributes and set twoway on', () => {
                 let spy = sinon.spy(checkbox.model, 'onSet');
                 checkbox.setAttribute('twoway', 'true');
                 checkbox.configureTwoway();
                 expect(checkbox.twoway).to.equal(true);
                 expect(spy.called).to.equal(true);
                 checkbox.model.onSet.restore();
             });

         });

    });

});