require('../../harness');

let HandstandDropdown = require(path.join(__dirname, '../../../src/js/elements',
    'handstand-dropdown'));

describe('HandstandDropdown', () => {

    describe('provisions', () => {

        let dropdown = new HandstandDropdown();

        it('extends Handstand', () => {
            expect(dropdown instanceof Handstand).to.equal(true);
        });

        it('provides a template property with options', () => {
            dropdown.options = 'test';
            expect(dropdown.template).to.equal('<select></select>');
        });
        
        it('provides a template property without options', () => {
            dropdown.options = undefined;
            expect(dropdown.template).to.equal('<select></select>');
        });

        it('provides a way to do the "setUp" lifecycle phase', () => {
            expect(typeof dropdown.setUp).to.equal('function');
        });

        it('provides a way to do the "buildUp" lifecycle phase', () => {
            expect(typeof dropdown.buildUp).to.equal('function');
        });

        it('provides a way to produce a select tag', () => {
            expect(typeof dropdown.selectTag).to.equal('function');
        });

        it('provides a Selected property', () => {
            expect(dropdown.Selected).to.equal(null);
        });

        it('provides a way to handle when an option is selected', () => {
            expect(typeof dropdown.onSelection).to.equal('function');
        });

        it('overrides the way to configure monitoring', () => {
            expect(typeof dropdown.configureMonitoring).to.equal('function');
        });

        it('overrides the way to configure two-way', () => {
            expect(typeof dropdown.configureTwoway).to.equal('function');
        });

        it('provides a handler to delegate model property changes', () => {
            expect(typeof dropdown.onSetHandler).to.equal('function');
        });

        it('provides an event for when the "value" model property changes', () => {
            expect(typeof dropdown.onChange).to.equal('function');
        });

        it('provides a way to dismantle monitoring', () => {
            expect(typeof dropdown.stopMonitoring).to.equal('function');
        });

        it('provides a way to do the "ripDown" lifecycle phase', () => {
            expect(typeof dropdown.ripDown).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('events', () => {

            let dropdown = new HandstandDropdown();

            it('should handle onChange events by setting "value" model property', () => {
                let spy = sinon.spy(dropdown,'onSelection');
                dropdown.onChange();
                expect(spy.called).to.equal(true);
            });

            it('should have a stub to handle onSet events', () => {
                expect(dropdown.onSetHandler()).not.to.throw;
            });

        });
        
        describe('lifecycle', () => {

            let dropdown;

            beforeEach(() => {
                dropdown = new HandstandDropdown();
            });

            afterEach(() => {
                dropdown = null;
                dropdown = undefined;
            });

            it('should setUp', () => {
                let spy = sinon.spy(dropdown, 'onSelection');
                dropdown.setUp();
                expect(spy.called).to.equal(true);
                dropdown.onSelection.restore();
            });

            it('should buildUp', () => {
                let node = { style: {}, options: ['a'] },
                placeholder = 'word',
                fontSize = '1px';
                dropdown.childNodes[0] = node;
                dropdown.setAttribute('placeholder', placeholder);
                dropdown.setAttribute('font-size', fontSize);
                dropdown.buildUp();
                expect(dropdown.select).to.equal(node);
                expect(dropdown.options).to.equal(node.options);
                expect(dropdown.select.placeholder).to.equal(placeholder);
                expect(dropdown.select.style.fontSize).to.equal(fontSize);
            });

        });

        describe('options', () => {

            let node, dropdown;

            beforeEach( () => {
                dropdown = new HandstandDropdown();
                dropdown.setAttribute('id', 'dropdown-options-tests');
                node = {
                    options: [{
                        innerHTML: 'alpha',
                        attributes: {
                            value: {
                                value: 'a'
                            }
                        }
                    },{
                        innerHTML: 'beta',
                        attributes: {
                            value: {
                                value: 'b'
                            }
                        }
                    }, {
                        foo: 'bar'
                    }]
                };
                dropdown.childNodes[0] = node;
                dropdown.buildUp();
                dropdown.options.selectedIndex = 0;
            });

            afterEach(() => {
                node = null;
                node = undefined;
                dropdown = null;
                dropdown = undefined;
            });

            it('should produce a select tag', () => {
                expect(dropdown.selectTag('hello world')).to.equal('<select>hello world</select>');
            });

            it('should be able to determine which option is selected', () => {
                expect(dropdown.Selected.innerHTML).to.equal('alpha');
            });

            it('should handle when an option is selected', () => {
                let option0 = node.options[0], option1 = node.options[1], option2 = node.options[2];
                dropdown.onSelection();
                expect(dropdown.model.Get('value').content).to.equal(option0.innerHTML);
                expect(dropdown.model.Get('value').value).to.equal(option0.attributes.value.value);
                dropdown.options.selectedIndex = 1;
                dropdown.onSelection();
                expect(dropdown.model.Get('value').content).to.equal(option1.innerHTML);
                expect(dropdown.model.Get('value').value).to.equal(option1.attributes.value.value);
                dropdown.options.selectedIndex = 2;
                dropdown.onSelection();
                expect(dropdown.model.Get('value').foo).to.equal(option2.foo);
                dropdown.options = [];
                dropdown.onSelection();
                expect(dropdown.model.Get('value').content).to.equal(undefined);
                expect(dropdown.model.Get('value').value).to.equal(undefined);
            });

        });

        describe('monitoring', () => {

            let dropdown = new HandstandDropdown();
            dropdown.setAttribute('id', 'dropdown-monitoring-tests');

            it('should interrogate configured html attributes and set monitoring off', () => {
                dropdown.configureMonitoring();
                expect(dropdown.monitoring).to.equal(false);
            });

            it('should interrogate configured html attributes and set monitoring on', () => {
                let spy = sinon.spy(HandstandEventManager, 'listen');
                dropdown.setAttribute('monitor', 'true');
                dropdown.configureMonitoring();
                expect(dropdown.monitoring).to.equal(true);
                expect(spy.called).to.equal(true);
                HandstandEventManager.listen.restore();
            });

            it('should stop monitoring when told', () => {
                let spy = sinon.spy(HandstandEventManager, 'clear');
                dropdown.stopMonitoring();
                expect(spy.called).to.equal(true);
                expect(dropdown.monitoring).to.equal(false);
                HandstandEventManager.clear.restore();
            });

        });

        describe('two-way', () => {

            let dropdown = new HandstandDropdown();
            dropdown.setAttribute('id', 'dropdown-twoway-tests');

            it('should interrogate configured html attributes and set twoway off', () => {
                dropdown.configureTwoway();
                expect(dropdown.twoway).to.equal(false);
            });

            it('should interrogate configured html attributes and set twoway on', () => {
                let spy = sinon.spy(dropdown.model, 'onSet');
                dropdown.setAttribute('twoway', 'true');
                dropdown.configureTwoway();
                expect(dropdown.twoway).to.equal(true);
                expect(spy.called).to.equal(true);
                dropdown.model.onSet.restore();
            });

        });

    });

});