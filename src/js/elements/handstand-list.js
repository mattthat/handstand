class HandstandList extends Handstand {
    get template() {
        var template = this.ulTag(this.innerHTML);
        if (!this.ul) this.destroyInnerHTML();
        return template;
    }
    get items() {
        return this.model.Get('items') || [];
    }
    buildUp() {
        this.ul = this.childNodes[0]
        this.domToModelItems();
    }
    ulTag(html) {
        var t = '';
        t += '<ul>';
        if (html) t += html
        t += '</ul>';
        return t;
    }
    domToModelItems() {
        var modelItems = [], innerList = this.ul.children;
        for(var i = 0; i <= innerList.length-1; i++) {
           var listItem = innerList[i], modelItem = {};
           if (listItem) {
              if (listItem.attributes && listItem.attributes['value'])
                 modelItem.value = listItem.attributes['value'].value;
              if (listItem.innerHTML) modelItem.content = listItem.innerHTML;
              if (modelItem.value || modelItem.content) modelItems.push(modelItem)
           }
        }
        this.model.Set('items', modelItems);
    }
    modelItemsToDom() {
        var modelItems = this.model.Get('items');
        while( this.ul.firstChild ) {
            this.ul.removeChild( this.ul.firstChild );
        }
        for(var i = 0; i <= modelItems.length; i++) {
            var modelItem = modelItems[i], li;
            if (modelItem) {
                li = document.createElement("li");
                if (modelItem.content) li.innerHTML = modelItem.content;
                if (modelItem.value) li.attributes['value'] = {
                    value: modelItem.value
                };
                this.ul.appendChild(li);
            }
        }
    }
    syncItems(order) {
        if (order) {
            this.modelItemsToDom();
            this.domToModelItems();
        } else {
            this.domToModelItems();
            this.modelItemsToDom();
        }
    }
}
Handstand.tag('handstand-list', HandstandList);
try { module.exports = HandstandList; } catch(x) {}