require('../../ui-core_harness');

let HandstandTextInput = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandTextInput.js'));

describe('HandstandTextInput', () => {

    describe('provisions', () => {
        
        let element = new HandstandTextInput();

        it('extends HandstandConfigurableElement', () => {
            expect(element instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('extends HandstandInput', () => {
            expect(element instanceof HandstandInput).to.equal(true);
        });

        it('provides a way to configure monitoring', () => {
            expect(typeof element.configureMonitoring).to.equal('function');
        });
    });

    describe('methods', () => {

        describe('lifecycle', () => {

            let element;

            beforeEach(() => {
                element = new HandstandTextInput();
                element.childNodes[0] = {};
            });

            afterEach(() => {
                element = null;
                element = undefined;
            });

            it('should render', () => {
                element.render();
                expect(element.input.type).to.equal('text');
            });

        });

        describe('monitoring', () => {

            let element = new HandstandTextInput();
            element.setAttribute('id', 'element-monitoring-tests');

            it('should interrogate configured html attributes and set monitoring off', () => {
                element.setAttribute('monitor', 'false');
                element.configureMonitoring();
                expect(element.monitoring).to.equal(false);
            });

            it('should interrogate configured html attributes and set monitoring on', () => {
                let spy = sinon.spy(element, 'on');
                element.setAttribute('monitor', 'true');
                element.configureMonitoring();
                expect(element.monitoring).to.equal(true);
                expect(spy.called).to.equal(true);
                element.on.restore();
            });

            it('should stop monitoring when told', () => {
                let spy = sinon.spy(element, 'off');
                element.stopMonitoring();
                expect(spy.called).to.equal(true);
                expect(element.monitoring).to.equal(false);
                element.off.restore();
            });

        });

    });

});