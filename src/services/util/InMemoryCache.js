export default class InMemoryCache {
  /**
   * @param {object} [items]
   */
  constructor(items = {}) {
    this._items = new Map();
    this.setItem = this.setItem.bind(this);
    this.getItem = this.getItem.bind(this);
    this.hasItem = this.hasItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    //
    Object.keys(items).forEach((key) => this.setItem(key, items[key]));
  }

  /**
   * Set the value for the key in the cache object.
   *
   * @param {*} key
   * @param {*} value
   * @return {void}
   */
  setItem(key, value) {
    this._items.set(key, value);
  }

  /**
   * Get the value associated to the key, or undefined if there is none.
   *
   * @param {*} key
   * @return {*}
   */
  getItem(key) {
    return this._items.get(key);
  }

  /**
   * Return a boolean asserting whether a value has been associated to the key in the cache object or not.
   *
   * @param {*} key
   * @return {boolean}
   */
  hasItem(key) {
    return this._items.has(key);
  }

  /**
   * Delete the value associated to the key.
   *
   * @param {*} key
   * @return {void}
   */
  deleteItem(key) {
    this._items.delete(key);
  }
}
