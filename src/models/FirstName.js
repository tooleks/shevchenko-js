import AbstractName from "./AbstractName";

/**
 * Validate first name value.
 *
 * @param {*} firstName
 * @throws {TypeError}
 */
export function validateFirstNameValue(firstName) {
    const isAllowedType = typeof firstName === "string";
    if (!isAllowedType) {
        throw new TypeError("Invalid first name type. Allowed types: string.");
    }
}

export default class FirstName extends AbstractName {
    /**
     * FirstName constructor.
     *
     * @param {string} firstName
     */
    constructor(firstName) {
        super();
        validateFirstNameValue(firstName);
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
