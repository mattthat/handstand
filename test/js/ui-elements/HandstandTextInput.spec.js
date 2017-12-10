require('../../ui-core_harness');

let HandstandTextInput = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandTextInput.js'));

describe('HandstandTextInput', () => {

    describe('provisions', () => {
        
        let textinput = new HandstandTextInput();

        it('extends HandstandConfigurableElement', () => {
            expect(textinput instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a way to do the "inputBuildUp" lifecycle phase', () => {
            expect(typeof textinput.inputBuildUp).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('lifecycle', () => {

            let textinput;

            beforeEach(() => {
                textinput = new HandstandTextInput();
                textinput.childNodes[0] = {};
                textinput.setUp();
            });

            afterEach(() => {
                textinput = null;
                textinput = undefined;
            });

            it('should inputBuildUp', () => {
                textinput.buildUp();
                expect(textinput.input.type).to.equal('text');
            });

        });

        describe('monitoring', () => {

            let textinput = new HandstandTextInput();
            textinput.setAttribute('id', 'textinput-monitoring-tests');

            it('should interrogate configured html attributes and set monitoring off', () => {
                textinput.configureMonitoring();
                expect(textinput.monitoring).to.equal(false);
            });

            it('should interrogate configured html attributes and set monitoring on', () => {
                let spy = sinon.spy(textinput, 'on');
                textinput.setAttribute('monitor', 'true');
                textinput.configureMonitoring();
                expect(textinput.monitoring).to.equal(true);
                expect(spy.called).to.equal(true);
                textinput.on.restore();
            });

            it('should stop monitoring when told', () => {
                let spy = sinon.spy(textinput, 'off');
                textinput.stopMonitoring();
                expect(spy.called).to.equal(true);
                expect(textinput.monitoring).to.equal(false);
                textinput.off.restore();
            });

        });

    });

});