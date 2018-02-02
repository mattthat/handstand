require('../../ui-core_harness');

describe('HandstandSlimIntegration', () => {

    describe('provisions', () => {

        let integrationObject = new HandstandSlimIntegration();

        it('extends Slim.js', () => {
            expect(integrationObject instanceof Slim).to.equal(true)
        });

        it('overrides Slim.js "template" property getter', () => {
            expect(typeof integrationObject.template).to.equal('string');
        });

        it('overrides Slim.js onCreated event', () => {
            expect(typeof integrationObject.onCreated).to.equal('function');
        });

        it('overrides Slim.js onRender event', () => {
            expect(typeof integrationObject.onRender).to.equal('function');
        });

        it('overrides Slim.js onRemoved event', () => {
            expect(typeof integrationObject.onRemoved).to.equal('function');
        });

        it('provides a way to do low-level/foundational configuration', () => {
            expect(typeof integrationObject.configure).to.equal('function');
        });

    });

    describe('events', () => {

        describe('onCreated event', () => {

            let integrationObject = new HandstandSlimIntegration();

            it('when fired, configures the object', () => {
                let spy = sinon.spy(integrationObject, 'configure');
                integrationObject.onCreated();
                expect(spy.called);
            });

        });

        describe('onAdded event', () => {
            
            let integrationObject = new HandstandSlimIntegration();
            
            it('when fired, does not throw an exception', () => {
                expect(integrationObject.onAdded()).not.to.throw;
            });

        });

        describe('onRemoved event', () => {

            let integrationObject = new HandstandSlimIntegration();

            it('when fired, does not throw an exception', () => {
                expect(integrationObject.onRemoved()).not.to.throw;
            });

        });

    });

    describe('methods', () => {

        let integrationObject = new HandstandSlimIntegration();

        it('should configure', () => {
            expect(integrationObject.configure()).not.to.throw;
        });

    });

});