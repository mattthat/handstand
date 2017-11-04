class Handstand extends HandstandConfigurableElement {
    constructor(attributes) {
        super();
        this.model = new HandstandModel();
        if (attributes) {
            let keys = Object.keys(attributes);
            for(let i = 0; i <= keys.length-1; i++) {
                let key = keys[i];
                this.setAttribute(key, attributes[key]);
            }
        }
        this.defaults();
        this.configure();
        this.configureMonitoring();
        this.configureTwoway();
    }
    onConfiguration() {
        this.relationships();
        this.floating();
        this.positioning();
        this.bounding();
        this.padding();
        this.bordering();
        this.fonting();
        this.coloring();
        this.texting();
    }
    onBeforeRender() {
        this.setUp();
    }
    onAfterRender() {
        this.buildUp();
    }
    defaults() {
        let uid = () => {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        };
        let s4 = () => { return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        };
        if (!this.id) this.id = uid();
    }
    setUp() {
    }
    buildUp() {
    }
    configureMonitoring() {
        var monitoring = this.getAttribute('monitor');
        if (monitoring === 'true') {
            this.monitoring = true
        } else {
            this.monitoring = false;
        }
    }
    configureTwoway() {
        var twoway = this.getAttribute('twoway');
        if (twoway === 'true') {
            this.twoway = true;
        } else {
            this.twoway = false;
        }
    }
    onSetHandler(key, value, model) {
    }
    onChange(e) {
        this.model.Set('value', e.target.value);
    }
    stopMonitoring() {
    }
    ripDown() {
       if (this.monitoring) this.stopMonitoring();
    }
}
try { module.exports = Handstand; } catch(x) {}