require('../../core_harness');

let Handstand = require(path.join(__dirname, '../../../src/js/core',
    'Handstand.js'));

describe('Handstand', () => {

    describe('provisions', () => {

        it('should provide a way to make ajax requests', () => {
            expect(typeof Handstand.ajax).to.equal('function');
        });

        it('should provide a way to execute code after the DOMContentLoaded event', () => {
            expect(typeof Handstand.loaded).to.equal('function');
        });

    });

    describe('methods', () => {

        describe('ajax', () => {

            it('should execute GET type ajax requests and rely on status 0 callback', () => {
                let x = 0, clock = sinon.useFakeTimers();
                Handstand.ajax({
                    url: 'http://date.jsontest.com/?service=ip',
                    type: 'GET',
                    mime: 'application/json',
                    timeout: 1,
                    on: { '0': () => { x = 1; } }
                });
                clock.tick(1);
                expect(x).to.equal(1);
            });

            it('should execute GET type ajax requests and rely on the any callback', () => {
                let x = 0, clock = sinon.useFakeTimers();
                Handstand.ajax({
                    url: 'http://date.jsontest.com/?service=ip',
                    type: 'GET',
                    mime: 'application/json',
                    timeout: 1,
                    on: { '*': () => { x = 1; } }
                });
                clock.tick(1);
                expect(x).to.equal(1);
            });

            it('should execute GET type ajax requests with miniml arguments supplied', () => {
                let spy = sinon.spy(XMLHttpRequest.prototype, 'open');
                Handstand.ajax({
                    url: 'http://date.jsontest.com/?service=ip',
                    type: 'POST',
                    data: 'yeh!'
                });
                expect(spy.called).to.equal(true);
            });

        });

        describe('loaded', () => {

            it('should execute code after the DOMContentLoaded event', () => {
                let x = 0;
                Handstand.loaded( () => {
                    x = 1;
                });
                document.dispatchEvent( new Event('DOMContentLoaded'));
                expect(x).to.equal(1);
            });

        });

    });

});