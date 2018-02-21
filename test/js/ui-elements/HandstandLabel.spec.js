require('../../ui-core_harness');

let HandstandLabel = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandLabel.js'));

describe('HandstandLabel', () => {
    
    describe('provisions', () => {
 
        let element = new HandstandLabel();

        it('extends HandstandConfigurableElement', () => {
            expect(element instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a template property', () => {
            expect(element.template).to.equal('<div></div>');
        });

        it('provides a div property', () => {
            expect(element.div).not.to.equal(undefined);
        });

        it('provides a value property', () => {
            expect(element.value).to.equal('');
        });
    });


    describe('properties', () => {

        describe('value', () => {

            it('should meet initial and causal expectations', () => {
                let initial = 'test123',
                causal = 'test456',
                element = new HandstandLabel({}, { value: initial });
                expect(element.value).to.equal(initial);
                element.value = causal;
                expect(element.value).to.equal(causal);
            });

        });

    });

    describe('methods', () => {

        describe('lifecycle', () => {
        
            it('should render', () => {
                let text = 'test 123';
                let element = new HandstandLabel({}, { value: text });
                element.childNodes.push({ innerText: '' });
                element.render();
                expect(element.value).to.equal(text);
            });
            
        });

    });

});