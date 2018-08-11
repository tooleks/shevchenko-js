import AbstractName from "./AbstractName";
import validate from "./validate";

export default class MiddleName extends AbstractName {
    /**
     * MiddleName constructor.
     *
     * @param {string} middleName
     */
    constructor(middleName) {
        super();
        validate.middleNameValue(middleName);
        this._value = middleName;
        this.valueOf = this.valueOf.bind(this);
    }

    /**
     * Get the primitive value of the specified object.
     *
     * @return {string}
     */
    valueOf() {
        return this._value;
    }
}
