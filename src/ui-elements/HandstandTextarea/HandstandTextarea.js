import './HandstandTextarea.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';

export default class HandstandTextarea extends HandstandCustomElement {
  get value() {
    return this.textarea.value;
  }
  set value(v) {
    this.conditions.properties.value = v;
    this.textarea.value = v;
  }
  onCreate(conditions) {
    this.conditions.autofocus = conditions.autofocus;
    this.textarea = document.createElement('textarea');
    this.textarea.value = this.conditions.properties.value || '';
    this.append(this.textarea);
  }
  onChange() {
    this.value = this.textarea.value;
  }
  onAttach() {
    this.on('change', this.onChange.bind(this));
    if (this.conditions.autofocus) this.textarea.setAttribute('autofocus', '');
    if (this.conditions.properties.placeHolder)
      this.textarea.placeholder = this.conditions.properties.placeHolder;
    if (typeof this.conditions.events.onKeyUp === 'function')
      this.textarea.onkeyup = this.conditions.events.onKeyUp.bind(this);
    if (typeof this.conditions.events.onKeyDown === 'function')
      this.textarea.onkeydown = this.conditions.events.onKeyDown.bind(this);
    if (typeof this.conditions.events.onKeyPress === 'function')
      this.textarea.onkeypress = this.conditions.events.onKeyPress.bind(this);
    if (typeof this.conditions.events.onChange === 'function')
      this.textarea.onchange = this.conditions.events.onChange.bind(this);
  }
  onDetach() {
    this.off('change', this.onChange.bind(this));
    this.textarea.onkeyup = undefined;
    this.textarea.onkeydown = undefined;
    this.textarea.onkeypress = undefined;
    this.textarea.onchange = undefined;
  }
}
customElements.define('handstand-textarea', HandstandTextarea);
