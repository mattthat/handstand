export class HandstandModel {
    onSet(method) {
        if (!this.setEventHandler)
            this.setEventHandler = [];
        this.setEventHandler.push( (key, value, model) => {
            method(key, value, model);
        });
    }
    offSet(index) {
        if (!index) index = 0;
        if (this.setEventHandler && this.setEventHandler.length > 0 &&
         this.setEventHandler[index]) {
            delete this.setEventHandler[index];
        }
    }
    onGet(method) {
        if (!this.getEventHandler)
            this.getEventHandler = [];
        this.getEventHandler.push( (key, value, model) => {
            method(key, value, model);
        });
    }
    offGet(index) {if (!index) index = 0;
        if (this.getEventHandler && this.getEventHandler.length > 0 &&
            this.getEventHandler[index]) {
            delete this.getEventHandler[index];
        }
    }
    Get(key) {
        if (!this.dimensions)
            this.dimensions = {};
        if (this.getEventHandler && this.getEventHandler.length > 0) {
            let that = this;
            this.getEventHandler.forEach( (method) => {
                method(key, that.dimensions[key], that)
            });
        }
        return this.dimensions[key];
    }
    Set(key, value) {
        if (!this.dimensions)
            this.dimensions = {};
        this.dimensions[key] = value;
        if (this.setEventHandler && this.setEventHandler.length > 0) {
            let that = this;
            this.setEventHandler.forEach( (method) => {
                method(key, value, that)
            });
        }
    }
    toJSON() {
        if (!this.dimensions)
            this.dimensions = {};
        let json;
        try {
            json = JSON.stringify(this.dimensions, null, 2);
        } catch(x) {
        }
        return json;
    }
}
module.exports = HandstandModel;