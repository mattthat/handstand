export default class AbstractOrchestrator {
  constructor() {}
  initialize() {
    document.addEventListener(
      'DOMContentLoaded',
      this.onContentLoaded.bind(this)
    );
    window.addEventListener('resize', this.onResize.bind(this));
  }
  onContentLoaded() {}
  onResize() {}
}
