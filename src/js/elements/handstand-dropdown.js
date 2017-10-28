class HandstandDropdown extends Handstand {
    constructor(attributes) {
        super(attributes);
        this.onSelection();
    }
    get template() {
        var template = this.selectTag(this.innerHTML);
        if (!this.options) this.innerHTML = '';
        return template;
    }
    buildUp() {
        this.select = this.childNodes[0];
        this.options = this.select.options;
        var placeholder = this.getAttribute('placeholder'),
        fontSize = this.getAttribute('font-size');
        if (placeholder) {
            this.select.placeholder = placeholder;
        }
        if (fontSize) {
            this.select.style.fontSize = fontSize;
        }
    }
    selectTag(html) {
        var t = '';
        t += '<select>';
        if (html) t += html
        t += '</select>';
        return t;
    }
    get Selected() {
      var option = null;
      if (this.select && this.options && this.options.length > 0) {
         option = this.options[ this.options.selectedIndex ];
      }
      return option;
    }
    onSelection() {
        var selection = this.Selected;
        if (selection) {
            if (selection.innerHTML &&
                selection.attributes && selection.attributes['value']) {
                    this.model.Set('value', {
                        content: selection.innerHTML,
                        value: selection.attributes['value'].value
                    });
            } else {
               this.model.Set('value', selection);
            }
        } else {
            this.model.Set('value', {});
       }
    }
    configureMonitoring() {
        var monitoring = this.getAttribute('monitor');
        if (monitoring === 'true' && this.id && !this.monitoring) {
            this.monitoring = true;
            this.on('input', this.onChange.bind(this));
        } else {
            this.monitoring = false;
        }
    }
    configureTwoway() {
         var twoway = this.getAttribute('twoway');
         if (twoway === 'true' && !this.twoway) {
             this.twoway = true;
             this.model.onSet(this.onSetHandler.bind(this));
         } else {
             this.twoway = false;
         }
    }
    onSetHandler(key, value, model) {
    }
    onChange(e) {
        this.onSelection(e);
    }
    stopMonitoring() {
        this.off('input', this.onChange.bind(this));
        this.monitoring = false;
    }
}
Handstand.tag('handstand-dropdown', HandstandDropdown);
try { module.exports = HandstandDropdown; } catch(x) {}