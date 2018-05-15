export default class AbstractOrchestrator {
  constructor() {
    document.addEventListener(
      'DOMContentLoaded',
      this.onContentLoad.bind(this)
    );
    window.addEventListener('resize', this.onResize.bind(this));
  }
  onContentLoaded() {}
  onResize() {}
}
