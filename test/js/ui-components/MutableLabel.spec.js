require('../../ui-core_harness');

global.HandstandLabel = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandLabel.js'));

global.HandstandTextarea = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandTextarea.js'));

let MutableLabel = require(path.join(__dirname, '../../../src/js/ui-components',
    'MutableLabel.js'));

describe('MutableLabel', () => {

    let component = new MutableLabel();

    describe('provisions', () => {

        it('extends HandstandConfigurableElement', () => {
            expect(component instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a state property', () => {
            expect(component.state).to.equal('modeled')
        });

        it('provides a label property', () => {
            expect(component.label).not.to.equal(undefined);
        });

        it('provides a mutable property', () => {
            expect(component.mutable).not.to.equal(undefined);
        })

        it('provides a way to become mutable', () => {
            expect(typeof component.beMutable).to.equal('function');
        });

        it('provides a way to become modeled', () => {
            expect(typeof component.beModeled).to.equal('function');
        });

    });

    describe('properties', () => {

        describe('state', () => {

            beforeEach(() => {
                component = new MutableLabel();
                component.childNodes.push({ remove: () => {} });
            });
            
            it('should become mutable', () => {
                let spy = sinon.spy(component, 'beMutable');
                component.state = 'mutable';
                expect(spy.called).to.equal(true);
                component.beMutable.restore();
            });

            it('should otherwise become modeled', () => {
                let spy = sinon.spy(component, 'beModeled');
                component.state = 'modeled';
                expect(spy.called).to.equal(true);
                component.beModeled.restore();
            });

            afterEach(() => {
                component = null;
                component = undefined;
            });

        });

        describe('value', () => {

            it('should meet initial and causal expectations', () => {
                let initial = 'test123',
                causal = 'test456',
                component = new MutableLabel({}, { value: initial });
                expect(component.value).to.equal(initial);
                component.value = causal;
                expect(component.value).to.equal(causal);
            });

        });

    });

    describe('methods', () => {

        describe('events', () => {

            let component;

            describe('click', () => {

                it('should set state to mutable when modeled', () => {
                    component = new MutableLabel(); 
                    component.childNodes.push({ remove: () => { } });
                    component.onCreated();
                    component.onAdded();
                    component.trigger('click');
                    expect(component.state).to.equal('mutable');
                });

            });

            describe('focusout', () => {

                it('should set state to modeled when mutable', () => {
                    component = new MutableLabel(); 
                    component.childNodes.push({ remove: () => { } });
                    component.state = 'mutable';
                    component.onCreated();
                    component.onAdded();
                    component.trigger('focusout');
                    expect(component.state).to.equal('modeled');
                });

            });

            describe('onModeled', () => {

                it('should call onModeled when becoming modeled', () => {
                    let x = 0;
                    component = new MutableLabel({}, {
                        events: {
                            onModeled: () => {
                                x = 1;
                            }
                        }
                    }); 
                    component.childNodes.push({ remove: () => { } });
                    component.state = 'mutable';
                    component.onCreated();
                    component.onAdded();
                    component.trigger('focusout');
                    expect(component.state).to.equal('modeled');
                    expect(x).to.equal(1);
                });

            });

            describe('onMutable', () => {

                it('should call onMutable when becoming mutable', () => {
                    let x = 0;
                    component = new MutableLabel({}, {
                        events: {
                            onMutable: () => {
                                x = 1;
                            }
                        }
                    }); 
                    component.childNodes.push({ remove: () => { } });
                    component.onCreated();
                    component.onAdded();
                    component.trigger('click');
                    expect(component.state).to.equal('mutable');
                    expect(x).to.equal(1);
                });

            });

        });

        describe('lifecycle', () => {

            let component;

            describe('onCreated', () => {

                it('should listen for two events: click and mouseout', () => {
                    component = new MutableLabel({ id: 'lifecycle-tests' }, {
                        value: 'test me, please'
                    });
                    let spy = sinon.spy(component, 'on');
                    component.onCreated();
                    expect(spy.calledTwice).to.equal(true);
                    expect(spy.calledWith('click')).to.equal(true);
                    expect(spy.calledWith('focusout')).to.equal(true);
                    component.on.restore();
                });

            });

            describe('onAdded', () => {

                it('should create a label and mutable, then append the label', () => {
                    component = new MutableLabel({ id: 'lifecycle-tests' }, {
                        value: 'test me, please'
                    });
                    let spy = sinon.spy(component, 'append');
                    component.onAdded();
                    expect(component.label).not.to.equal(undefined);
                    expect(component.mutable).not.to.equal(undefined);
                    expect(spy.called).to.equal(true);
                    expect(spy.calledWith(component.label)).to.equal(true);
                    component.append.restore();
                });

            });

        });
  
    });
    
});