import './MutableLabel.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';
import HandstandLabel from '../../ui-elements/HandstandLabel/HandstandLabel.js';
import HandstandTextarea from '../../ui-elements/HandstandTextarea/HandstandTextarea.js';

export default class MutableLabel extends HandstandCustomElement {
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
    this.mutable = new HandstandTextarea({
      properties: {
        value: this.conditions.properties.value
      }
    });
    this.label = new HandstandLabel({
      properties: {
        innerText: this.conditions.properties.value
      }
    });
    this.append(this.label);
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
    this.append(this.label);
  }
  change() {
    this.value = this.label.innerText;
    this.label.remove();
    this.mutable.value = this.value;
    this.append(this.mutable);
    this.mutable.textarea.focus();
  }
}
customElements.define('mutable-label', MutableLabel);
