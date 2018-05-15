import './List/List.css';
import AbstractCustomElement from '../abstracts/AbstractCustomElement.js';
import WrappedElement from './WrappedElement.js';
export default class List extends AbstractCustomElement {
  onCreate() {
    this.ul = new WrappedElement('ul');
    this.append(this.ul.innerElement);
  }
  onRender() {
    this.conditions.properties.items.forEach(item => {
      this.addItem(item, { add: false, fire: false });
    });
  }
  addItem(item, opts) {
    const course = {
      draw: opts.draw || true,
      add: opts.add || true,
      fire: opts.fire || true
    };
    if (course.draw) {
      const li = new WrappedElement('li');
      li.item = item;
      if (item.content) li.innerHTML = item.content;
      if (item.id) li.setAttribute('id', item.id);
      if (item.css) li.setAttribute('class', item.css);
      this.ul.append(li.innerElement);
    }
    if (course.add) {
      this.conditions.properties.items.push(item);
    }
    if (course.fire) {
      if (typeof this.conditions.events.onItemAdded === 'function')
        this.conditions.events.onItemAdded.call(this);
      if (typeof this.conditions.events.onListChanged === 'function')
        this.conditions.events.onListChanged.call(this);
    }
    return this;
  }
  removeItem(term) {
    if (typeof term === 'string' && this.items) {
      this.conditions.properties.items.filter(item => {
        if (item.template === term) {
          this.ul.children
            .item(this.conditions.properties.items.indexOf(item))
            .remove();
          this.conditions.properties.items.splice(
            this.conditions.properties.items.indexOf(item),
            1
          );
        }
      });
    } else if (typeof term === 'object') {
      this.ul.children
        .item(this.conditions.properties.items.indexOf(term))
        .remove();
      this.conditions.properties.items.splice(
        this.conditions.properties.items.indexOf(term),
        1
      );
    }
    if (typeof this.conditions.events.onItemRemoved === 'function')
      this.conditions.events.nItemRemoved.call(this);
    if (typeof this.conditions.events.onListChanged === 'function')
      this.conditions.events.onListChanged.call(this);
    return this;
  }
  clearItems() {
    this.conditions.properties.items = [];
    Array.from(this.ul.children).map(el => {
      el.remove();
    });
    if (typeof this.conditions.events.onListChanged === 'function')
      this.conditions.events.onListChanged.call(this);
    return this;
  }
}
customElements.define('handstand-list', List);
