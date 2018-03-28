export class HandstandList extends HandstandConfigurableElement {
    get template() {
        return `<ul></ul>`;
    }
    constructor(attributes, options) {
        super(attributes);
        if (options) {
            if (options.events) {
                if (typeof options.events.onItemAdded === 'function')
                    this.onItemAdded = options.events.onItemAdded;
                if (typeof options.events.onItemRemoved === 'function')
                    this.onItemRemoved = options.events.onItemRemoved;
                if (typeof options.events.onListChanged === 'function')
                    this.onListChanged = options.events.onListChanged;
                if (typeof options.events.onAfterRender === 'function')
                    this.onAfterRender = options.events.onAfterRender;
            }
            if (options.items) {
                this._items = options.items;
            }
        }
    }
    configureMonitoring() {
        return null;
    }
    configureTwoway() {
        return null;
    }
    onRender() {
        this.items = [];
        for(let item in this._items) {
            this.addItem(this._items[item]);
        }
        delete this._items;
        if (this.onAfterRender) this.onAfterRender.call(this);
    }
    addItem(term) {
        let item;
        if (typeof term === 'string') {
            item = {
                template: term
            };
        } else if (typeof term === 'object' && term.template) {
            item = term;
        }
        if (item && item.template && this.items) {
            let li = document.createElement('li');
            li.innerHTML = item.template;
            if (item.id) li.setAttribute('id', item.id);
            if (item.css) li.setAttribute('class', item.css);
            if (this.childNodes[0]) this.childNodes[0].append(li);
            this.items.push(item);
            if (this.onItemAdded) this.onItemAdded.call(this);
            if (this.onListChanged) this.onListChanged.call(this);
        }
        return this;
    }
    removeItem(term) {
        if (typeof term === 'string' && this.items) {
            this.items.filter((item) => {
                if (item.template === term) {
                    this.children.item(0)
                        .children.item(this.items.indexOf(item))
                        .remove();
                    this.items.splice(this.items.indexOf(item), 1);
                }
            });
        } else if (typeof term === 'object') {
            this.children.item(0)
                .children.item(this.items.indexOf(term))
                .remove();
            this.items.splice(this.items.indexOf(term), 1);
        }
        if (this.onItemRemoved) this.onItemRemoved.call(this);
        if (this.onListChanged) this.onListChanged.call(this);
        return this;
    }
    clearItems() {
        this.items = [];
        Array.from(this.children.item(0).children).map((el) => { 
            el.remove();
        });
        if (this.onListChanged) this.onListChanged.call(this);
        return this;
    }
}
HandstandConfigurableElement.tag('handstand-list', HandstandList);
module.exports = HandstandList;