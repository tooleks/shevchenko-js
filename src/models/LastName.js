import AbstractName from "./AbstractName";
import validate from "./validate";

export default class LastName extends AbstractName {
    /**
     * LastName constructor.
     *
     * @param {string} lastName
     */
    constructor(lastName) {
        super();
        validate.lastNameValue(lastName);
        this._value = lastName;
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
