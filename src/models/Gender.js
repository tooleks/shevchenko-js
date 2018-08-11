import AbstractModel from "./AbstractModel";

/**
 * Validate gender value.
 *
 * @param {*} gender
 * @throws {TypeError}
 */
export function validateGenderValue(gender) {
    const allowedValues = Object.values(GENDERS);
    const isAllowedValue = allowedValues.indexOf(gender) !== -1;
    if (!isAllowedValue) {
        throw new TypeError(`Invalid gender value. Allowed values: ${allowedValues.join(", ")}.`);
    }
}

/**
 * Gender values.
 *
 * @type {Readonly}
 */
export const GENDERS = Object.freeze({
    MALE: "male",
    FEMALE: "female",
});

export default class Gender extends AbstractModel {
    /**
     * Gender constructor.
     *
     * @param {string} gender
     */
    constructor(gender) {
        super();
        validateGenderValue(gender);
        this._value = gender;
        this.valueOf = this.valueOf.bind(this);
        this.isMale = this.isMale.bind(this);
        this.isFemale = this.isFemale.bind(this);
    }

    /**
     * Get the primitive value of the specified object.
     *
     * @return {string}
     */
    valueOf() {
        return this._value;
    }

    /**
     * Determine whether gender value is male.
     *
     * @return {boolean}
     */
    isMale() {
        return this.valueOf() === GENDERS.MALE;
    }

    /**
     * Determine whether gender value is female.
     *
     * @return {boolean}
     */
    isFemale() {
        return this.valueOf() === GENDERS.FEMALE;
    }
}
