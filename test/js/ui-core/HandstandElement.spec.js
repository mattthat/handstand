require('../../ui-core_harness');

describe('HandstandElement', () => {

    describe('provisions', () => {

        let element = new HandstandElement();

        it('extends HandstandSlimIntegration', () => {
            expect(element instanceof HandstandSlimIntegration).to.equal(true)
        });

        it('provides an id property', () => {
            let id = 'test-id';
            element.id = id;
            expect(element.id).to.equal(id);
        });

    });

    describe('methods', () => {

        let element = new HandstandElement();

        describe('handler', () => {

            it('should handle things', () => {
                var method = function(something) { return 'a'; };
                var wrapper = function(anything) { method(anything); };
                expect(element.handler(method)()).to.equal(wrapper());
            });

        });

        describe('on', () => {

            it('should handle whatever', () => {
                let handleIt = () => {},
                spy = sinon.spy(element, 'addEventListener');
                element.on('whatever', handleIt);
                expect(spy.called).to.equal(true);
                element.addEventListener.restore();
            });

        });

        describe('off', () => {

            it('should stop handling whatever', () => {
                let handleIt = () => {},
                spy = sinon.spy(element, 'removeEventListener');
                element.off('whatever', handleIt);
                expect(spy.called).to.equal(true);
                element.removeEventListener.restore();
            });

        });

        describe('trigger', () => {

            it('should handle whatever, right now', () => {
                let it = false, handleIt = () => { it = true },
                spy = sinon.spy(element, 'dispatchEvent');
                element.on('whatever', handleIt);
                element.trigger('whatever');
                expect(spy.called).to.equal(true);
                expect(it).to.equal(true);
            });

        });

    });

});