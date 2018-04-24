export default class Handstand {
  static get version() {
    return 'v' + [this.$MAJOR, this.$MINOR, this.$PATCH].join('.');
  }
  static get build() {
    return this.$BUILD;
  }
  static loaded(method) {
    document.addEventListener('DOMContentLoaded', method);
  }
}
