require('../../ui-core_harness');

let HandstandSwitch = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandSwitch.js'));

describe('HandstandSwitch', () => {
    
    describe('provisions', () => {

        let switchEl = new HandstandSwitch();

        it('extends HandstandConfigurableElement', () => {
            expect(switchEl instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a template property', () => {
            let ident = HandstandSwitch.unique,
            template = '<div><input name="' + ident 
            + '" id="' + ident + 
            '" type="checkbox" checked><label for="' + ident + '"></label></div>';
            expect(switchEl.template).to.equal(template);
        });

        it('provides a way to determine if the checkbox is checked', () => {
            expect(typeof switchEl.isSwitched).to.equal('function');
        });

        it('provides a handler to delegate model property changes', () => {
            expect(typeof switchEl.onSetHandler).to.equal('function');
        });

        it('provides an event for when the "value" model property changes', () => {
            expect(typeof switchEl.onChange).to.equal('function');
        });

    });

    describe('methods', () => {


        it('should be able to determine switch state', () => {
            let switchEl = new HandstandSwitch();
            expect(switchEl.isSwitched()).to.equal(false);
            switchEl.input = { checked: true };
            expect(switchEl.isSwitched()).to.equal(true);
        });

        describe('events', () => {

            let switchEl = new HandstandSwitch();

            it('should handle onChange events by setting "value" model property', () => {
                let spy = sinon.spy(switchEl,'isSwitched');
                switchEl.onChange();
                expect(spy.called).to.equal(true);
                switchEl.isSwitched.restore();
            });

            it('should have a stub to handle onSet events', () => {
                switchEl.input = { checked: true };
                expect(switchEl.onSetHandler(null, null, switchEl.model)).not.to.throw;
            });

        });

        describe('lifecycle', () => {

            let switchEl;

            beforeEach(() => {
                switchEl = new HandstandSwitch();
            });

            it('should render', () => {
                let mockLabel = {},
                mockInput = {},
                mockDiv = {
                    childNodes: []
                };
                mockDiv.childNodes.push(mockInput);
                mockDiv.childNodes.push(mockLabel);
                switchEl.childNodes[0] = mockDiv;
                switchEl.render();
                expect(switchEl.div).to.equal(mockDiv);
                expect(switchEl.input).to.equal(mockInput);
                expect(switchEl.label).to.equal(mockLabel);
            });

        });

    });

});