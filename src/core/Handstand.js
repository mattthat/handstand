export default class Handstand {
  static get version() {}
  static loaded(method) {
    document.addEventListener('DOMContentLoaded', method);
  }
}
