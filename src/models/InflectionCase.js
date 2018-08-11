import AbstractModel from "./AbstractModel";

/**
 * Validate inflection case value.
 *
 * @param {*} inflectionCase
 * @throws {TypeError}
 */
export function validateInflectionCaseValue(inflectionCase) {
    const allowedValues = Object.values(INFLECTION_CASES);
    const isAllowedValue = allowedValues.indexOf(inflectionCase) !== -1;
    if (!isAllowedValue) {
        throw new TypeError(`Invalid inflection case value. Allowed values: ${allowedValues.join(", ")}.`);
    }
}

/**
 * Inflection case values.
 *
 * @type {Readonly}
 */
export const INFLECTION_CASES = Object.freeze({
    NOMINATIVE: "nominative",
    GENITIVE: "genitive",
    DATIVE: "dative",
    ACCUSATIVE: "accusative",
    ABLATIVE: "ablative",
    LOCATIVE: "locative",
    VOCATIVE: "vocative",
});

export default class InflectionCase extends AbstractModel {
    /**
     * InflectionCase constructor.
     *
     * @param {string} inflectionCase
     */
    constructor(inflectionCase) {
        super();
        validateInflectionCaseValue(inflectionCase);
        this._value = inflectionCase;
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
