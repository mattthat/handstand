require('../harness');

let mockDocumentQuerySelector = require('../mocks/mockDocumentQuerySelector');

let HandstandEventManager = require(path.join(__dirname, '../../src/js',
    'handstand-eventmanager'));

describe('HandstandEventManager', () => {

    describe('provisions', () => {

        it('provides a way to handle events', () => {
            expect(typeof HandstandEventManager.handler).to.equal('function');
        });

        it('provides a way to clear events', () => {
            expect(typeof HandstandEventManager.clear).to.equal('function');
        });

        it('provides a way to listen to events', () => {
            expect(typeof HandstandEventManager.listen).to.equal('function');
        });

        it('provides a way to execute code after everything has been loaded', () => {
            expect(typeof HandstandEventManager.onReady).to.equal('function');
        });

        it('provides a way to execute code after a DOM reflow', () => {
            expect(typeof HandstandEventManager.afterReflow).to.equal('function');
        });

    });

    describe('methods', () => {

        it('should delegate handled events to argument methods', () => {
            let x;
            let o = { test: function() { x = 'test 123'; } };
            let spy = sinon.spy(o, 'test');
            HandstandEventManager.handler(o.test)();
            expect(spy.called).to.equal(true);
            expect(x).to.equal('test 123');
            o.test.restore();
        });

        it('should make elements listen for things', () => {
            let element = new Handstand();
            let test = 'test 123';
            element.setAttribute('id', 'anything');
            let mockChanger = function() { element.model.Set('value', test); };
            mockDocumentQuerySelector((selector) => {
                if (selector === '#' + element.getAttribute('id')) return element;
            },
            () => {
                HandstandEventManager.listen('#' + element.getAttribute('id'), 'change', mockChanger);
                expect(element.model.Get('value')).not.to.equal(test);
                element.trigger('change');
                expect(element.model.Get('value')).to.equal(test);
            });
        });

        it('should make elements listen for things - positive', () => {
            let element = new Handstand();
            let test = 'test 123';
            element.setAttribute('id', 'anything');
            let mockChanger = function() { element.model.Set('value', test); };
            mockDocumentQuerySelector((selector) => {
                if (selector === '#' + element.getAttribute('id')) return element;
            },
            () => {
                HandstandEventManager.listen('#' + element.getAttribute('id'), 'change', mockChanger);
                expect(element.model.Get('value')).not.to.equal(test);
                element.trigger('change');
                expect(element.model.Get('value')).to.equal(test);
            });
        });

        it('should make elements listen for things - negative', () => {
            expect(HandstandEventManager.listen(null, 'anything', null)).not.to.throw;
        });

        it('should make elements start and stop listening when told', () => {
            let element = new Handstand();
            let test = 'test 123';
            element.setAttribute('id', 'anything');
            let mockChanger = function() { element.model.Set('value', test); };
            mockDocumentQuerySelector((selector) => {
                if (selector === '#' + element.getAttribute('id')) return element;
            },
            () => {
                HandstandEventManager.listen('#' + element.getAttribute('id'), 'change', mockChanger);
                expect(element.model.Get('value')).not.to.equal(test);
                element.trigger('change');
                expect(element.model.Get('value')).to.equal(test);
                HandstandEventManager.clear('#' + element.getAttribute('id'), 'change', mockChanger);
                element.model.Set('value', 'draft');
                expect(element.model.Get('value')).not.to.equal(test);
                element.trigger('change');
                expect(element.model.Get('value')).to.equal('draft');
                HandstandEventManager.listen('#' + element.getAttribute('id'), 'change', mockChanger);
                element.trigger('change');
                expect(element.model.Get('value')).to.equal(test);
            });

        });

    });

    it('should not execute code if not supplied after everything has been loaded', () => {
        let x = 'initial';
        let method = function() { x = 'called'; };
        HandstandEventManager.onReady();
        document.onreadystatechange();
        expect(x).to.equal('initial');
    });

    it('should execute code supplied after everything has been loaded', () => {
        let x = 'initial';
        let method = function() { x = 'called'; };
        let clock = sinon.useFakeTimers();
        document.readyState = "complete";
        HandstandEventManager.onReady(method);
        document.onreadystatechange();
        clock.tick(1000);
        expect(x).to.equal('called');
    });

});