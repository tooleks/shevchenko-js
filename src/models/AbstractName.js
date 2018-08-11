import AbstractModel from "./AbstractModel";

export default class AbstractName extends AbstractModel {
    /**
     * AbstractName constructor.
     */
    constructor() {
        super();

        if (new.target === AbstractName) {
            throw new Error("AbstractName instance cannot be constructed directly.");
        }

        this.mapCompoundParts = this.mapCompoundParts.bind(this);
    }

    /**
     * Create a new compound name with the results of calling a provided function on every part in the original compound name.
     *
     * For example, the compound last name "Нечуй-Левицький" includes two parts "Нечуй" and "Левицький" divided by a delimiter "-".
     * So the callback function will be called twice with values "Нечуй" and "Левицький".
     *
     * @param {function} callback
     * @param {string} delimiter
     * @return {AbstractName}
     */
    mapCompoundParts(callback, delimiter = "-") {
        const parts = this.valueOf().split(delimiter);
        const name = parts.map((part, index) => callback(part, index, parts.length)).join(delimiter);
        return new this.constructor(name);
    }
}
