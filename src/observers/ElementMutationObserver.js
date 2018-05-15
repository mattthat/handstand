import AbstractObserver from '../abstracts/AbstractObserver.js';
export default class ElementMutationObserver extends AbstractObserver {
  constructor(element, events) {
    super();
    this.element = element;
    this.events = events;
    this.observer = new MutationObserver(this._onMutation.bind(this));
  }
  _onMutation(mutationsList) {
    for (var mutation of mutationsList) {
      if (
        mutation.type === 'childList' &&
        typeof this.events.onChildListMutation === 'function'
      )
        this.events.onChildListMutation.call(this, mutation);
      if (
        mutation.type === 'attributes' &&
        typeof this.events.onAttributeMutation === 'function'
      )
        this.events.onAttributeMutation.call(this, mutation);
    }
  }
  on() {
    this.observer.observe(this.element, { attributes: true, childList: true });
  }
  off() {
    this.observer.disconnect();
  }
}
