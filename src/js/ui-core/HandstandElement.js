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
    trigger(event, data) {
        this.dispatchEvent(new Event(event, data));
    }
    observeMutations(target) {
        let node = target || this;
        this.mutationObserver = new HandstandMutationObserver(node, {
            onAttributeMutation: this.onAttributeMutation.bind(this),
            onChildListMutation: this.onChildListMutation.bind(this)
        });
    }
    onAttributeMutation(mutation) {
    }
    onChildListMutation(mutation) {
    }
}
try { module.exports = HandstandElement; } catch(x) {}