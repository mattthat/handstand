import AbstractObserver from '../abstracts/AbstractObserver.js';
export default class ElementEventObserver extends AbstractObserver {
  constructor(element) {
    super();
    this.element = element;
    this.events = [];
  }
  on(type, method) {
    if (
      this.element &&
      this.element.addEventListener &&
      type &&
      type.length > 0 &&
      typeof method === 'function'
    ) {
      if (
        this.events.findIndex(o => o.type === type && o.method === method) ===
        -1
      ) {
        this.element.addEventListener(type, method);
        this.events.push({
          type: type,
          method: method
        });
      }
    }
  }
  off(type, method) {
    if (
      this.element &&
      this.element.removeEventListener &&
      type &&
      type.length > 0
    ) {
      this.events = this.events.filter(evt => {
        if (typeof method === 'function') {
          if (evt.type === type && evt.method === method) {
            this.element.removeEventListener(evt.type, evt.method);
          } else {
            return evt;
          }
        } else {
          if (evt.type === type) {
            this.element.removeEventListener(evt.type, evt.method);
          } else {
            return evt;
          }
        }
      });
    }
  }
}
