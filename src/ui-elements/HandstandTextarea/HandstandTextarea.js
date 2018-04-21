import './HandstandTextarea.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';

export default class HandstandTextarea extends HandstandCustomElement {
  get value() {
    return this.conditions.properties.value;
  }
  set value(v) {
    this.conditions.properties.value = v;
    this.textarea.value = v;
  }
  constructor(conditions) {
    super(conditions);
    this.conditions.autofocus = conditions.autofocus;
    this.textarea = document.createElement('textarea');
    this.textarea.value = this.conditions.properties.value || '';
    this.on('change', this.onChange.bind(this));
    this.append(this.textarea);
  }
  onChange() {
    if (this.textarea) this.value = this.textarea.value;
  }
  onRender() {
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
}
customElements.define('handstand-textarea', HandstandTextarea);
