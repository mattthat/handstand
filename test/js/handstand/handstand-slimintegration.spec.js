require('../../harness');

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

        it('overrides Slim.js onBeforeRender event', () => {
            expect(typeof integrationObject.onBeforeRender).to.equal('function');
        });

        it('overrides Slim.js onAfterRender event', () => {
            expect(typeof integrationObject.onAfterRender).to.equal('function');
        });

        it('overrides Slim.js onRemoved event', () => {
            expect(typeof integrationObject.onRemoved).to.equal('function');
        });

        it('provides a way to do low-level/foundational configuration', () => {
            expect(typeof integrationObject.configure).to.equal('function');
        });

        it('provides a lifecycle with a phase to set up the experience', () => {
            expect(typeof integrationObject.setUp).to.equal('function');
        });

        it('provides a lifecycle with a phase to build up the experience', () => {
            expect(typeof integrationObject.buildUp).to.equal('function');
        });

        it('provides a lifecycle with a phase to rip down the experience', () => {
            expect(typeof integrationObject.ripDown).to.equal('function');
        });

    });

    describe('events', () => {
        
        describe('onBeforeCreated event', () => {
            
            let integrationObject = new HandstandSlimIntegration();
            
            it('when fired, does not throw an exception', () => {
                expect(integrationObject.onBeforeCreated()).not.to.throw;
            });

        });

        describe('onCreated event', () => {

            let integrationObject = new HandstandSlimIntegration();

            it('when fired, configures the object', () => {
                let spy = sinon.spy(integrationObject, 'configure');
                integrationObject.onCreated();
                expect(spy.called);
            });

        });

        describe('onBeforeRender event', () => {

            let integrationObject = new HandstandSlimIntegration();

            it('when fired, starts the lifecycle phase where the experience is setup', () => {
                let spy = sinon.spy(integrationObject, 'setUp');
                integrationObject.onBeforeRender();
                expect(spy.called);
            });

        });

        describe('onAfterRender event', () => {

            let integrationObject = new HandstandSlimIntegration();

            it('when fired, starts the lifecycle phase where the experience is built up', () => {
                let spy = sinon.spy(integrationObject, 'buildUp');
                integrationObject.onAfterRender();
                expect(spy.called);
            });

        });

        describe('onAdded event', () => {
            
            let integrationObject = new HandstandSlimIntegration();
            
            it('when fired, does not throw an exception', () => {
                expect(integrationObject.onAdded()).not.to.throw;
            });

        });

        describe('onBeforeUpdate event', () => {
            
            let integrationObject = new HandstandSlimIntegration();
            
            it('when fired, does not throw an exception', () => {
                expect(integrationObject.onBeforeUpdate()).not.to.throw;
            });

        });

        describe('onAfterUpdate event', () => {
            
            let integrationObject = new HandstandSlimIntegration();
            
            it('when fired, does not throw an exception', () => {
                expect(integrationObject.onAfterUpdate()).not.to.throw;
            });

        });

        describe('onRemoved event', () => {

            let integrationObject = new HandstandSlimIntegration();

            it('when fired, starts the lifecycle phase where the experience is ripped down', () => {
                let spy = sinon.spy(integrationObject, 'ripDown');
                integrationObject.onRemoved();
                expect(spy.called);
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