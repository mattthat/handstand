require('../../harness');

let HandstandList = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandList.js'));

describe('HandstandList', () => {
    
    describe('provisions', () => {

        let list = new HandstandList();

        it('extends Handstand', () => {
            expect(list instanceof Handstand).to.equal(true);
        });

        it('provides a template property without ul', () => {
            expect(list.template).to.equal('<ul></ul>');
        });
        
        it('provides a template property with ul', () => {
            list.ul = {};
            expect(list.template).to.equal('<ul></ul>');
        });

        it('provides a template property with innerHTML', () => {
            list.innerHTML = 'test-list';
            expect(list.template).to.equal('<ul>test-list</ul>');
        });

        it('provides a items property', () => {
            expect(list.items instanceof Array).to.equal(true);
        });

        it('provides a way to do the "setUp" lifecycle phase', () => {
            expect(typeof list.setUp).to.equal('function');
        });

        it('provides a way to do the "buildUp" lifecycle phase', () => {
            expect(typeof list.buildUp).to.equal('function');
        });

        it('provides a way to produce a ul tag', () => {
            expect(typeof list.ulTag).to.equal('function');
        });

        it('provides a way to synchronize list contents', () => {
            expect(typeof list.syncItems).to.equal('function');
        });

        it('provides a way to synchronize dom list items with its model', () => {
            expect(typeof list.modelItemsToDom).to.equal('function');
        });

        it('provides a way to synchronize model list items with the dom', () => {
            expect(typeof list.domToModelItems).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('lifecycle', () => {

            let list = new HandstandList();

            it('should buildUp', () => {
                let original = list.domToModelItems;
                list.domToModelItems = function mock() { };
                let node = {}, spy = sinon.spy(list, 'domToModelItems');
                list.childNodes[0] = node;
                list.buildUp();
                expect(list.ul).to.equal(node);
                expect(spy.called).to.equal(true);
                list.domToModelItems.restore();
                list.domToModelItems = original;
            });

        });

        describe('items', () => {

            let node, list, setSpy, getSpy;

            beforeEach(() => {
                node = {
                    children: [],
                    appendChild: function (item) {
                        this.children.push(item);
                    },
                    removeChild: function (item) {
                        this.firstChild = undefined;
                    } 
                },
                list = new HandstandList();
                list.childNodes[0] = node;
                list.render();
                setSpy = sinon.spy(list.model, 'Set');
                getSpy = sinon.spy(list.model, 'Get');
            });

            afterEach(() => {
                list.model.Set.restore();
                list = null;
                list = undefined;
                node = null;
                node = undefined;
                setSpy = null;
                setSpy = undefined;
            });

            it('should synchronize dom list items with its model - single item', () => {
                let mockChild = {
                    attributes: {
                        value: {
                            value: 'a'
                        }
                    },
                    innerHTML: 'alpha'
                };
                expect(list.model.Get('items').length).to.equal(0);
                list.ul.children.push(mockChild);
                list.domToModelItems();
                expect(list.items.length).to.equal(1);
                expect(list.items[0].value).to.equal(mockChild.attributes.value.value);
                expect(list.items[0].content).to.equal(mockChild.innerHTML);
                expect(setSpy.called).to.equal(true);
            });

            it('should synchronize dom list items with its model - empty item', () => {
                let mockChild = {};
                expect(list.items.length).to.equal(0);
                list.ul.children.push(mockChild);
                list.domToModelItems();
                expect(list.items.length).to.equal(0);
                expect(setSpy.called).to.equal(true);
            });

            it('should synchronize dom list items with its model - undef item value', () => {
                let mockChild = {
                    attributes: {
                    },
                    innerHTML: 'alpha'
                };
                expect(list.items.length).to.equal(0);
                list.ul.children.push(mockChild);
                list.domToModelItems();
                expect(list.items.length).to.equal(1);
                expect(list.items[0].content).to.equal(mockChild.innerHTML);
                expect(setSpy.called).to.equal(true);
            });

            it('should synchronize dom list items with its model - undef item innerHTML', () => {
                let mockChild = {
                    attributes: {
                        value: {
                            value: 'a'
                        }
                    }
                };
                expect(list.items.length).to.equal(0);
                list.ul.children.push(mockChild);
                list.domToModelItems();
                expect(list.items.length).to.equal(1);
                expect(list.items[0].value).to.equal(mockChild.attributes.value.value);
                expect(setSpy.called).to.equal(true);
            });

            it('should synchronize dom list items with its model - undef item', () => {
                let mockChild = undefined;
                expect(list.items.length).to.equal(0);
                list.ul.children.push(mockChild);
                list.domToModelItems();
                expect(list.items.length).to.equal(0);
                expect(setSpy.called).to.equal(true);
            });

            it('should synchronize model list items with the dom - single item', () => {
                let item = {
                    content: 'alpha',
                    value:'a'
                };
                expect(list.ul.children.length).to.equal(0);
                list.model.Set('items', [item])
                list.ul.firstChild = item;
                list.modelItemsToDom();
                expect(list.ul.children.length).to.equal(1);
                expect(list.ul.children[0].innerHTML).to.equal(item.content);
                expect(list.ul.children[0].attributes['value'].value).to.equal(item.value);
                expect(list.ul.children[0] instanceof HTMLElement).to.equal(true);
                expect(getSpy.called).to.equal(true);
            });

            it('should synchronize model list items with the dom - empty item', () => {
                let item = {};
                expect(list.ul.children.length).to.equal(0);
                list.model.Set('items', [item])
                list.ul.firstChild = item;
                list.modelItemsToDom();
                expect(list.ul.children.length).to.equal(1);
                expect(getSpy.called).to.equal(true);
            });

            it('should synchronize model list items with the dom - undef item', () => {
                let item;
                expect(list.ul.children.length).to.equal(0);
                list.model.Set('items', [item])
                list.ul.firstChild = item;
                list.modelItemsToDom();
                expect(list.ul.children.length).to.equal(0);
                expect(getSpy.called).to.equal(true);
            });

            it('should synchronize list contents from dom', () => {
                let domSpy = sinon.spy(list,'domToModelItems');
                let modelSpy = sinon.spy(list, 'modelItemsToDom');
                list.syncItems();
                expect(domSpy.called).to.equal(true);
                expect(modelSpy.called).to.equal(true);
                list.domToModelItems.restore();
                list.modelItemsToDom.restore();
            });

            it('should synchronize list contents from model', () => {
                let domSpy = sinon.spy(list,'domToModelItems');
                let modelSpy = sinon.spy(list, 'modelItemsToDom');
                list.syncItems(true);
                expect(domSpy.called).to.equal(true);
                expect(modelSpy.called).to.equal(true);
                list.domToModelItems.restore();
                list.modelItemsToDom.restore();
            });

        });

    });

});