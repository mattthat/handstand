require('../../harness');
let mockDocumentQuerySelector = require('../../mocks/mockDocumentQuerySelector');

describe('HandstandConfigurableElement', () => {

    describe('provisions', () => {

        let element = new HandstandConfigurableElement();

        it('extends HandstandElement', () => {
            expect(element instanceof HandstandElement).to.equal(true)
        });

        it('provides a handler to delegate low-level/foundational configuration', () => {
            expect(typeof element.onConfiguration).to.equal('function');
        });

        it('overrides the way to do low-level/foundational configuration', () => {
            expect(typeof element.configure).to.equal('function');
        });

        describe('relationships - html attributes "parent" and "children" can be configured with element selector values which reference other elements on the DOM', () => {

            it('provides a way to connect parent and child elements', () => {
                expect(typeof element.relationships).to.equal('function');
            });

            it('provides a getter for connected parent element', () => {
                expect(typeof element.parent).to.equal('function');
            });

            it('provides a getter for connected child elements', () => {
                expect(typeof element.kids).to.equal('function');
            });

        });

        describe('floating - html attribute "float" can be configured to set the CSS style value', () => {

            it('provides a way to set the CSS style value of "float"', () => {
                expect(typeof element.floating).to.equal('function');
            });

        });

        describe('positioning - html attribute "position" can be configured to set the CSS style value', () => {

            it('provides a way to set the CSS style value of "position"', () => {
                expect(typeof element.positioning).to.equal('function');
            });

        });

        describe('bounding - html attributes "height" and "width" can be configured to set the CSS style values', () => {

            it('provides a way to set the CSS style value of "height" and "width"', () => {
                expect(typeof element.bounding).to.equal('function');
            });

        });

        describe('padding - html attributes "padding" or "padding-top", "padding-bottom", "padding-left" and "padding-right" can be configured to set the CSS style values', () => {

            it('provides a way to set the CSS style values for padding', () => {
                expect(typeof element.padding).to.equal('function');
            });

        });

        describe('bordering - html attributes "border-color", "border-width, "border-style" and "border-radius" can be configured to set the CSS style values', () => {

            it('provides a way to set the CSS style values for borders', () => {
                expect(typeof element.bordering).to.equal('function');
            });

        });

        describe('fonting - html attribute "font-size" can be configured to set the CSS style value', () => {

            it('provides a way to set the CSS style values for font-size', () => {
                expect(typeof element.fonting).to.equal('function');
            });

        });

        describe('coloring - html attributes "text-color" and "color" can be configured to set the CSS style values for color and background color respectively', () => {

            it('provides a way to set the CSS style values for text and background color', () => {
                expect(typeof element.coloring).to.equal('function');
            });

        });

        describe('texting - html attributes "text", "decoration" and "text-align" can be configured to set inner text properties and CSS style values', () => {

            it('provides a way to set the CSS style values for font-size', () => {
                expect(typeof element.texting).to.equal('function');
            });

        });

    });

    describe('methods', () => {

        let element;

        beforeEach(() => {
            element = new HandstandConfigurableElement();
        });

        afterEach(() => {
            element = null;
            element = undefined;
        });

        it('should configure, firing onConfiguration handler', () => {
           let spy = sinon.spy(element.onConfiguration);
           element.configure();
           expect(spy.called);
        });

        it('should interrogate configured html attributes to find relationships - parent', () => {
            /*
               setup a mock parent element and mock the document.querySelector method to
               return it when the right selector is passed. test that with the "parent" attribute set appropriately on the test element, the two elements become connected when finding relationships.

               it is expected that the connection is only one way

            */
            let parentId = 'test-parent';
            let parentElement = new HandstandConfigurableElement();
            parentElement.setAttribute('id', parentId);
            mockDocumentQuerySelector((selector) => {
                if (selector === '#' + parentElement.getAttribute('id'))
                    return parentElement;
            },
            () => {
                element.setAttribute('parent', '#' + parentId);
                element.relationships();
                expect(element.parent()).to.equal(parentElement);
                expect(element.kids().length).to.equal(0);
            });
        });

        it('should interrogate configured html attributes to find relationships - children (some)', () => {
            let childClass = 'test-child'
            let childElement = new HandstandConfigurableElement();
            childElement.setAttribute('class', childClass)
            mockDocumentQuerySelector((selector) => {
                if (selector === '.' + childElement.getAttribute('class'))
                    return childElement;
            },
            () => {
                element.setAttribute('children', '.' + childClass);
                element.relationships();
                expect(element.kids()[0]).to.equal(childElement);
            });
        });

        it('should interrogate configured html attributes to find relationships - children (none)', () => {
            mockDocumentQuerySelector((selector) => {
                return undefined;
            },
            () => {
                element.setAttribute('children', '.anything');
                element.relationships();
                expect(element.kids().length).to.equal(0);
            });
        });

        it('should interrogate configured html attributes to set floating', () => {
            let floater = 'anything';
            element.setAttribute('float', floater);
            element.floating();
            expect(element.style.float).to.equal(floater);
        });

        it('should interrogate configured html attributes to set positioning', () => {
            let positioner = 'anything';
            element.setAttribute('position', positioner);
            element.positioning();
            expect(element.style.position).to.equal(positioner);
        });

        it('should interrogate configured html attributes to set bounding', () => {
            let height = '1em';
            let width = '2em';
            element.setAttribute('height', height);
            element.setAttribute('width', width);
            element.bounding();
            expect(element.style.height).to.equal(height);
            expect(element.style.width).to.equal(width);
        });

        it('should interrogate configured html attributes to set padding - general', () => {
            let padding = '1em';
            element.setAttribute('padding', padding);
            element.padding();
            expect(element.style.paddingTop).to.equal(padding);
            expect(element.style.paddingBottom).to.equal(padding);
            expect(element.style.paddingLeft).to.equal(padding);
            expect(element.style.paddingRight).to.equal(padding);
        });

        it('should interrogate configured html attributes to set padding - specific', () => {
            let paddingTop = '1em';
            element.setAttribute('padding-top', paddingTop);
            element.padding();
            expect(element.style.paddingTop).to.equal(paddingTop);
            expect(element.style.paddingBottom).not.to.equal(paddingTop);
            expect(element.style.paddingLeft).not.to.equal(paddingTop);
            expect(element.style.paddingRight).not.to.equal(paddingTop);
        });

        it('should interrogate configured html attributes to set bordering', () => {
            let borderWidth = '1em', borderStyle = 'solid', borderColor = 'black';
            element.setAttribute('border-width', borderWidth);
            element.setAttribute('border-style', borderStyle);
            element.setAttribute('border-color', borderColor);
            element.bordering();
            expect(element.style.borderWidth).to.equal(borderWidth);
            expect(element.style.borderStyle).to.equal(borderStyle);
            expect(element.style.borderColor).to.equal(borderColor);
        });

        it('should interrogate configured html attributes to set fonting', () => {
            let fontSize = '1em';
            element.setAttribute('font-size', fontSize);
            element.fonting();
            expect(element.style.fontSize).to.equal(fontSize);
        });

        it('should interrogate configured html attributes to set coloring', () => {
            let color = 'blue';
            let textColor = 'green';
            element.setAttribute('color', color);
            element.setAttribute('text-color', textColor);
            element.coloring();
            expect(element.style.backgroundColor).to.equal(color);
            expect(element.style.color).to.equal(textColor);
        });

        it('should interrogate configured html attributes to set texting', () => {
            let text = 'hello world';
            let decoration = 'underline';
            let textAlign = 'left';
            element.setAttribute('text', text);
            element.setAttribute('decoration', decoration);
            element.setAttribute('text-align', textAlign);
            element.texting();
            expect(element.text).to.equal(text);
            expect(element.style.textDecoration).to.equal(decoration);
            expect(element.style.textAlign).to.equal(textAlign);
        });

    });

});