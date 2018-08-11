import AbstractName from "./AbstractName";

/**
 * Validate middle name value.
 *
 * @param {*} middleName
 * @throws {TypeError}
 */
export function validateMiddleNameValue(middleName) {
    const isAllowedType = typeof middleName === "string";
    if (!isAllowedType) {
        throw new TypeError("Invalid middle name type. Allowed types: string.");
    }
}

export default class MiddleName extends AbstractName {
    /**
     * MiddleName constructor.
     *
     * @param {string} middleName
     */
    constructor(middleName) {
        super();

        validateMiddleNameValue(middleName);
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
