export class HandstandElement extends HandstandSlimIntegration {
    get id() {
        return this.getAttribute('id');
    }
    set id(idValue) {
        this.setAttribute('id', idValue);
    }
    constructor() {
        super();
    }
    handler(method) {
        return function (e) { method(e) }
    }
    on(event, method) {
        this.addEventListener(event, this.handler(method));
        return this;
    }
    off(event, method) {
        this.removeEventListener(event, this.handler(method));
        return this;
    }
    trigger(event, data) {
        this.dispatchEvent(new Event(event, data));
        return this;
    }
    observeMutations(target) {
        let node = target || this;
        this.mutationObserver = new HandstandMutationObserver(node, {
            onAttributeMutation: this.onAttributeMutation.bind(this),
            onChildListMutation: this.onChildListMutation.bind(this)
        });
        return this.mutationObserver;
    }
    onAttributeMutation(mutation) {
    }
    onChildListMutation(mutation) {
    }
}
module.exports = HandstandElement;