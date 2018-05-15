export default class Handstand {
  static get version() {
    return this._version;
  }
  /**
   * @return {AbstractOrchestrator} AbstractOrchestrator
   */
  static get Orch() {
    return this._orchestrator;
  }
  /**
   * @return {AbstractCustomElement} AbstractCustomElement
   */
  static get CustomElement() {
    return this._customelement;
  }
  /**
   * @property {Container} Container Container element
   * @property {List} List List element
   * @property {Mask} Mask Mask element
   * @property {Model} Model Model element
   * @property {MutableLabel} MutableLabel MutableLabel element
   * @property {Toggle} Toggle Toggle element
   * @property {WaitingMask} WaitingMask WaitingMask element
   */
  static get Elements() {
    return this._elements;
  }
  /**
   * @property {ElementObserver} ElementObserver provides way to observe element mutations
   * @property {EventObserver} EventObserver provides way to observe element events
   */
  static get Observers() {
    return this._observers;
  }
}
