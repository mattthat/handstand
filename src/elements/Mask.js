import './Mask/Mask.css';
import AbstractCustomElement from '../abstracts/AbstractCustomElement.js';
export default class Mask extends AbstractCustomElement {
  get state() {
    return this.getAttribute('state');
  }
  set state(state) {
    this.setAttribute('state', state);
    if (state === 'shown') {
      this.show();
    } else {
      this.hide();
    }
  }
  onCreate() {
    if (!this.conditions.properties.selector)
      this.conditions.properties.selector = 'body';
    this.state = 'hidden';
    this.masked = document.querySelector(this.conditions.properties.selector);
    if (this.masked) {
      this.masked.prepend(this);
    }
  }
  hide() {
    this.style.display = 'none';
    if (this.state !== 'hidden') this.setAttribute('state', 'hidden');
    if (typeof this.conditions.events.onHide === 'function')
      this.conditions.event.onHide.call(this);
    return this;
  }
  show() {
    this.style.display = 'block';
    if (this.state !== 'shown') this.setAttribute('state', 'shown');

    if (typeof this.conditions.events.onShow === 'function')
      this.conditions.events.onShow.call(this);
    return this;
  }
}
customElements.define('handstand-mask', Mask);
