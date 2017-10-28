class HandstandElement extends HandstandSlimIntegration {
    get id() {
        return this.getAttribute('id');
    }
    set id(idValue) {
        this.setAttribute('id', idValue);
    }
    handler(method) {
        return function (e) { method(e) }
    }
    on(event, method) {
        this.addEventListener(event, this.handler(method));
    }
    off(event, method) {
        this.removeEventListener(event, this.handler(method));
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