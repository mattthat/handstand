require('../../ui-core_harness');

let HandstandLabel = require(path.join(__dirname, '../../../src/js/ui-elements',
    'HandstandLabel.js'));

describe('HandstandLabel', () => {
    
    describe('provisions', () => {

        let label = new HandstandLabel();

        it('extends HandstandConfigurableElement', () => {
            expect(label instanceof HandstandConfigurableElement).to.equal(true);
        });

        it('provides a template property', () => {
            expect(label.template).to.equal('<div bind>{{label}}</div>');
        });


    });

    describe('methods', () => {

        describe('lifecycle', () => {
        
            it('should render', () => {
                let text = 'test 123';
                let label = new HandstandLabel({ label: text });
                label.render();
                expect(label.label).to.equal(text);
            });
            
        });

    });

});