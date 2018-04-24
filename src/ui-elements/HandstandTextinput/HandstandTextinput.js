import './HandstandTextinput.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';

export default class HandstandTextinput extends HandstandCustomElement {
  get value() {
    return this.input.value;
  }
  set value(v) {
    this.conditions.properties.value = v;
    this.input.value = v;
  }
  onCreate() {
    this.input = document.createElement('input');
    this.input.value = this.conditions.properties.value || '';
    this.append(this.input);
  }
  onInput() {
    this.value = this.input.value;
  }
  onAttach() {
    this.on('input', this.onInput.bind(this));
    if (this.conditions.properties.placeHolder)
      this.input.placeholder = this.conditions.properties.placeHolder;
    if (typeof this.conditions.events.onKeyUp === 'function')
      this.input.onkeyup = this.conditions.events.onKeyUp.bind(this);
    if (typeof this.conditions.events.onKeyDown === 'function')
      this.input.onkeydown = this.conditions.events.onKeyDown.bind(this);
    if (typeof this.conditions.events.onKeyPress === 'function')
      this.input.onkeypress = this.conditions.events.onKeyPress.bind(this);
    if (typeof this.conditions.events.onChange === 'function')
      this.input.onchange = this.conditions.events.onChange.bind(this);
  }
  onDetach() {
    this.off('input', this.onInput.bind(this));
    this.input.onkeyup = undefined;
    this.input.onkeydown = undefined;
    this.input.onkeypress = undefined;
    this.input.onchange = undefined;
  }
}
customElements.define('handstand-textinput', HandstandTextinput);
