require('../../ui-core_harness');
let mockDocumentQuerySelector = require('../../mocks/mockDocumentQuerySelector');

describe('HandstandConfigurableElement', () => {

    describe('provisions', () => {

        let element = new HandstandConfigurableElement();

        it('extends HandstandElement', () => {
            expect(element instanceof HandstandElement).to.equal(true)
        });

        it('overrides the handler to delegate low-level/foundational configuration', () => {
            expect(typeof element.onConfiguration).to.equal('function');
        });

        it('provides defaults', () => {
            expect(typeof element.defaults).to.equal('function');
        });

        it('provides a way to configure monitoring', () => {
            expect(typeof element.configureMonitoring).to.equal('function');
        });

        it('provides a way to configure two-way', () => {
            expect(typeof element.configureTwoway).to.equal('function');
        });

        it('provides a handler to delegate model property changes', () => {
            expect(typeof element.onSetHandler).to.equal('function');
        });

        it('provides an event for when the "value" model property changes', () => {
            expect(typeof element.onChange).to.equal('function');
        });

        it('provides a way to dismantle monitoring', () => {
            expect(typeof element.stopMonitoring).to.equal('function');
        });

        it('provides a handler to delegate low-level/foundational configuration', () => {
            expect(typeof element.onConfiguration).to.equal('function');
        });

    });

    describe('methods', () => {

        let element;

        beforeEach(() => {
            element = new HandstandConfigurableElement();
        });

        describe('construction', () => {

            it('should accept attributes', () => {
                let id = 'something', cls = 'anything',
                element = new HandstandConfigurableElement({ id: id, class: cls });
                expect(element.getAttribute('id')).to.equal(id);
                expect(element.id).to.equal(id);
                expect(element.getAttribute('class')).to.equal(cls);
            });

        });

        describe('events', () => {

            it('should handle onChange events by setting "value" model property', () => {
                let targetValue = 'test';
                element.onChange( { target: { value: targetValue } });
                expect(element.model.Get('value')).to.equal(targetValue);
            });

            it('should have a stub to handle onSet events', () => {
                expect(element.onSetHandler()).not.to.throw;
            });

        });

        describe('lifecycle', () => {

            let element, renderSpy, setupSpy;

            beforeEach(() => {
                defaultsSpy = sinon.spy(HandstandConfigurableElement.prototype, 'defaults');
                element = new HandstandConfigurableElement();
            });

            afterEach(() => {
                HandstandConfigurableElement.prototype.defaults.restore();
            });

            it('should before render be default, have a handstand model, and enter the setUp lifecycle phase', () => {
                expect(defaultsSpy.called).to.equal(true);
                expect(element.model instanceof HandstandModel).to.equal(true);
            });

            it('should after render, configure monitoring, configure twoway, and enter the buildUp lifecycle phase', () => {
                let monitoringSpy = sinon.spy(element.configureMonitoring);
                let twowaySpy = sinon.spy(element.configureTwoway);
                element.render();
                expect(monitoringSpy.called);
                expect(twowaySpy.called);
            });

        });

        describe('monitoring', () => {

            let element = new HandstandConfigurableElement();
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

        describe('two-way', () => {

            let element = new HandstandConfigurableElement();
            element.setAttribute('id', 'checkbox-twoway-tests');

            it('should interrogate configured html attributes and set twoway off', () => {
                element.setAttribute('twoway', 'false');
                element.configureTwoway();
                expect(element.twoway).to.equal(false);
            });

            it('should interrogate configured html attributes and set twoway on', () => {
                let spy = sinon.spy(element.model, 'onSet');
                element.setAttribute('twoway', 'true');
                element.configureTwoway();
                expect(element.twoway).to.equal(true);
                expect(spy.called).to.equal(true);
                element.model.onSet.restore();
            });

        });

        it('should configure, firing onConfiguration handler', () => {
           let spy = sinon.spy(element.onConfiguration);
           element.configure();
           expect(spy.called);
        });

    });

});