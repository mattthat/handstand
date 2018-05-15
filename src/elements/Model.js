import AbstractCustomElement from '../abstracts/AbstractCustomElement.js';
export default class Model extends AbstractCustomElement {
  onCreate() {
    this.dimensions = this.conditions.properties;
  }
  onRender() {
    this.innerText = this.stringify();
  }
  onAttach() {
    this.innerText = this.stringify();
  }
  get(key) {
    return this.dimensions[key];
  }
  set(key, value) {
    const detail = {
      key: key,
      changed: this.dimensions[key] !== value,
      before: JSON.parse(JSON.stringify(this.dimensions[key])),
      after: value
    };
    this.dimensions[key] = value;
    this.dispatchEvent(new CustomEvent('set', { detail: detail }));
    if (typeof this.conditions.events.onSet === 'function')
      this.conditionss.events.onSet.call(this, detail);
  }
  stringify() {
    return JSON.stringify(this.dimensions, null, 2);
  }
}
customElements.define('handstand-model', Model);
