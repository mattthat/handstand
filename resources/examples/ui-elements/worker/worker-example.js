importScripts('/snapshot/snapshot-worker.min.js');

// a worker example implementation, providing for two workable events one which encodes values 
// and another which uses ajax to get the requesting client ip address 
let worker = new HandstandWorker(self, {
    onEncode: (e) => {
        e.data.payload.encodedValue = btoa(e.data.payload.value);
        worker.work(e.data.work, e.data.payload);
    },
    onGetIP: (e) => {
        Handstand.ajax({
            url: 'http://date.jsontest.com/?service=ip',
            type: 'GET',
            mime: 'application/json',
            on: {
                '200': (req) => {
                    e.data.payload.ip = JSON.parse(req.responseText).ip;
                    worker.work(e.data.work, e.data.payload)
                }
            }
        })
    }   
});