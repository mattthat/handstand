require('../../ui-core_harness');

let HandstandMask = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandMask'));

describe('HandstandMask', () => {
    
    describe('provisions', () => {

        let element = new HandstandMask();

        it('extends HandstandConfigurableElement', () => {
            expect(element instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a state property', () => {
            expect(element.state).to.equal('hidden');
        });

    });

    describe('methods', () => {

        let element;

        it('should construct without arguments', () => {
            expect(new HandstandMask()).not.to.throw;
        });
        
        it('construct with a selector', () => {
            let selector = 'body';
            element = new HandstandMask({}, { selector: selector });
            expect(element.selector).to.equal(selector);
            expect(element.masked).not.to.equal(null);
        });

        it('construct with events', () => {
            let obscure = () => { }, reveal = () => { };
            element = new HandstandMask({}, {
                events: {
                    onShow: reveal,
                    onHide: obscure
                }
            });
            expect(element.onShow).to.equal(reveal);
            expect(element.onHide).to.equal(obscure);
        });

        it('should hide', () => {
            let hidden = false, obscure = () => { hidden = true };
            element = new HandstandMask({}, {
                events: {
                    onHide: obscure
                }
            });
            expect(element.hide()).to.equal(element)
            expect(hidden).to.equal(true);
            expect(element.style.display).to.equal('none');
            expect(element.state).to.equal('hidden');
        });

        it('should show', () => {
            let hidden = true, reveal = () => { hidden = false };
            element = new HandstandMask({}, {
                events: {
                    onShow: reveal
                }
            });
            expect(element.show()).to.equal(element);
            expect(hidden).to.equal(false);
            expect(element.style.display).to.equal('block');
            expect(element.state).to.equal('shown');
        });

    });

});