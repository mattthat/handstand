class Worker {
    constructor(url) {
    }
    postMessage(obj) {
        this.onmessage({data: obj});
    }
}
module.exports = Worker;