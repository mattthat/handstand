import ElementEventObserver from '../observers/ElementEventObserver.js';
export default class AbstractCustomElement extends HTMLElement {
  constructor(conditions) {
    super();
    this.conditions = {
      id: '',
      css: '',
      properties: {},
      events: {}
    };
    this.construct(conditions);
    this._elementEventObserver = new ElementEventObserver(this);
    if (typeof conditions === 'object') {
      if (typeof conditions.properties === 'object')
        this.conditions.properties = conditions.properties;
      if (typeof conditions.events === 'object')
        this.conditions.events = conditions.events;
      if (conditions.id && conditions.id.length)
        this.conditions.id = conditions.id;
      if (conditions.css && conditions.css.length)
        this.conditions.css = conditions.css;
    }
    if (this.conditions.id.length > 0)
      this.setAttribute('id', this.conditions.id);
    if (this.conditions.css.length > 0)
      this.setAttribute('class', this.conditions.css);
    this.create(conditions);
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
  on(type, method) {
    this._elementEventObserver.on(type, method);
  }
  off(type, method) {
    this._elementEventObserver.off(type, method);
  }
  connectedCallback() {
    if (!this.rendered) {
      this.render.call(this);
      this.rendered = true;
      const that = this;
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
      const that = this;
      setTimeout(() => {
        that.onDetach.call(that);
        that.dispatchEvent(new Event('detach'));
      }, 0);
    } else {
      this.onDetach.call(this);
      this.dispatchEvent(new Event('detach'));
    }
  }
  onConstruct() {}
  OnCreate() {}
  onAttach() {}
  onDetach() {}
}
