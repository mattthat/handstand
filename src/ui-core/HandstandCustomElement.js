export default class HandstandCustomElement extends HTMLElement {
  constructor(conditions) {
    super();
    this.conditions = {
      id: '',
      css: '',
      properties: {},
      events: {},
      observant: false
    };
    this.construct(conditions);
    if (typeof conditions === 'object') {
      if (typeof conditions.properties === 'object')
        this.conditions.properties = conditions.properties;
      if (typeof conditions.events === 'object')
        this.conditions.events = conditions.events;
      if (conditions.observant) this.conditions.observant = true;
      if (conditions.id && conditions.id.length)
        this.conditions.id = conditions.id;
      if (conditions.css && conditions.css.length)
        this.conditions.css = conditions.css;
    }
    if (this.conditions.observant) this._observe();
    if (this.conditions.id.length > 0)
      this.setAttribute('id', this.conditions.id);
    if (this.conditions.css.length > 0)
      this.setAttribute('class', this.conditions.css);
    this.create(conditions);
  }
  _observe() {
    this.observer = new MutationObserver(mutationsList => {
      for (var mutation of mutationsList) {
        if (
          mutation.type === 'childList' &&
          typeof this.onChildListMutation === 'function'
        )
          this.onChildListMutation.call(this);
        if (
          mutation.type === 'attributes' &&
          typeof this.onAttributeMutation === 'function'
        )
          this.onAttributeMutation.call(this);
      }
    });
    this.observer.observe(this, { attributes: true, childList: true });
  }
  construct(conditions) {
    if (typeof this.onConstruct === 'function')
      this.onConstruct.call(this, conditions);
  }
  create(conditions) {
    if (typeof this.onCreate === 'function')
      this.onCreate.call(this, conditions);
  }
  render() {
    if (typeof this.onRender === 'function') this.onRender.call(this);
    this.dispatchEvent(new Event('render'));
  }
  dismantle() {
    if (typeof this.onDismantle === 'function') this.onDismantle.call(this);
    this.dispatchEvent(new Event('dismantle'));
  }
  on(event, method) {
    if (event && method) this.addEventListener(event, method.bind(this));
  }
  off(event, method) {
    if (event && method) this.removeEventListener(event, method.bind(this));
  }
  connectedCallback() {
    if (!this.rendered) {
      this.render.call(this);
      this.rendered = true;
      let that = this;
      setTimeout(() => {
        that.onAttach.call(that);
        that.dispatchEvent(new Event('attach'));
      }, 0);
    } else {
      this.onAttach.call(this);
      this.dispatchEvent(new Event('attach'));
    }
  }
  disconnectedCallback() {
    if (!this.dismantled) {
      this.dismantle.call(this);
      this.dismantled = true;
      let that = this;
      setTimeout(() => {
        that.onDetach.call(that);
        that.dispatchEvent(new Event('detach'));
      }, 0);
    } else {
      this.onDetach.call(this);
      this.dispatchEvent(new Event('detach'));
    }
  }
  onChildListMutation() {}
  onAttributeMutation() {}
  onAttach() {}
  onDetach() {}
}
