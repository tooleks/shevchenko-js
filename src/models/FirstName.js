import AbstractName from "./AbstractName";
import validate from "./validate";

export default class FirstName extends AbstractName {
    /**
     * FirstName constructor.
     *
     * @param {string} firstName
     */
    constructor(firstName) {
        super();
        validate.firstNameValue(firstName);
        this._value = firstName;
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
