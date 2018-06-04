import './WaitingMask/WaitingMask.css';
import Mask from './Mask.js';
import AbstractCustomElement from '../abstracts/AbstractCustomElement.js';
import WrappedElement from './WrappedElement.js';
import WaitingMaskState from './WaitingMask/WaitingMaskState.js';
export default class WaitingMask extends AbstractCustomElement {
  onCreate() {
    this.section = new WrappedElement('section');
    /**
     * This is a {@link Mask}.
     */
    this.mask = new Mask();
    this.mask.append(this);
    /**
     * This is a {@link WaitingMaskState}.
     */
    this.state = WaitingMaskState.Hidden;
    this.append(this.section.innerElement);
  }
  show() {
    this.state = WaitingMaskState.Shown;
    this.mask.show();
    return this;
  }
  hide() {
    this.state = WaitingMaskState.Hidden;
    this.mask.hide();
    return this;
  }
}
customElements.define('handstand-waitingmask', WaitingMask);
