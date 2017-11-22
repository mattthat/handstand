require('../../worker_harness');
global.Worker = require('../../mocks/mockWorker.js');

let HandstandWorker = require(path.join(__dirname, '../../../src/js/worker',
    'HandstandWorker.js'));

describe('HandstandWorker', () => {

    let worker = new HandstandWorker('/any/path/worker.js', {
        something: () => { }
    });

    describe('provisions', () => {
        
        it('should provide an onmessage property', () => {
            expect(typeof worker.onmessage).to.equal('function');
        });

        it('should provide a way to become ready', () => {
            expect(typeof worker.ready).to.equal('function');
        });

        it('should provide a way to map destinations to the method to execute', () => {
            expect(typeof worker.map).to.equal('function');
        });

        it('should provide a way to perform work', () => {
            expect(typeof worker.work).to.equal('function');
        })

    });

    describe('methods', () => {

        describe('construction', () => {

            it('should construct when worker is a string', () => {
                let hsworker = new HandstandWorker('/any/path/worker.js');
                expect(hsworker.worker instanceof Worker).to.equal(true);
            });

            it('should construct when worker is a Worker', () => {
                let worker = new Worker('/any/path/worker.js');
                worker.onmessage = () => { }
                let hsworker = new HandstandWorker(worker);
                expect(hsworker.worker instanceof Worker).to.equal(true);
            });

            it('should not construct when worker is null', () => {
                let hsworker = new HandstandWorker(null);
                expect(hsworker.worker instanceof Worker).to.equal(false);
            });

            it('should not construct when worker is invalid', () => {
                let hsworker = new HandstandWorker({});
                expect(hsworker.worker instanceof Worker).to.equal(false);
            });

            it('should rely on ready during construction', () => {
                let spy = sinon.spy(HandstandWorker.prototype, 'ready');
                let hsworker = new HandstandWorker('/any/path/worker.js');
                expect(spy.called).to.equal(true);
            });
        
        });

        describe('_validWorker', () => {

            let hsworker = new HandstandWorker('/any/path/worker.js', {
                work: (forMe) => {}
            });
            
            it('should return true when the worker is valid', () => {
                expect(hsworker._validWorker({
                    onmessage: () => {},
                    postMessage: () => {}
                })).to.equal(true);
            });

            it('should return false when the worker is not valid', () => {
                expect(hsworker._validWorker(null)).to.equal(false);
            });

        });

        describe('_validDestination', () => {

            let hsworker = new HandstandWorker('/any/path/worker.js', {
                doSomething: (forMe) => {}
            });
            
            it('should return true when the destination is valid', () => {
                expect(hsworker._validDestination({
                    data: {
                        work: 'doSomething',
                        payload: 'some info'
                    }
                })).to.equal(true);
            });

            it('should return false when the destination is not valid', () => {
                expect(hsworker._validDestination(null)).to.equal(false);
            });

        });

        describe('ready', () => {

            it('should assign a roadmap during ready when provided a roadmap', () => {
                let roadmap = {
                    onFoo: () => {}
                },
                hsworker = new HandstandWorker('/any/pth/worker.js');
                expect(hsworker.roadmap).to.equal(undefined);
                hsworker.ready(roadmap);
                expect(hsworker.roadmap).to.equal(roadmap);
            });

        });

        describe('map', () => {

            it('should map execution to onFoo', () => {
                let stuff = { onFoo: () => { } },
                spy = sinon.spy(stuff, 'onFoo'),
                hsworker = new HandstandWorker('/any/path/worker.js', {
                    onFoo: stuff.onFoo
                });
                hsworker.map({data: { work: 'onFoo', payload: {} } });
                expect(spy.called).to.equal(true);
            });

            it('should not map execution to onFoo', () => {
                let stuff = { onFoo: () => { } },
                spy = sinon.spy(stuff, 'onFoo'),
                hsworker = new HandstandWorker('/any/path/worker.js', {
                    onFoo: stuff.onFoo
                });
                hsworker.map({data: { work: 'onDoo', payload: {} } });
                expect(spy.called).to.equal(false);
            });

        });

        describe('work', () => {

            it('should work when provided a work argument', () => {
                let foo = '', bar = 'bar',
                stuff = { onFoo: (e) => { foo = bar } },
                hsworker = new HandstandWorker('/any/path/worker.js', {
                    onFoo: stuff.onFoo.bind(stuff)
                }),
                postSpy = sinon.spy(hsworker.worker, 'postMessage');
                hsworker.work('onFoo');
                expect(foo).to.equal(bar);
                expect(postSpy.called).to.equal(true);
                hsworker.worker.postMessage.restore();
            });

            it('should work when provided a work argument and payload argument', () => {
                let foo = '', bar = 'bar',
                stuff = { onFoo: (e) => { foo = e.data.payload.foo } },
                hsworker = new HandstandWorker('/any/path/worker.js', {
                    onFoo: stuff.onFoo.bind(stuff)
                }),
                postSpy = sinon.spy(hsworker.worker, 'postMessage');
                hsworker.work('onFoo', {
                    foo: bar
                });
                expect(foo).to.equal(bar);
                expect(postSpy.called).to.equal(true);
                hsworker.worker.postMessage.restore();
            });

            it('should not work but not throw when worker is invalid', () => {
                let hsworker = new HandstandWorker(null);
                expect(hsworker.work('sure')).not.to.throw;
            });

        });

    });

});