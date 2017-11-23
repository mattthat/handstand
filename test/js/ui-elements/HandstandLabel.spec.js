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

        it('provides a way to do the "setUp" lifecycle phase', () => {
            expect(typeof label.setUp).to.equal('function');
        });

        it('provides a way to do the "buildUp" lifecycle phase', () => {
            expect(typeof label.buildUp).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('lifecycle', () => {
        
            it('should setUp', () => {
                let text = 'test 123';
                let label = new HandstandLabel();
                label.setAttribute('label', text);
                label.setUp();
                expect(label.label).to.equal(text);
            });

            it('should buildUp', () => {
                let label = new HandstandLabel();
                label.childNodes[0] = label.template;
                label.render();
                expect(label.div).to.equal(label.template);
            });
            
        });

    });

});