import './HandstandButton.css';
import HandstandCustomElement from '../../ui-core/HandstandCustomElement.js';

export default class HandstandButton extends HandstandCustomElement {
  onAttach() {
    if (typeof this.conditions.events.onClick === 'function')
      this.on('click', this.conditions.events.onClick.bind(this));
  }
  onDetach() {
    if (typeof this.conditions.events.onClick === 'function')
      this.off('click', this.conditions.events.onClick.bind(this));
  }
}
customElements.define('handstand-button', HandstandButton);
