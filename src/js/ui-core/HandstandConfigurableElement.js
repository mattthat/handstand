export class HandstandConfigurableElement extends HandstandElement {
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
        super.onRender.call(this);
    }
    defaults() {
        let uid = () => {
            if (!HandstandConfigurableElement.unique) HandstandConfigurableElement.unique = 0;
            HandstandConfigurableElement.unique++;
            return HandstandConfigurableElement.unique;
        };
        if (!this.id) this.id = uid();
    }
    configureMonitoring() {
        let monitoring = this.getAttribute('monitor');
        if (monitoring === 'false') {
            this.monitoring = false;
        } else {
            if (!this.monitoring && this.id) {
               this.monitoring = true;
               this.on('change', this.onChange.bind(this));
            }
        }
    }
    configureTwoway() {
        let twoway = this.getAttribute('twoway'); 
        if (twoway === 'false') {
            this.twoway = false;
        } else {
            this.twoway = true;
            this.model.onSet(this.onSetHandler.bind(this));
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
}
module.exports = HandstandConfigurableElement;