class HandstandConfigurableElement extends HandstandElement {
    onConfiguration() {
    }
    configure() {
      this.onConfiguration();
    }
    relationships() {
        var parent = this.getAttribute('parent'),
        children = this.getAttribute('children');
        if (parent) {
            this._boundParent = document.querySelector(parent);
        }
        if (children) {
            this._childSelectors = children;
        }
    }
    parent() {
      return this._boundParent;
    }
    kids() {
        var children = [];
        if (this._childSelectors) {
            var kids = this._childSelectors.split(" ");
            for(var i = 0; i <= kids.length; i++) {
                var kid = kids[i];
                if (kid) {
                    var element = document.querySelector(kid);
                    if (element) children.push(element);
                }
            }
        }
        return children;
    }
    floating() {
       var float = this.getAttribute('float');
        if (float) {
            this.style.float = float;
        }
    }
    positioning() {
        this.style.position = this.getAttribute('position');
    }
    bounding() {
        this.style.width = this.getAttribute('width');
        this.style.height = this.getAttribute('height');
    }
    padding() {
        var padding = this.getAttribute('padding');
        if (!padding) {
            this.style.paddingTop = this.getAttribute('padding-top');
            this.style.paddingBottom = this.getAttribute('padding-bottom');
            this.style.paddingLeft = this.getAttribute('padding-left');
            this.style.paddingRight = this.getAttribute('padding-right');
        } else {
            this.style.paddingTop = padding;
            this.style.paddingBottom = padding;
            this.style.paddingLeft = padding;
            this.style.paddingRight = padding;
        }
    }
    bordering() {
        this.style.borderColor = this.getAttribute('border-color');
        this.style.borderWidth = this.getAttribute('border-width');
        this.style.borderStyle = this.getAttribute('border-style');
        this.style.borderRadius = this.getAttribute('border-radius');
    }
    fonting() {
        this.style.fontSize = this.getAttribute('font-size');
    }
    coloring() {
        this.style.color = this.getAttribute('text-color');
        this.style.backgroundColor = this.getAttribute('color');
    }
    texting() {
        this.text = this.getAttribute('text');
        this.style.textDecoration = this.getAttribute('decoration');
        this.style.textAlign = this.getAttribute('text-align');
    }
}
try { module.exports = HandstandConfigurableElement; } catch(x) {}