import ElementEventObserver from '../observers/ElementEventObserver.js';
export default class WrappedElement {
  get innerHTML() {
    return this.innerElement.innerHTML;
  }
  set innerHTML(html) {
    return (this.innerElement.innerHTML = html);
  }
  get innerText() {
    return this.innerElement.innerText;
  }
  set innerText(text) {
    return (this.innerElement.innerText = text);
  }
  constructor(tag) {
    this.innerElement = document.createElement(tag);
    this._elementEventObserver = new ElementEventObserver(this.innerElement);
  }
  setAttribute(attribute, value) {
    return this.innerElement.setAttribute(attribute, value);
  }
  getAttribute(attribute) {
    return this.innerElement.getAttribute(attribute);
  }
  on(type, method) {
    this._elementEventObserver.on(type, method);
  }
  off(type, method) {
    this._elementEventObserver.off(type, method);
  }
  remove() {
    return this.innerElement.remove();
  }
  append(item) {
    return this.innerElement.append(item);
  }
  prepend(item) {
    return this.innerElement.prepend(item);
  }
}
