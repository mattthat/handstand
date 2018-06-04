import './Container/Container.css';
import AbstractCustomElement from '../abstracts/AbstractCustomElement.js';
export default class Container extends AbstractCustomElement {
  onCreate() {
    this.conditions.properties.opened = true;
    this.setAttribute('open', 'true');
  }
  contents() {
    return Array.from(this.children).filter(child => {
      if (child instanceof AbstractCustomElement) return child;
    });
  }
  open() {
    if (!this.conditions.properties.opened) {
      this.conditions.properties.opened = true;
      this.setAttribute('open', 'true');
    }
    if (typeof this.conditions.events.onOpen === 'function')
      this.conditions.events.onOpen.call(this);
    return this;
  }
  close() {
    if (this.conditions.properties.opened) {
      this.conditions.properties.opened = false;
      this.setAttribute('open', 'false');
    }
    if (typeof this.conditions.events.onClose === 'function')
      this.conditions.events.onClose.call(this);
    return this;
  }
}
customElements.define('handstand-container', Container);
