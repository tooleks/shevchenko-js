import AbstractName from "./AbstractName";

/**
 * Validate last name value.
 *
 * @param {*} lastName
 * @throws {TypeError}
 */
export function validateLastNameValue(lastName) {
    const isAllowedType = typeof lastName === "string";
    if (!isAllowedType) {
        throw new TypeError("Invalid last name type. Allowed types: string.");
    }
}

export default class LastName extends AbstractName {
    /**
     * LastName constructor.
     *
     * @param {string} lastName
     */
    constructor(lastName) {
        super();
        validateLastNameValue(lastName);
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
