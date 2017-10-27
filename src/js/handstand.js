class Handstand extends HandstandConfigurableElement {
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
        this.defaults();
        this.model = new HandstandModel();
        this.setUp();
    }
    onAfterRender() {
        this.configureMonitoring();
        this.configureTwoway();
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
        HandstandEventManager.clear(this.id, this.onChange)
    }
    ripDown() {
       if (this.monitoring) this.stopMonitoring();
    }
}
try { module.exports = Handstand; } catch(x) {}