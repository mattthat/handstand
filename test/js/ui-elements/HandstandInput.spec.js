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

    });

});