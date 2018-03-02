require('../../ui-core_harness');

let HandstandList = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandList.js'));

describe('HandstandList', () => {
    
    describe('provisions', () => {

        let list = new HandstandList();

        it('extends HandstandConfigurableElement', () => {
            expect(list instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a template property', () => {
            expect(list.template).to.equal('<ul></ul>');
        });

        it('provides null returning override for configuring montioring', () => {
            expect(typeof list.configureMonitoring).to.equal('function');
            expect(list.configureMonitoring()).to.equal(null);
        });

        it('provides null returnning override for configuring twoway', () => {
            expect(typeof list.configureTwoway).to.equal('function');
            expect(list.configureTwoway()).to.equal(null);
        });

        it('provides a handler for when it renders', () => {
            expect(typeof list.onRender).to.equal('function');
        });

        it('provides a way to add an item', () => {
            expect(typeof list.addItem).to.equal('function');
        });

        it('provides a way to remove an item', () => {
            expect(typeof list.removeItem).to.equal('function');
        });

        it('provides  way to remove all items', () => {
            expect(typeof list.clearItems).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('constructor', () => {
            
            it('should construct with no options', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                });
                expect(list instanceof HandstandList).to.equal(true);
            });

            
            it('should construct with just an onItemAdded event handler being a function', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onItemAdded: () => { }
                    }
                });
                expect(list instanceof HandstandList).to.equal(true);
            });

            it('should construct with just an onItemAdded event handler being a non-function (not assigning the handler)', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onItemAdded: ''
                    }
                });
                expect(list instanceof HandstandList).to.equal(true);
            });

            it('should construct with just an onItemRemoved event handler being a function', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onItemRemoved: () => { }
                    }
                });
                expect(list instanceof HandstandList).to.equal(true);
            });

            it('should construct with just an onItemRemoved event handler being a non-function (not assigning the handler)', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onItemRemoved: ''
                    }
                });
                expect(list instanceof HandstandList).to.equal(true);
            });


            it('should construct with just an onListChanged event handler being a function', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onListChanged: () => { }
                    }
                });
                expect(list instanceof HandstandList).to.equal(true);
            });

            it('should construct with just an onListChanged event handler being a non-function (not assigning the handler)', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onListChanged: ''
                    }
                });
                expect(list instanceof HandstandList).to.equal(true);
            });


            it('should construct with just an onAfterRender event handler being a function', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onAfterRender: () => { }
                    }
                });
                expect(list instanceof HandstandList).to.equal(true);
            });

            it('should construct with just an onAfterRender event handler being a non-function (not assigning the handler)', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    events: {
                        onAfterRender: ''
                    }
                });
                expect(list instanceof HandstandList).to.equal(true);
            });

            it('should construct with items that are strings', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    items: ['zero','one','two']
                });
                expect(list instanceof HandstandList).to.equal(true);
            });

            it('should construct with items that are objects', () => {
                let list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    items: [{ template: 'zero' }, { template: 'one'}, { template: 'two' }]
                });
                expect(list instanceof HandstandList).to.equal(true);
            });

            it('should construct with items, stashing the items in a temporary property', () => {
                let items = ['zero','one','two'], list = new HandstandList({
                    id: 'contruct-tests'
                }, {
                    items: items
                });
                expect(list instanceof HandstandList).to.equal(true);
                expect(list._items).to.equal(items);
            });

        });

        describe('onRender', () => {

            it('should "render" 3 items using addItem on each item', () => {
                let items = [{ template: 'zero' }, { template: 'one'}, { template: 'two' }], 
                list = new HandstandList({
                    id: 'render-tests'
                }, {
                    items: items
                }),
                spy = sinon.spy(list, 'addItem');
                list.onRender();
                expect(spy.calledThrice).to.equal(true);
                list.addItem.restore();
            });

            it('should clear temporary item property and populate list.items', () => {
                let items = ['zero','one','two'], 
                list = new HandstandList({
                    id: 'render-tests'
                }, {
                    items: items
                });
                expect(list.items).to.equal(undefined);
                expect(list._items).to.equal(items);
                list.onRender();
                expect(list.items).not.equal(undefined);
                expect(list._items).to.equal(undefined);
            });

            it('should when configured, call onAfterRender', () => {
                let afterRender = false, items = [{ 
                    template: 'zero' }, { template: 'one'}, { template: 'two' }], 
                list = new HandstandList({
                    id: 'render-tests'
                }, {
                    items: items,
                    events: {
                        onAfterRender: () => {
                            afterRender = true;
                        }
                    }
                });
                list.onRender();
                expect(afterRender).to.equal(true);
            });

        });

        describe('addItem', () => {

            it('should fail to add items before being rendered', () => {
                let testContent = 'test content',
                items = ['zero','one','two'],
                list = new HandstandList({
                    id: 'add-tests'
                }, {
                    items: items
                });
                expect(list.addItem(testContent)).to.equal(list);
                list.onRender();
                expect(list.items[3]).to.equal(undefined);
            });

            it('should handle string arguments, making them the items template property', () => {
                let testContent = 'test content',
                items = ['zero','one','two'],
                list = new HandstandList({
                    id: 'add-tests'
                }, {
                    items: items
                });
                list.onRender();
                list.childNodes = [];
                list.childNodes.push({ append: () => { } });

                expect(list.addItem(testContent)).to.equal(list);
                expect(list.items[3].template).to.equal(testContent);
            });

            it('should handle object arguments', () => {
                let listChanged = false, itemAdded = false, 
                testItem = {
                    id: 'test-item',
                    css: 'test-css',
                    template: 'test content'
                },
                items = ['zero','one','two'],
                list = new HandstandList({
                    id: 'add-tests'
                }, {
                    items: items,
                    events: {
                        onListChanged: () => {
                            listChanged = true;
                        },
                        onItemAdded: () => {
                            itemAdded = true;
                        }
                    }
                });
                list.onRender();
                expect(list.addItem(testItem)).to.equal(list);
                expect(list.items[3]).to.equal(testItem);
                expect(itemAdded).to.equal(true);
                expect(listChanged).to.equal(true);
            });

        });

        describe('removeItem', () => {

            it('should fail to remove items before being rendered', () => {
                let testContent = 'test content',
                items = ['zero','one','two'],
                list = new HandstandList({
                    id: 'remove-tests'
                }, {
                    items: items
                });
                expect(list.removeItem(testContent)).to.equal(list);
                list.onRender();
                expect(list.items.length).to.equal(3);
            });

            it('should handle string arguments', () => {
                let testContent = 'zero',
                items = ['zero','one','two'],
                list = new HandstandList({
                    id: 'remove-tests'
                }, {
                    items: items
                });
                list.onRender();
                list.childNodes = [];
                list.childNodes.push({ append: () => { } });
                list.children = {
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
                expect(list.items.length).to.equal(3);
                expect(list.removeItem(testContent)).to.equal(list);
                expect(list.items.length).to.equal(2);
            });

            it('should handle object arguments', () => {
                let listChanged = false, itemRemoved = false, 
                testItem = {
                    id: 'test-item',
                    css: 'test-css',
                    template: 'test content'
                },
                items = ['zero','one','two', testItem],
                list = new HandstandList({
                    id: 'add-tests'
                }, {
                    items: items,
                    events: {
                        onListChanged: () => {
                            listChanged = true;
                        },
                        onItemRemoved: () => {
                            itemRemoved = true;
                        }
                    }
                });
                list.onRender();
                list.childNodes = [];
                list.childNodes.push({ append: () => { } });
                list.children = {
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
                expect(list.items[3]).to.equal(testItem);
                expect(list.items.length).to.equal(4);
                expect(list.removeItem(testItem)).to.equal(list);
                expect(list.items[3]).not.to.equal(testItem);
                expect(list.items.length).to.equal(3);
                expect(itemRemoved).to.equal(true);
                expect(listChanged).to.equal(true);
            });

        });

        describe('clearItems', () => {

            it('should fail to clear the item list before being rendered', () => {
                let items = ['zero','one','two'],
                list = new HandstandList({
                    id: 'clear-tests'
                }, {
                    items: items
                });
                list.children = {
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
                expect(list.clearItems()).to.equal(list);
                list.onRender();
                expect(list.items.length).to.equal(3);
            });

            it('should clear the item list', () => {
                let listChanged = false, 
                items = ['zero','one','two'],
                list = new HandstandList({
                    id: 'clear-tests'
                }, {
                    items: items,
                    events: {
                        onListChanged: () => {
                            listChanged = true;
                        }
                    }
                });           
                list.onRender();
                list.children = {
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
                expect(list.items.length).to.equal(3);
                expect(list.clearItems()).to.equal(list);
                expect(list.items.length).to.equal(0);
                expect(listChanged).to.equal(true);
            });

        });

    });

});