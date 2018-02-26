export class HandstandWorker {
    get onmessage() {
        return this.worker.onmessage;
    }
    set onmessage(m) {
        this.worker.onmessage = m;
    }
    constructor(worker, roadmap) {
        if (worker) {
            if (typeof worker === 'string') {
               this.worker = new Worker(worker);
               this.ready(roadmap);
            } else {
                if (this._validWorker(worker)) {
                    this.worker = worker;
                    this.ready(roadmap);
                }
            }
        }
    }
    _validWorker(worker) {
        let valid;
        if (worker && 
            worker.postMessage &&
            typeof worker === 'object' &&
            typeof worker.postMessage === 'function' && 
            ( worker.onmessage === null || 
                typeof worker.onmessage === 'function' )) {
            valid = true;
        } else {
            valid = false;
        }
        return valid;
    }
    _validDestination(e) {
        let valid;
        if (e && e.data && e.data.work && this.roadmap &&
            typeof this.roadmap[e.data.work] === 'function') {
            valid = true;
        } else {
            valid = false;
        }
        return valid;
    }
    ready(roadmap) {
        if (roadmap && Object.keys(roadmap).length > 0) {
            this.roadmap = roadmap;
            this.onmessage = this.map.bind(this);
        }
    }
    map(e) {
        if (this._validDestination(e)) {
            this.roadmap[e.data.work](e);
        }
    }
    work(work, payload) {
        if (this._validWorker(this.worker) && work) {
            this.worker.postMessage({
                work: work,
                payload: payload
            });
        }
    }
}
module.exports = HandstandWorker;