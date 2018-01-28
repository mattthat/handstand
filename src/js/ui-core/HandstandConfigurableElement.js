class HandstandConfigurableElement extends HandstandElement {
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
    }
    configure() {
      this.onConfiguration();
    }
    onConfiguration() {
        this.configureMonitoring();
        this.configureTwoway();
    }
    onRender() {
        this.setUp();
        this.buildUp();
    }
    defaults() {
        let uid = () => {
            if (!HandstandConfigurableElement.unique) HandstandConfigurableElement.unique = 0;
            HandstandConfigurableElement.unique++;
            return HandstandConfigurableElement.unique;
        };
        if (!this.id) this.id = uid();
    }
    setUp() {
    }
    buildUp() {
    }
    configureMonitoring() {
        var monitoring = this.getAttribute('monitor');
        if (monitoring === 'true' && this.id && !this.monitoring) {
            this.monitoring = true;
            this.on('change', this.onChange.bind(this));
        } else {
            this.monitoring = false;
        }
    }
    configureTwoway() {
        var twoway = this.getAttribute('twoway');
        if (twoway === 'true' && !this.twoway) {
            this.twoway = true;
            this.model.onSet(this.onSetHandler.bind(this));
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
        this.off('change', this.onChange.bind(this));
        this.monitoring = false;
    }
    ripDown() {
       if (this.monitoring) this.stopMonitoring();
    }
}
try { module.exports = HandstandConfigurableElement; } catch(x) {}