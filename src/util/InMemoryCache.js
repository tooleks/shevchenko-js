export default class InMemoryCache {
  /**
   * @param {object} [items]
   */
  constructor(items = {}) {
    this.items = new Map();
    Object.keys(items).forEach((key) => this.setItem(key, items[key]));
  }

  /**
   * Sets the value for the key in the cache object.
   *
   * @param {*} key
   * @param {*} value
   * @returns {void}
   */
  setItem(key, value) {
    this.items.set(key, value);
  }

  /**
   * Retrieves the value associated to the key, or undefined if there is none.
   *
   * @param {*} key
   * @returns {*}
   */
  getItem(key) {
    return this.items.get(key);
  }

  /**
   * Returns a boolean asserting whether a value has been associated to the key in the cache object or not.
   *
   * @param {*} key
   * @returns {boolean}
   */
  hasItem(key) {
    return this.items.has(key);
  }

  /**
   * Deletes the value associated to the key.
   *
   * @param {*} key
   * @returns {void}
   */
  deleteItem(key) {
    this.items.delete(key);
  }
}
