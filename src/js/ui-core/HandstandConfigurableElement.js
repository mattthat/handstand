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
    configure() {
      this.onConfiguration();
    }
    relationships() {
        var parent = this.getAttribute('parent'),
        children = this.getAttribute('children');
        if (parent) {
            this._boundParent = document.querySelector(parent);
        }
        if (children) {
            this._childSelectors = children;
        }
    }
    parent() {
      return this._boundParent;
    }
    kids() {
        var children = [];
        if (this._childSelectors) {
            var kids = this._childSelectors.split(" ");
            for(var i = 0; i <= kids.length; i++) {
                var kid = kids[i];
                if (kid) {
                    var element = document.querySelector(kid);
                    if (element) children.push(element);
                }
            }
        }
        return children;
    }
    floating() {
       var float = this.getAttribute('float');
        if (float) {
            this.style.float = float;
        }
    }
    positioning() {
        this.style.position = this.getAttribute('position');
    }
    bounding() {
        this.style.width = this.getAttribute('width');
        this.style.height = this.getAttribute('height');
    }
    padding() {
        var padding = this.getAttribute('padding');
        if (!padding) {
            this.style.paddingTop = this.getAttribute('padding-top');
            this.style.paddingBottom = this.getAttribute('padding-bottom');
            this.style.paddingLeft = this.getAttribute('padding-left');
            this.style.paddingRight = this.getAttribute('padding-right');
        } else {
            this.style.paddingTop = padding;
            this.style.paddingBottom = padding;
            this.style.paddingLeft = padding;
            this.style.paddingRight = padding;
        }
    }
    bordering() {
        this.style.borderColor = this.getAttribute('border-color');
        this.style.borderWidth = this.getAttribute('border-width');
        this.style.borderStyle = this.getAttribute('border-style');
        this.style.borderRadius = this.getAttribute('border-radius');
    }
    fonting() {
        this.style.fontSize = this.getAttribute('font-size');
    }
    coloring() {
        this.style.color = this.getAttribute('text-color');
        this.style.backgroundColor = this.getAttribute('color');
    }
    texting() {
        this.text = this.getAttribute('text');
        this.style.textDecoration = this.getAttribute('decoration');
        this.style.textAlign = this.getAttribute('text-align');
    }
}
try { module.exports = HandstandConfigurableElement; } catch(x) {}