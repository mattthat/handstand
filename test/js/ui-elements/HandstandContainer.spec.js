require('../../ui-core_harness');

let HandstandContainer = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandContainer'));

describe('HandstandContainer', () => {
    
    describe('provisions', () => {

        let container = new HandstandContainer();

        it('extends HandstandConfigurableElement', () => {
            expect(container instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a state property', () => {
            expect(container.state).to.equal('opened');
        });

    });

    describe('methods', () => {

        it('should provide its contents', () => {
            let parent = new HandstandContainer({ id: 'contents-test-parent' });
            expect(parent.contents().length).to.equal(0);

            let child = new HandstandContainer({ id: 'contents-test-child' });
            parent.children.push( 'junk' ); // should not be counted
            parent.children.push( child );
            expect(parent.contents().length).to.equal(1);
        });

        it('should open with onOpen defined', () => {
            let x = 0, container = new HandstandContainer({
                id: 'open-test'
            }, {
                onOpen: () => { x = 1 }
            });
            container.open();
            expect(container.state).to.equal('opened');
            expect(x).to.equal(1);
        });

        it('should open without onOpen defined', () => {
            let container = new HandstandContainer({
                id: 'open-test'
            });
            container.open();
            expect(container.state).to.equal('opened');
        });

        it('should close with onClose defined', () => {
            let x = 0, container = new HandstandContainer({
                id: 'close-test'
            }, {
                onClose: () => { x = 1 }
            });
            container.close();
            expect(container.state).to.equal('closed');
            expect(x).to.equal(1);
        });

        it('should close without onClose defined', () => {
            let container = new HandstandContainer({
                id: 'close-test'
            });
            container.close();
            expect(container.state).to.equal('closed');
        });

        it('should open, then close, then open again', () => {
            let container = new HandstandContainer({
                id: 'many-test'
            });
            container.open();
            expect(container.state).to.equal('opened');
            container.close();
            expect(container.state).to.equal('closed');
            container.open();
            expect(container.state).to.equal('opened');
        });

    });

});