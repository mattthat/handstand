require('../harness');

let HandstandModel = require(path.join(__dirname, '../../src/js',
    'handstand-model'));

describe('HandstandModel', () => {

    describe('provisions', () => {

        let model = new HandstandModel();

        it('provides a way to listen to the set event', () => {
            expect(typeof model.onSet).to.equal('function')
        });

        it('provides a way to clear listeners on the set event', () => {
            expect(typeof model.offSet).to.equal('function');
        });

        it('provides a way to listen to the get event', () => {
            expect(typeof model.onGet).to.equal('function');
        });

        it('provides a way to clear listeners on the get event', () => {
            expect(typeof model.offGet).to.equal('function');
        });

        it('provides a way to get attribute values', () => {
            expect(typeof model.Get).to.equal('function');
        });

        it('provides a way to set attribute values', () => {
            expect(typeof model.Set).to.equal('function');
        });

        it('provides a way to serialize the object as JSON', () => {
            expect(typeof model.toJSON).to.equal('function');
        });
    
    });

    describe('method', () => {

        let model;

        beforeEach(() => {
            model = new HandstandModel();
        });

        afterEach(() => {
            model = null;
            model = undefined;
        });

        it('should listen to the set event', () => {
            let x = 'initial';
            model.onSet(function () { x = 'called'; });
            model.Set('x', 'y');
            expect(x).to.equal('called');
        });

        it('should stop listening to the set event when told', () => {
            let x = 'initial';
            model.onSet(function () { x = 'called'; });
            model.Set('test', '123');
            expect(x).to.equal('called');
            model.Set('test', '789');
            x = 'reset-but-not-set-by-event';
            expect(model.Get('test')).to.equal('789');
            expect(x).to.equal('reset-but-not-set-by-event');
            model.offSet(0);
            model.Set('test', 'abc');
            expect(model.Get('test')).to.equal('abc');
            expect(x).to.equal('reset-but-not-set-by-event');

        });

        it('should listen to the get event', () => {
            let x = 'initial';
            model.onGet(function () { x = 'called'; });
            model.Get('x', 'y');
            expect(x).to.equal('called');
        });

        it('should stop listening to the get event when told', () => {
            let x = 'initial';
            model.Set('anything','abc');
            model.onGet(function () { x = 'called'; });
            model.Get('anything');
            expect(x).to.equal('called');
            x = 'reset-but-not-get-event';
            expect(x).to.equal('reset-but-not-get-event');
            model.offGet(0);
            model.Get('anything');
            expect(model.Get('anything')).to.equal('abc');
            expect(x).to.equal('reset-but-not-get-event');

        });

        it('should serialize the object as JSON', () => {
            let json = model.toJSON();
            expect(json).to.equal('{}')
            model.Set('apple', 'orange');
            json = model.toJSON();
            expect(json).to.equal("{\n  \"apple\": \"orange\"\n}")
        });

    });

});
