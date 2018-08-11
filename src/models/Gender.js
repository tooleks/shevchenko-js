import AbstractModel from "./AbstractModel";
import validate from "./validate";

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
        validate.genderValue(gender);
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
