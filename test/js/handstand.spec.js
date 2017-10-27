require('../harness');

describe('Handstand', () => {

    describe('provisions', () => {

        let handstand = new Handstand();

        it('extends HandstandConfigurableElement', () => {
            expect(handstand instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('overrides the handler to delegate low-level/foundational configuration', () => {
            expect(typeof handstand.onConfiguration).to.equal('function');
        });

        it('overrides the onBeforeRender event', () => {
            expect(typeof handstand.onBeforeRender).to.equal('function');
        });

        it('overrides the onAfterRender event', () => {
            expect(typeof handstand.onAfterRender).to.equal('function');
        });

        it('overrides the way to do the "setUp" lifecycle phase', () => {
            expect(typeof handstand.setUp).to.equal('function');
        });

        it('provides defaults', () => {
            expect(typeof handstand.defaults).to.equal('function');
        });

        it('overrides the way to do the "buildUp" lifecycle phase', () => {
            expect(typeof handstand.buildUp).to.equal('function');
        });

        it('overrides the way to do the "ripDown" lifecycle phase', () => {
            expect(typeof handstand.ripDown).to.equal('function');
        });

        it('provides a way to configure monitoring', () => {
            expect(typeof handstand.configureMonitoring).to.equal('function');
        });

        it('provides a way to configure two-way', () => {
            expect(typeof handstand.configureTwoway).to.equal('function');
        });

        it('provides a handler to delegate model property changes', () => {
            expect(typeof handstand.onSetHandler).to.equal('function');
        });

        it('provides an event for when the "value" model property changes', () => {
            expect(typeof handstand.onChange).to.equal('function');
        });

        it('provides a way to dismantle monitoring', () => {
            expect(typeof handstand.stopMonitoring).to.equal('function');
        });

    });

    describe('events', () => {

        let handstand = new Handstand();

        it('should handle onChange events by setting "value" model property', () => {
            let targetValue = 'test';
            handstand.onChange( { target: { value: targetValue } });
            expect(handstand.model.Get('value')).to.equal(targetValue);
        });

        it('should have a stub to handle onSet events', () => {
            expect(handstand.onSetHandler()).not.to.throw;
        });

    });

    describe('methods', () => {

        describe('lifecycle', () => {

            let handstand, obrSpy, setupSpy, oarSpy;

            beforeEach(() => {
                obrSpy = sinon.spy(Handstand.prototype, 'onBeforeRender');
                oarSpy = sinon.spy(Handstand.prototype,'onAfterRender');
                setupSpy = sinon.spy(Handstand.prototype, 'setUp');
                defaultsSpy = sinon.spy(Handstand.prototype, 'defaults');
                handstand = new Handstand();
            });

            afterEach(() => {
                Handstand.prototype.onBeforeRender.restore();
                Handstand.prototype.onAfterRender.restore();
                Handstand.prototype.setUp.restore();
                Handstand.prototype.defaults.restore();
                handstand = null;
                handstand = undefined;
                obrSpy = null;
                obrSpy = undefined;
                oarSpy = null;
                oarSpy = undefined;
                setupSpy = null;
                setupSpy = undefined;
                defaultsSpy = null;
                defaultsSpy = undefined;
            });

            it('should instantiate, firing overriding onBeforeRender handler', () => {
                expect(obrSpy.called).to.equal(true);
            });

            it('should before render be default, have a handstand model, and enter the setUp lifecycle phase', () => {
                expect(defaultsSpy.called).to.equal(true);
                expect(handstand.model instanceof HandstandModel).to.equal(true);
                expect(setupSpy.called).to.equal(true);
            });

            it('should configure, firing overriding onConfiguration handler', () => {
                let relSpy = sinon.spy(handstand,'relationships'),
                floatSpy = sinon.spy(handstand,'floating'),
                posSpy = sinon.spy(handstand,'positioning'),
                boundSpy = sinon.spy(handstand,'bounding'),
                paddSpy = sinon.spy(handstand,'padding'),
                bordSpy = sinon.spy(handstand,'bordering'),
                fontSpy = sinon.spy(handstand,'fonting'),
                colorSpy = sinon.spy(handstand,'coloring'),
                textSpy = sinon.spy(handstand,'texting');
                handstand.configure();
                expect(relSpy.called).to.equal(true);
                expect(floatSpy.called).to.equal(true);
                expect(posSpy.called).to.equal(true);
                expect(boundSpy.called).to.equal(true);
                expect(paddSpy.called).to.equal(true);
                expect(bordSpy.called).to.equal(true);
                expect(fontSpy.called).to.equal(true);
                expect(colorSpy.called).to.equal(true);
                expect(textSpy.called).to.equal(true);
                handstand.relationships.restore();
                handstand.floating.restore();
                handstand.positioning.restore();
                handstand.bounding.restore();
                handstand.padding.restore();
                handstand.bordering.restore();
                handstand.fonting.restore();
                handstand.coloring.restore();
                handstand.texting.restore();
            });

            it('should render, firing overriding onAfterRender handler', () => {
                handstand.render();
                expect(oarSpy.called).to.equal(true);
            });

            it('should after render, configure monitoring, configure twoway, and enter the buildUp lifecycle phase', () => {
                let monitoringSpy = sinon.spy(handstand.configureMonitoring);
                let twowaySpy = sinon.spy(handstand.configureTwoway);
                let buildSpy = sinon.spy(handstand.buildUp);
                handstand.render();
                expect(monitoringSpy.called);
                expect(twowaySpy.called);
                expect(buildSpy.called);
            });

            it('should provide a way to handle being removed from DOM, firing ripDown', () => {
                expect(handstand.ripDown()).not.to.throw;
            });

            it('should ripDown with monitoring', () => {
                let spy = sinon.spy(handstand, 'stopMonitoring');
                handstand.monitoring = true;
                handstand.ripDown();
                expect(spy.called).to.equal(true);
                handstand.stopMonitoring.restore();
            });

        });

        describe('monitoring', () => {

            let handstand = new Handstand();

            it('should interrogate configured html attributes and set monitoring off', () => {
                handstand.configureMonitoring();
                expect(handstand.monitoring).to.equal(false);
            });

            it('should interrogate configured html attributes and set monitoring on', () => {
                handstand.setAttribute('monitor', 'true');
                handstand.configureMonitoring();
                expect(handstand.monitoring).to.equal(true);
            });

            it('should stop monitoring when told', () => {
                let spy = sinon.spy(HandstandEventManager.clear);
                handstand.stopMonitoring();
                expect(spy.called);
            });

        });

        describe('two-way', () => {

            let handstand = new Handstand();

            it('should interrogate configured html attributes and set twoway off', () => {
                handstand.configureTwoway();
                expect(handstand.twoway).to.equal(false);
            });

            it('should interrogate configured html attributes and set twoway on', () => {
                handstand.setAttribute('twoway', 'true');
                handstand.configureTwoway();
                expect(handstand.twoway).to.equal(true);
            });

        });

    });

});