import './HandstandLabel.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';

export default class HandstandLabel extends HandstandCustomElement {
  constructor(conditions) {
    super(conditions);
  }
  onRender() {
    if (this.conditions.properties.innerText)
      this.innerText = this.conditions.properties.innerText;
  }
}
customElements.define('handstand-label', HandstandLabel);
