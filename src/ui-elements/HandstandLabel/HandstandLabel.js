import './HandstandLabel.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';

export default class HandstandLabel extends HandstandCustomElement {
  onRender() {
    if (this.conditions.properties.innerText)
      this.innerText = this.conditions.properties.innerText;
  }
}
customElements.define('handstand-label', HandstandLabel);
