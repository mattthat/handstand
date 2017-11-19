require('../../harness');

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

        it('provides a way to fade out', () => {
            expect(typeof element.fadeOut).to.equal('function');
        });

        it('provides a way to fade in', () => {
            expect(typeof element.fadeIn).to.equal('function');
        });

    });

    describe('methods', () => {

        let element = new HandstandElement();

        it('should handle things', () => {
            var method = function(something) { return 'a'; };
            var wrapper = function(anything) { method(anything); };
            expect(element.handler(method)()).to.equal(wrapper());
        });

        it('should fade out', () => {
            let clock = sinon.useFakeTimers();
            expect(element.style.opacity).not.to.equal(0);
            element.fadeOut();
            clock.tick(1000);
            expect(element.style.opacity).to.equal(0);
        });

        it('should fade in', () => {
            let clock = sinon.useFakeTimers();
            expect(element.style.opacity).not.to.equal(1);
            element.fadeIn();
            clock.tick(1000);
            expect(element.style.opacity).to.equal(1);
        });

    });

});