class HandstandElement extends HandstandSlimIntegration {
    get id() {
        return this.getAttribute('id');
    }
    set id(idValue) {
        this.setAttribute('id', idValue);
    }
    destroyInnerHTML() {
        this.innerHTML = '';
    }
    changeColor(color) {
        this.style.color = color;
    }
    changeText(text) {
        this.text = text;
    }
    fadeOut() {
       this.style.opacity = 1;
       var that = this;
       for(var i = 1; i <= 100; i++) {
          setTimeout(function() {
             if (that.style.opacity > 0.00) that.style.opacity = that.style.opacity - 0.01;
             if (that.style.opacity < 0.00) that.style.opacity = 0.00;
          }, 5*i)
       }
    }
    fadeIn() {
       this.style.opacity = 0;
       var that = this, opacity = 0;
       for(var i = 1; i <= 100; i++) {
          setTimeout(function() {
             if (that.style.opacity < 1) { 
                 opacity += 0.01;
                 that.style.opacity = opacity;
             }
             if (that.style.opacity > 1) that.style.opacity = 1;
          }, 5*i)
       }
    }
}
try { module.exports = HandstandElement; } catch(x) {}