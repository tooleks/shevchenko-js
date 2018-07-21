"use strict";

const {filter, inflector, sort} = require("./rules");
const pos = require("./pos");
const {mapNameParts} = require("./utils");
const {Validator} = require("./validator");

/**
 * Inflector class.
 */
class Inflector {
    /**
     * Inflector constructor.
     *
     * @param {Array} rules
     */
    constructor(rules) {
        this._rules = rules;
        this._getRules = this._getRules.bind(this);
        this.inflect = this.inflect.bind(this);
        this._inflectLastName = this._inflectLastName.bind(this);
        this._inflectFirstName = this._inflectFirstName.bind(this);
        this._inflectMiddleName = this._inflectMiddleName.bind(this);
    }

    /**
     * Get inflection rules.
     *
     * @returns {Array}
     */
    _getRules() {
        return this._rules.slice(0);
    }

    /**
     * Inflect the person's first, last and middle names.
     *
     * @param {Object} person
     * @param {string} person.firstName
     * @param {string} person.lastName
     * @param {string} person.middleName
     * @param {string} person.gender
     * @param {string} inflectionCaseName
     * @return {Object}
     */
    inflect(person, inflectionCaseName) {
        new Validator()
            .add(() => {
                return typeof person === "object" && person !== null;
            }, "Invalid 'person' type. Allowed types: object.")
            .add(() => {
                return (
                    person.hasOwnProperty("firstName") ||
                    person.hasOwnProperty("middleName") ||
                    person.hasOwnProperty("lastName")
                );
            }, "Missed 'person.lastName', 'person.firstName', 'person.middleName' properties.")
            .add(() => {
                return !person.hasOwnProperty("lastName") || typeof person.lastName === "string";
            }, "Invalid 'person.lastName' type. Allowed types: string.")
            .add(() => {
                return !person.hasOwnProperty("firstName") || typeof person.firstName === "string";
            }, "Invalid 'person.firstName' type. Allowed types: string.")
            .add(() => {
                return !person.hasOwnProperty("middleName") || typeof person.middleName === "string";
            }, "Invalid 'person.middleName' type. Allowed types: string.")
            .add(() => {
                return Object.values(Inflector.GENDER_NAMES).indexOf(person.gender) !== -1;
            }, `Invalid 'person.gender' value. Allowed values: ${Object.values(Inflector.GENDER_NAMES).join(", ")}.`)
            .add(() => {
                return Object.values(Inflector.INFLECTION_CASE_NAMES).indexOf(inflectionCaseName) !== -1;
            }, `Invalid 'inflectionCaseName' value. Allowed values: ${Object.values(Inflector.INFLECTION_CASE_NAMES).join(", ")}.`)
            .validate();

        const {firstName, lastName, middleName, gender} = person;

        const result = {};

        if (typeof lastName !== "undefined") {
            result.lastName = this._inflectLastName(lastName, gender, inflectionCaseName);
        }

        if (typeof firstName !== "undefined") {
            result.firstName = this._inflectFirstName(firstName, gender, inflectionCaseName);
        }

        if (typeof middleName !== "undefined") {
            result.middleName = this._inflectMiddleName(middleName, gender, inflectionCaseName);
        }

        return result;
    }

    /**
     * Inflect the person's last name.
     *
     * @param {string} name
     * @param {string} gender
     * @param {string} inflectionCaseName
     * @return {string}
     * @private
     */
    _inflectLastName(name, gender, inflectionCaseName) {
        return mapNameParts(name, (name, index, length) => {
            // If the first (on practice, not the last) short part of the compound last name has only one vowel,
            // it is not perceived as an independent surname and returned "as is".
            const isLastSegment = index === length - 1;
            const vowels = name.toLowerCase().match(/(а|о|у|е|и|і|я|ю|є|ї)/g);
            const hasOneVowel = vowels && vowels.length === 1;
            if (!isLastSegment && hasOneVowel) {
                return name;
            }

            // Get the most suitable inflection rule.
            const rule = this._getRules()
                .filter(
                    (rule) =>
                        filter.byGender(rule, gender) &&
                        filter.byApplication(rule, "lastName") &&
                        filter.byRegexp(rule, name) &&
                        filter.byPos(rule, pos.recognize(gender, name)),
                )
                .sort((firstRule, secondRule) => sort.byApplication(firstRule, secondRule, "lastName"))
                .shift();

            // If no inflection rule found, return last name "as is".
            // Otherwise, inflect last name by the inflection rule.
            if (!rule) {
                return name;
            }

            return inflector.inflectByRule(rule, inflectionCaseName, name);
        });
    }

    /**
     * Inflect the person's first name.
     *
     * @param {string} name
     * @param {string} gender
     * @param {string} inflectionCaseName
     * @return {string}
     * @private
     */
    _inflectFirstName(name, gender, inflectionCaseName) {
        return mapNameParts(name, (name) => {
            // Get the most suitable inflection rule.
            const rule = this._getRules()
                .filter(
                    (rule) =>
                        filter.byGender(rule, gender) &&
                        filter.byApplication(rule, "firstName") &&
                        filter.byRegexp(rule, name),
                )
                .sort((firstRule, secondRule) => sort.byApplication(firstRule, secondRule, "firstName"))
                .shift();

            // If no inflection rule found, return first name "as is".
            // Otherwise, inflect first name by the inflection rule.
            if (!rule) {
                return name;
            }

            return inflector.inflectByRule(rule, inflectionCaseName, name);
        });
    }

    /**
     * Inflect the person's middle name.
     *
     * @param {string} name
     * @param {string} gender
     * @param {string} inflectionCaseName
     * @return {string}
     * @private
     */
    _inflectMiddleName(name, gender, inflectionCaseName) {
        return mapNameParts(name, (name) => {
            // Get the most suitable inflection rule.
            const rule = this._getRules()
                .filter(
                    (rule) =>
                        filter.byGender(rule, gender) &&
                        filter.byApplication(rule, "middleName", true) &&
                        filter.byRegexp(rule, name),
                )
                .sort((firstRule, secondRule) => sort.byApplication(firstRule, secondRule, "middleName"))
                .shift();

            // If no inflection rule found, return middle name "as is".
            // Otherwise, inflect middle name by the inflection rule.
            if (!rule) {
                return name;
            }

            return inflector.inflectByRule(rule, inflectionCaseName, name);
        });
    }
}

/**
 * Gender names.
 *
 * @type {Readonly}
 */
Inflector.GENDER_NAMES = Object.freeze({
    MALE: "male",
    FEMALE: "female",
});

/**
 * Inflection case names.
 *
 * @type {Readonly}
 */
Inflector.INFLECTION_CASE_NAMES = Object.freeze({
    NOMINATIVE: "nominative",
    GENITIVE: "genitive",
    DATIVE: "dative",
    ACCUSATIVE: "accusative",
    ABLATIVE: "ablative",
    LOCATIVE: "locative",
    VOCATIVE: "vocative",
});

module.exports = Inflector;
