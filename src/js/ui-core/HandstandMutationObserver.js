class HandstandMutationObserver {
    constructor(node, events) {
        this.observer = new MutationObserver( (mutationsList) => {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList' && events.onChildListMutation)
                    events.onChildListMutation(mutation);
                if (mutation.type == 'attributes' && events.onAttributeMutation)
                    events.onAttributeMutation(mutation);
            }
        });
        this.observer.observe(node, {attributes: true, childList: true});
    }
}
try { module.exports = HandstandMutationObserver; } catch(x) {}