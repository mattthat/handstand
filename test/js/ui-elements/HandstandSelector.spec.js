require('../../ui-core_harness');

let HandstandSelector = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandSelector.js'));

describe('HandstandSelector', () => {
    
    describe('provisions', () => {

        let selector = new HandstandSelector();

        it('extends HandstandConfigurableElement', () => {
            expect(selector instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a template property', () => {
            expect(selector.template).to.equal('<select></select>');
        });

        it ('provides a selectedChoice property', () => {
            expect(selector.selectedChoice).to.equal(undefined);
        })

        it('provides null returning override for configuring montioring', () => {
            expect(typeof selector.configureMonitoring).to.equal('function');
            expect(selector.configureMonitoring()).to.equal(null);
        });

        it('provides null returnning override for configuring twoway', () => {
            expect(typeof selector.configureTwoway).to.equal('function');
            expect(selector.configureTwoway()).to.equal(null);
        });

        it('provides a handler for when it renders', () => {
            expect(typeof selector.onRender).to.equal('function');
        });

        it('provides a way to add a choice', () => {
            expect(typeof selector.addChoice).to.equal('function');
        });

        it('provides a way to remove a choice', () => {
            expect(typeof selector.removeChoice).to.equal('function');
        });

        it('provides a way to select a choice', () => {
            expect(typeof selector.selectChoice).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('constructor', () => {
            
            it('should construct with no options', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });

            it('should construct with a placeholder option set', () => {
                let selector = new HandstandSelector({
                    id: 'construct-tests',
                    placeholder: 'test-placeholder'
                }, {
                    events: {
                    }
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });
            
            it('should construct with just an onChoiceAdded event handler being a function', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onChoiceAdded: () => { }
                    }
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });

            it('should construct with just an onChoiceAdded event handler being a non-function (not assigning the handler)', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onChoiceAdded: ''
                    }
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });

            it('should construct with just an onChoiceRemoved event handler being a function', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onChoiceRemoved: () => { }
                    }
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });

            it('should construct with just an onChoiceRemoved event handler being a non-function (not assigning the handler)', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onChoiceRemoved: ''
                    }
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });


            it('should construct with just an onChoiceCleared event handler being a function', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onChoiceCleared: () => { }
                    }
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });

            it('should construct with just an onChoiceCleared event handler being a non-function (not assigning the handler)', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onChoiceCleared: ''
                    }
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });

            it('should construct with just an onChoiceSelected event handler being a function', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests',
                }, {
                    events: {
                        onChoiceSelected: () => { }
                    }
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });

            it('should construct with just an onChoiceSelected event handler being a non-function (not assigning the handler)', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onChoiceSelected: ''
                    }
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });
            it('should construct with choices that are strings', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                    choices: ['zero','one','two']
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });

            it('should construct with choices that are objects', () => {
                let selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                    choices: [{ template: 'zero' }, { template: 'one'}, { template: 'two' }]
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
            });

            it('should construct with choices, stashing them in a temporary property', () => {
                let choices = ['zero','one','two'], selector = new HandstandSelector({
                    id: 'contruct-tests'
                }, {
                    choices: choices
                });
                expect(selector instanceof HandstandSelector).to.equal(true);
                expect(selector._choices).to.equal(choices);
            });

        });

        describe('onRender', () => {

            it('should "render" 3 choices using addChoice on each choice', () => {
                let choices = [{ template: 'zero' }, { template: 'one'}, { template: 'two' }], 
                selector = new HandstandSelector({
                    id: 'render-tests'
                }, {
                    choices: choices
                }),
                spy = sinon.spy(selector, 'addChoice');
                selector.onRender();
                expect(spy.calledThrice).to.equal(true);
                selector.addChoice.restore();
            });

            it('should clear temporary choice property and populate selector.choices', () => {
                let choices = ['zero','one','two'], 
                selector = new HandstandSelector({
                    id: 'render-tests'
                }, {
                    choices: choices
                });
                expect(selector.choices).to.equal(undefined);
                expect(selector._choices).to.equal(choices);
                selector.onRender();
                expect(selector.choices).not.equal(undefined);
                expect(selector._choices).to.equal(undefined);
            });

            it('should render with a placeholder', () => {
                let attrs = [], selector = new HandstandSelector({
                    id: 'construct-tests',
                    placeholder: 'test-placeholder'
                }, {
                    events: {
                    }
                });
                selector.childNodes = [];
                selector.childNodes.push({
                    addEventListener: () => { },
                    setAttribute: (attr, val) => { attrs[attr] = val }
                });
                selector.onRender();
                expect(attrs['placeholder']).to.equal('test-placeholder');
            });

        });

        describe('addChoice', () => {

            it('should fail to add choices before being rendered', () => {
                let testContent = 'test content',
                choices = ['zero','one','two'],
                selector = new HandstandSelector({
                    id: 'add-tests'
                }, {
                    choices: choices
                });
                selector.addChoice(testContent);
                selector.onRender();
                expect(selector.choices[3]).to.equal(undefined);
            });

            it('should handle string arguments, making them the choice template property', () => {
                let testContent = 'test content',
                choices = ['zero','one','two'],
                selector = new HandstandSelector({
                    id: 'add-tests'
                }, {
                    choices: choices
                });
                selector.onRender();
                
                selector.childNodes = [];
                selector.childNodes.push({ append: () => { } });

                selector.addChoice(testContent);
                expect(selector.choices[3].template).to.equal(testContent);
            });

            it('should handle object arguments (firing intended events)', () => {
                let choiceAdded = false, testChoice = {
                    id: 'test-choice',
                    value: 'test-value',
                    selected: true,
                    template: 'test content'
                },
                choices = ['zero','one','two'],
                selector = new HandstandSelector({
                    id: 'add-tests'
                }, {
                    choices: choices,
                    events: {
                        onChoiceAdded: () => {
                            choiceAdded = true;
                        }
                    }
                });
                selector.onRender();
                selector.addChoice(testChoice);
                expect(selector.choices[3]).to.equal(testChoice);
                expect(choiceAdded).to.equal(true);
            });

        });

        describe('removeChoice', () => {

            it('should fail to remove a choice before being rendered', () => {
                let testContent = 'test content',
                choices = ['zero','one','two'],
                selector = new HandstandSelector({
                    id: 'remove-tests'
                }, {
                    choices: choices
                });
                selector.removeChoice(testContent);
                selector.onRender();
                expect(selector.choices.length).to.equal(3);
            });

            it('should handle string arguments', () => {
                let testContent = 'zero',
                choices = ['zero','one','two'],
                selector = new HandstandSelector({
                    id: 'remove-tests'
                }, {
                    choices: choices
                });
                selector.onRender();
                selector.childNodes = [];
                selector.childNodes.push({ append: () => { } });
                selector.children = {
                    item: () => {
                        return {
                            children: {
                                item: () => {
                                    return {
                                        remove: () => {
                                        }
                                    }
                                }
                            }
                        } 
                    }
                };
                expect(selector.choices.length).to.equal(3);
                selector.removeChoice(testContent);
                expect(selector.choices.length).to.equal(2);
            });

            it('should handle object arguments', () => {
                choiceRemoved = false, testChoice = {
                    id: 'test-choice',
                    value: 'test-value',
                    template: 'test content'
                },
                choices = ['zero','one','two', testChoice],
                selector = new HandstandSelector({
                    id: 'add-tests'
                }, {
                    choices: choices,
                    events: {
                        onChoiceRemoved: () => {
                            choiceRemoved = true;
                        }
                    }
                });
                selector.onRender();
                selector.childNodes = [];
                selector.childNodes.push({ append: () => { } });
                selector.children = {
                    item: () => {
                        return {
                            children: {
                                item: () => {
                                    return {
                                        remove: () => {
                                        }
                                    }
                                }
                            }
                        } 
                    }
                };
                expect(selector.choices[3]).to.equal(testChoice);
                expect(selector.choices.length).to.equal(4);
                selector.removeChoice(testChoice);
                expect(selector.choices[3]).not.to.equal(testChoice);
                expect(selector.choices.length).to.equal(3);
                expect(choiceRemoved).to.equal(true);
            });

        });

        describe('selectChoice', () => {

            it('should select a choice', () => {
                let choiceSelected = false, testChoice = {
                    id: 'test-choice',
                    value: 'test-value',
                    template: 'test content'
                },
                choices = ['zero','one','two', testChoice],
                selector = new HandstandSelector({
                    id: 'select-tests'
                }, {
                    choices: choices,
                    events: {
                        onChoiceSelected: () => {
                            choiceSelected = true;
                        }
                    }
                });
                selector.childNodes = [];
                selector.childNodes.push({
                    append: () => {},
                    addEventListener: () => {},
                    setAttribute: () => {},
                    removeAttribute: () => {},
                    childNodes: {
                        0: {
                            removeAttribute: () => {},
                            setAttribute: () => {}
                        },
                        1: {
                            removeAttribute: () => {},
                            setAttribute: () => {}
                        },
                        2: {
                            removeAttribute: () => {},
                            setAttribute: () => {}
                        },
                        3: {
                            removeAttribute: () => {},
                            setAttribute: () => {}
                        }
                    }
                });
                selector.onRender();
                expect(selector.selectedChoice).to.equal(undefined);
                selector.selectChoice(testChoice.value);
                expect(selector.selectedChoice).to.equal(testChoice);
                expect(testChoice.selected).to.equal(true);
                expect(choiceSelected).to.equal(true);
            });

            it('should clear the selected choice', () => {
                let choiceCleared = false, testChoice = {
                    id: 'test-choice',
                    value: 'test-value',
                    template: 'test content'
                },
                choices = ['zero','one','two', testChoice],
                selector = new HandstandSelector({
                    id: 'select-tests'
                }, {
                    choices: choices,
                    events: {
                        onChoiceCleared: () => {
                            choiceCleared = true;
                        }
                    }
                });
                selector.childNodes = [];
                selector.childNodes.push({
                    append: () => {},
                    addEventListener: () => {},
                    setAttribute: () => {},
                    removeAttribute: () => {},
                    childNodes: {
                        0: {
                            removeAttribute: () => {},
                            setAttribute: () => {}
                        },
                        1: {
                            removeAttribute: () => {},
                            setAttribute: () => {}
                        },
                        2: {
                            removeAttribute: () => {},
                            setAttribute: () => {}
                        },
                        3: {
                            removeAttribute: () => {},
                            setAttribute: () => {},
                        }
                    }
                });
                selector.onRender();
                expect(selector.selectedChoice).to.equal(undefined);
                selector.selectChoice(testChoice.value);
                expect(selector.selectedChoice).to.equal(testChoice);
                selector.selectChoice(null); 
                expect(selector.selectedChoice).to.equal(undefined);
                expect(choiceCleared).to.equal(true);
            });

            it('should fail to select a choice when the term used is invalid', () => {
                let choices = ['zero','one','two'],
                selector = new HandstandSelector({
                    id: 'select-tests'
                }, {
                    choices: choices
                });
                selector.childNodes = [];
                selector.childNodes.push({
                    append: () => {},
                    addEventListener: () => {},
                    setAttribute: () => {},
                    removeAttribute: () => {},
                    childNodes: {
                        0: {
                            removeAttribute: () => {},
                            setAttribute: () => {}
                        },
                        1: {
                            removeAttribute: () => {},
                            setAttribute: () => {}
                        },
                        2: {
                            removeAttribute: () => {},
                            setAttribute: () => {}
                        },
                        3: {
                            removeAttribute: () => {},
                            setAttribute: () => {},
                        }
                    }
                });
                selector.onRender();
                expect(selector.selectedChoice).to.equal(undefined);
                selector.selectChoice();
                expect(selector.selectedChoice).to.equal(undefined);
            });

        });

    });

});