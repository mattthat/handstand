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

        it('provides a way to destroy innerHTML', () => {
            expect(typeof element.destroyInnerHTML).to.equal('function');
        });

        it('provides a way to change color', () => {
            expect(typeof element.changeColor).to.equal('function');
        });

        it('provides a way to change text', () => {
            expect(typeof element.changeText).to.equal('function');
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

        it('should destroy innerHTML', () => {
            let html = '<div>foo</div>';
            element.innerHTML = html;
            expect(element.innerHTML).to.equal(html);
            element.destroyInnerHTML();
            expect(element.innerHTML).not.to.equal(html);
            expect(element.innerHTML).to.equal('');

        });

        it('should change color', () => {
            let color = 'blue';
            expect(element.style.color).not.to.equal(color);
            element.changeColor(color);
            expect(element.style.color).to.equal(color);
        });

        it('should change text', () => {
            let text = 'foo';
            expect(element.text).not.to.equal(text);
            element.changeText(text);
            expect(element.text).to.equal(text);
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