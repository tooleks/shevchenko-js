import AbstractModel from "./AbstractModel";
import validate from "./validate";

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
        validate.inflectionCaseValue(inflectionCase);
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
