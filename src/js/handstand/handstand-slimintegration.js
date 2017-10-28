class HandstandSlimIntegration extends Slim {
    get template() {
        return '';
    }
    configure() {
    }
    onBeforeCreated() {
    }
    onCreated() {
    }
    onBeforeRender() {
       this.setUp();
    }
    onAfterRender() {
       this.buildUp();
    }
    setUp() {
    }
    buildUp() {
    }
    ripDown() {
    }
    // attached to the dom
    onAdded() {
    }
    // removed from the dom
    onRemoved() {
        this.ripDown();
    }
    onBeforeUpdate() {
    }
    onAfterUpdate() {
    }
}
try { module.exports = HandstandSlimIntegration; } catch(x) {}