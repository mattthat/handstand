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

        it('should handle things', () => {
            var method = function(something) { return 'a'; };
            var wrapper = function(anything) { method(anything); };
            expect(element.handler(method)()).to.equal(wrapper());
        });

    });

});