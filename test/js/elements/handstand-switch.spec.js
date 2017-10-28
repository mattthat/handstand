require('../../harness');

let HandstandSwitch = require(path.join(__dirname, '../../../src/js/elements',
    'handstand-switch'));

describe('HandstandSwitch', () => {
    
    describe('provisions', () => {

        let switchEl = new HandstandSwitch();

        it('extends Handstand', () => {
            expect(switchEl instanceof Handstand).to.equal(true);
        });

        it('provides a template property', () => {
            expect(switchEl.template).to.equal(
                '<div><input name="[[ident]]" id="[[ident]]" type="checkbox" checked><label for="[[ident]]"></label></div>');
        });
        
        it('provides a way to do the "setUp" lifecycle phase', () => {
            expect(typeof switchEl.setUp).to.equal('function');
        });

        it('provides a way to do the "buildUp" lifecycle phase', () => {
            expect(typeof switchEl.buildUp).to.equal('function');
        });

        it('provides a way to determine if the checkbox is checked', () => {
            expect(typeof switchEl.isSwitched).to.equal('function');
        });

        it('overrides the way to configure monitoring', () => {
            expect(typeof switchEl.configureMonitoring).to.equal('function');
        });

        it('overrides the way to configure two-way', () => {
            expect(typeof switchEl.configureTwoway).to.equal('function');
        });

        it('provides a handler to delegate model property changes', () => {
            expect(typeof switchEl.onSetHandler).to.equal('function');
        });

        it('provides an event for when the "value" model property changes', () => {
            expect(typeof switchEl.onChange).to.equal('function');
        });

        it('provides a way to dismantle monitoring', () => {
            expect(typeof switchEl.stopMonitoring).to.equal('function');
        });

        it('provides a way to do the "ripDown" lifecycle phase', () => {
            expect(typeof switchEl.ripDown).to.equal('function');
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

            afterEach(() => {
                switchEl = null;
                switchEl = undefined;
            });

            it('should setUp', () => {
                switchEl.setUp();
                expect(switchEl.ident.indexOf('handstandswitch')).to.equal(0);
                expect(switchEl.model.Get('value')).to.equal(true);
            });

            it('should buildUp', () => {
                let mockLabel = {},
                mockInput = {},
                mockDiv = {
                    childNodes: []
                };
                mockDiv.childNodes.push(mockInput);
                mockDiv.childNodes.push(mockLabel);
                switchEl.childNodes[0] = mockDiv;
                switchEl.buildUp();
                expect(switchEl.div).to.equal(mockDiv);
                expect(switchEl.input).to.equal(mockInput);
                expect(switchEl.label).to.equal(mockLabel);
            });

        });

        describe('monitoring', () => {

             let switchEl = new HandstandSwitch();
             switchEl.setAttribute('id', 'switch-monitoring-tests');

             it('should interrogate configured html attributes and set monitoring off', () => {
                 switchEl.configureMonitoring();
                 expect(switchEl.monitoring).to.equal(false);
             });

             it('should interrogate configured html attributes and set monitoring on', () => {
                 let spy = sinon.spy(switchEl, 'on');
                 switchEl.setAttribute('monitor', 'true');
                 switchEl.configureMonitoring();
                 expect(switchEl.monitoring).to.equal(true);
                 expect(spy.called).to.equal(true);
                 switchEl.on.restore();
             });

             it('should stop monitoring when told', () => {
                 let spy = sinon.spy(switchEl, 'off');
                 switchEl.stopMonitoring();
                 expect(spy.called).to.equal(true);
                 expect(switchEl.monitoring).to.equal(false);
                 switchEl.off.restore();
             });

        });

        describe('two-way', () => {

             let switchEl = new HandstandSwitch();
             switchEl.setAttribute('id', 'switch-twoway-tests');

             it('should interrogate configured html attributes and set twoway off', () => {
                 switchEl.configureTwoway();
                 expect(switchEl.twoway).to.equal(false);
             });

             it('should interrogate configured html attributes and set twoway on', () => {
                 let spy = sinon.spy(switchEl.model, 'onSet');
                 switchEl.setAttribute('twoway', 'true');
                 switchEl.configureTwoway();
                 expect(switchEl.twoway).to.equal(true);
                 expect(spy.called).to.equal(true);
                 switchEl.model.onSet.restore();
             });

        });

    });

});