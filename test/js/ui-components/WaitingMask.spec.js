require('../../ui-core_harness');

global.HandstandMask = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandMask.js'));

let WaitingMask = require(path.join(__dirname, '../../../src/js/ui-components',
    'WaitingMask.js'));

describe('WaitingMask', () => {

    describe('provisions', () => {

        let component = new WaitingMask();

        it('extends HandstandConfigurableElement', () => {
            expect(component instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('should provide a template property', () => {
            expect(component.template).to.equal('<div />')
        });

        it('should provide a way to hide', () => {
            expect(typeof component.hide).to.equal('function');
        });

        it('should provide a way to show', () => {
            expect(typeof component.show).to.equal('function');
        });

    });

    describe('methods', () => {

        let component = new WaitingMask();

        it('should hide', () => {
            component.onCreated();
            let spy = sinon.spy(component.mask, 'hide');
            component.hide();
            expect(spy.called).to.equal(true);
        });

        it('should show', () => {
            component.onCreated();
            let spy = sinon.spy(component.mask, 'show');
            component.show();
            expect(spy.called).to.equal(true);
        });

    });

});