/**
 * @abstract
 */
export default class AbstractName {
  /**
   */
  constructor() {
    this.map = this.map.bind(this);
  }

  /**
   * Create a new compound name with the results of calling a provided function on every part in the original compound name.
   *
   * For example, the compound last name "Нечуй-Левицький" includes two parts "Нечуй" and "Левицький" divided by a delimiter "-".
   * So the callback function will be called twice with values "Нечуй" and "Левицький".
   *
   * @param {function} transform
   * @return {AbstractName}
   */
  map(transform) {
    const parts = this.toString().split('-');
    const name = parts.map((part, index) => transform(part, index, parts.length)).join('-');
    return new this.constructor(name);
  }
}
