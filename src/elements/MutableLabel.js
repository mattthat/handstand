import './MutableLabel/MutableLabel.css';
import AbstractCustomElement from '../abstracts/AbstractCustomElement.js';
import WrappedElement from './WrappedElement.js';
export default class MutableLabel extends AbstractCustomElement {
  get state() {
    return this.getAttribute('state');
  }
  set state(state) {
    this.setAttribute('state', state);
    if (state === 'mutable') {
      this.change();
    } else {
      this.model();
    }
  }
  get value() {
    return this.conditions.properties.value;
  }
  set value(v) {
    this.conditions.properties.value = v;
    this.label.innerText = v;
    this.mutable.value = v;
  }
  onCreate() {
    this.setAttribute('state', 'modeled');
    this.mutable = new WrappedElement('textarea');
    this.mutable.value = this.conditions.properties.value;
    this.label = new WrappedElement('label');
    this.label.value = this.conditions.properties.value;
    this.append(this.label.innerElement);
  }
  onClick() {
    if (this.state === 'modeled') this.state = 'mutable';
  }
  onFocusOut() {
    if (this.state === 'mutable') this.state = 'modeled';
  }
  onAttach() {
    this.on('click', this.onClick.bind(this));
    this.on('focusout', this.onFocusOut.bind(this));
  }
  onDetach() {
    this.off('click', this.onClick.bind(this));
    this.off('focusout', this.onFocusOut.bind(this));
  }
  model() {
    this.value = this.mutable.value;
    this.mutable.remove();
    this.label.innerText = this.value;
    this.append(this.label.innerElement);
  }
  change() {
    this.value = this.label.innerText;
    this.label.remove();
    this.mutable.value = this.value;
    this.append(this.mutable.innerElement);
    this.mutable.innerElement.focus();
  }
}
customElements.define('handstand-mutablelabel', MutableLabel);
