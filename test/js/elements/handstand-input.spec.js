require('../../harness');

let HandstandInput = require(path.join(__dirname, '../../../src/js/elements',
    'handstand-input'));

describe('HandstandInput', () => {
    
    describe('provisions', () => {

        let input = new HandstandInput();

        it('extends Handstand', () => {
            expect(input instanceof Handstand).to.equal(true);
        });

        it('provides a template property', () => {
            expect(input.template).to.equal('<input bind></input>');
        });

        it('provides a way to do the "setUp" lifecycle phase', () => {
            expect(typeof input.setUp).to.equal('function');
        });

        it('provides a way to do the "inputSetUp" lifecycle phase', () => {
            expect(typeof input.inputSetUp).to.equal('function');
        });

        it('provides a way to do the "buildUp" lifecycle phase', () => {
            expect(typeof input.buildUp).to.equal('function');
        });
        
        it('provides a way to do the "inputBuildUp" lifecycle phase', () => {
            expect(typeof input.inputBuildUp).to.equal('function');
        });

        it('overrides the way to configure monitoring', () => {
            expect(typeof input.configureMonitoring).to.equal('function');
        });

        it('overrides the way to configure two-way', () => {
            expect(typeof input.configureTwoway).to.equal('function');
        });

        it('provides a handler to delegate model property changes', () => {
            expect(typeof input.onSetHandler).to.equal('function');
        });

        it('provides a way to dismantle monitoring', () => {
            expect(typeof input.stopMonitoring).to.equal('function');
        });

        it('provides a way to do the "ripDown" lifecycle phase', () => {
            expect(typeof input.ripDown).to.equal('function');
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

            it('should setUp', () => {
                let test = 'test-value';
                input.setAttribute('line-height', test);
                let spy = sinon.spy(input, 'inputSetUp');
                input.setUp();
                expect(spy.called).to.equal(true);
                expect(input.style.lineHeight).to.equal(test);
                input.inputSetUp.restore();
            });

            it('should buildUp with attributes', () => {
                let node = { style: {} }, placeholder = 'word',
                fontSize = '1px',
                spy = sinon.spy(input, 'inputBuildUp');
                input.childNodes[0] = node;
                input.setAttribute('placeholder', placeholder);
                input.setAttribute('font-size', fontSize);
                input.buildUp();
                expect(spy.called).to.equal(true);
                expect(input.input).to.equal(node);
                expect(input.input.placeholder).to.equal(placeholder);
                expect(input.input.style.fontSize).to.equal(fontSize);
                input.inputBuildUp.restore();
            });

            it('should buildUp without attributes', () => {
                let node = { style: {} };
                input.childNodes[0] = node;
                input.buildUp();
                expect(input.input.placeholder).to.equal(undefined);
                expect(input.input.style.fontSize).to.equal(undefined);
            });

        });

        describe('monitoring', () => {

            let input = new HandstandInput();
            input.setAttribute('id', 'input-monitoring-tests');

            it('should interrogate configured html attributes and set monitoring off', () => {
                input.configureMonitoring();
                expect(input.monitoring).to.equal(false);
            });

            it('should interrogate configured html attributes and set monitoring on', () => {
                let spy = sinon.spy(HandstandEventManager, 'listen');
                input.setAttribute('monitor', 'true');
                input.configureMonitoring();
                expect(input.monitoring).to.equal(true);
                expect(spy.called).to.equal(true);
                HandstandEventManager.listen.restore();
            });

            it('should stop monitoring when told', () => {
                let spy = sinon.spy(HandstandEventManager, 'clear');
                input.stopMonitoring();
                expect(spy.called).to.equal(true);
                expect(input.monitoring).to.equal(false);
                HandstandEventManager.clear.restore();
            });

        });

        describe('two-way', () => {

            let input = new HandstandInput();
            input.setAttribute('id', 'input-twoway-tests');

            it('should interrogate configured html attributes and set twoway off', () => {
                input.configureTwoway();
                expect(input.twoway).to.equal(false);
            });

            it('should interrogate configured html attributes and set twoway on', () => {
                let spy = sinon.spy(input.model, 'onSet');
                input.setAttribute('twoway', 'true');
                input.configureTwoway();
                expect(input.twoway).to.equal(true);
                expect(spy.called).to.equal(true);
                input.model.onSet.restore();
            });

        });

    });

});