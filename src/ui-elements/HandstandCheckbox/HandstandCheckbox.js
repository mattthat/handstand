import './HandstandCheckbox.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';

export default class HandstandCheckbox extends HandstandCustomElement {
  get value() {
    return this.input.checked;
  }
  set value(v) {
    this.conditions.properties.checked = v;
    this.input.checked = v;
  }
  onCreate() {
    if (this.conditions.properties.checked === undefined)
      this.conditions.properties.checked = true;
    this.input = document.createElement('input');
    this.input.type = 'checkbox';
    this.input.checked = this.conditions.properties.checked;
    this.append(this.input);
  }
  onChange() {
    this.value = this.input.checked;
  }
  onAttach() {
    this.on('change', this.onChange.bind(this));
    if (typeof this.conditions.events.onChange === 'function')
      this.input.onchange = this.conditions.events.onChange.bind(this);
  }
  onDetach() {
    this.off('change', this.onChange.bind(this));
    this.input.onchange = undefined;
  }
}
customElements.define('handstand-checkbox', HandstandCheckbox);
