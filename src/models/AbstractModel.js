export default class AbstractModel {
    /**
     * AbstractModel constructor.
     */
    constructor() {
        if (new.target === AbstractModel) {
            throw new Error("AbstractModel instance cannot be constructed directly.");
        }

        this.equals = this.equals.bind(this);
    }

    /**
     * Determine whether the values of the two models are equal.
     *
     * @param {AbstractModel} model
     * @return {boolean}
     */
    equals(model) {
        return this.valueOf() === model.valueOf();
    }
}
