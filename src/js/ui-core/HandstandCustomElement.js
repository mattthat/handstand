export default class HandstandCustomElement extends HTMLElement {
    constructor(conditions) {
        super();
        this.conditions = {
            id: '',
            css: '',
            properties: {
            },
            events: {
            },
            observant: false
        };
        if (typeof conditions === 'object') {
           if (typeof conditions.properties === 'object')
               this.conditions.properties = conditions.properties;
           if (typeof conditions.events === 'object')
               this.conditions.events = conditions.events;
           if (conditions.observant) this.conditions.observant = true;
        }
        if (this.conditions.observant) this._observe();
        if (this.conditions.id.length > 0)
            this.setAttribute('id', this.conditions.properties.id);
        if (this.conditions.css.length > 0)
            this.setAttribute('class', this.conditions.properties.css);
    }
    _observe() {
        this.observer = new MutationObserver( (mutationsList) => {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList' &&
                    typeof this.onChildListMutation === 'function')
                    this.onChildListMutation.call(this);
                if (mutation.type == 'attributes' &&
                    typeof this.onAttributeMutation === 'function')
                    this.onAttributeMutation.call(this);
            }
        });
        this.observer.observe(this, {attributes: true, childList: true});
    }
    render() {
        if (typeof this.onRender === 'function')
            this.onRender.call(this);
        this.dispatchEvent(new Event('render'));
    }
    on(event, method) {
        this.addEventListener(event, method.bind(this));
    }
    off(event, method) {
        this.removeEventListener(event, method.bind(this));
    }
    connectedCallback() {
        let that = this;
        if (!that.rendered) {
            that.render.call(that);
            that.rendered = true;
            setTimeout( () => {
                that.onAttached.call(that)
                that.dispatchEvent(new Event('attached'));
            }, 0)
        } else {
            this.onAttached.call(this);
        }
    }
    disconnectedCallback() {
        this.onDetached.call(this);
        this.dispatchEvent(new Event('detached'));
    }
    onChildListMutation() {
    }
    onAttributeMutation() {
    }
    onAttached() {
    }
    onDetached() {
    }
}