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
}
try { module.exports = HandstandElement; } catch(x) {}