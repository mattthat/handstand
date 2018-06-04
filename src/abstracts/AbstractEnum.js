export default class AbstractEnum {
  constructor(nume) {
    this.nume = nume;
  }
  toString() {
    return `${this.nume}`;
  }
}
