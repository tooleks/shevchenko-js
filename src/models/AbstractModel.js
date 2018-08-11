export default class AbstractModel {
    /**
     * AbstractModel constructor.
     */
    constructor() {
        if (new.target === AbstractModel) {
            throw new Error("AbstractModel instance cannot be constructed directly.");
        }

        this.equal = this.equal.bind(this);
    }

    /**
     * Determine whether the values of the two models are equal.
     *
     * @param {AbstractModel} model
     * @return {boolean}
     */
    equal(model) {
        return this.valueOf() === model.valueOf();
    }
}
