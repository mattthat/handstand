import './Toggle/Toggle.css';
import AbstractCustomElement from '../abstracts/AbstractCustomElement.js';
import WrappedElement from './WrappedElement.js';
export default class Toggle extends AbstractCustomElement {
  get value() {
    return this.conditions.properties.on;
  }
  set value(v) {
    this.conditions.properties.on = v;
    this.input.innerElement.checked = v;
  }
  onCreate() {
    Toggle.unique++;
    let on = this.conditions.properties.on;
    if (on === undefined) on = true;

    this.input = new WrappedElement('input');
    this.input.innerElement.type = 'checkbox';
    this.input.innerElement.checked = on;
    this.input.setAttribute('name', 'toggle-' + Toggle.unique);

    this.label = new WrappedElement('label');
    this.label.setAttribute('for', 'toggle-' + Toggle.unique);

    this.div = new WrappedElement('div');
    this.div.append(this.input.innerElement);
    this.div.append(this.label.innerElement);
    this.append(this.div.innerElement);
  }
  onClick() {
    if (this.value === true) {
      this.value = false;
    } else {
      this.value = true;
    }
    this.dispatchEvent(new CustomEvent('toggle'));
  }
  onAttach() {
    this.on('click', this.onClick.bind(this));
  }
  onDetach() {
    this.off('click', this.onClick.bind(this));
  }
}
Toggle.unique = 0;
customElements.define('handstand-toggle', Toggle);
