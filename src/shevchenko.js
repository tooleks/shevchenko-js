"use strict";

const utils = require("./utils");
const rules = require("./rules");
const pos = require("./pos");

/**
 * Get a male gender name.
 *
 * @type {string}
 */
shevchenko.getGenderNameMale = () => "male";

/**
 * Get a female gender name.
 *
 * @type {string}
 */
shevchenko.getGenderNameFemale = () => "female";

/**
 * Get nominative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameNominative = () => "nominative";

/**
 * Get a genitive case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameGenitive = () => "genitive";

/**
 * Get a dative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameDative = () => "dative";

/**
 * Get an accusative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameAccusative = () => "accusative";

/**
 * Get an ablative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameAblative = () => "ablative";

/**
 * Get a locative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameLocative = () => "locative";

/**
 * Get a vocative case name.
 *
 * @type {string}
 */
shevchenko.getCaseNameVocative = () => "vocative";

/**
 * Get an array of rules.
 *
 * @return {Array<Object>}
 */
shevchenko.getRules = () => {
    const rules = __rules__;
    return rules.slice(0);
};

/**
 * Get an array of gender names.
 *
 * @return {Array<string>}
 */
shevchenko.getGenderNames = () => {
    const genderNames = [
        shevchenko.getGenderNameMale(),
        shevchenko.getGenderNameFemale(),
    ];
    return genderNames.slice(0);
};

/**
 * Get an array of case names.
 *
 * @return {Array<string>}
 */
shevchenko.getCaseNames = () => {
    const caseNames = [
        shevchenko.getCaseNameNominative(),
        shevchenko.getCaseNameGenitive(),
        shevchenko.getCaseNameDative(),
        shevchenko.getCaseNameAccusative(),
        shevchenko.getCaseNameAblative(),
        shevchenko.getCaseNameLocative(),
        shevchenko.getCaseNameVocative(),
    ];
    return caseNames.slice(0);
};

/**
 * Inflect the person's first, last and middle names in a nominative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inNominative = (person) => shevchenko(person, shevchenko.getCaseNameNominative());

/**
 * Inflect the person's first, last and middle names in a genitive case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inGenitive = (person) => shevchenko(person, shevchenko.getCaseNameGenitive());

/**
 * Inflect the person's first, last and middle names in a dative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inDative = (person) => shevchenko(person, shevchenko.getCaseNameDative());

/**
 * Inflect the person's first, last and middle names in an accusative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inAccusative = (person) => shevchenko(person, shevchenko.getCaseNameAccusative());

/**
 * Inflect the person's first, last and middle names in an ablative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inAblative = (person) => shevchenko(person, shevchenko.getCaseNameAblative());

/**
 * Inflect the person's first, last and middle names in a locative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inLocative = (person) => shevchenko(person, shevchenko.getCaseNameLocative());

/**
 * Inflect the person's first, last and middle names in a vocative case.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inVocative = (person) => shevchenko(person, shevchenko.getCaseNameVocative());

/**
 * Inflect the person's first, last and middle names in all cases.
 *
 * @param {object} person
 * @return {object}
 */
shevchenko.inAll = (person) => {
    return shevchenko
        .getCaseNames()
        .reduce((results, caseName) => (results[caseName] = shevchenko(person, caseName), results), {});
};

/**
 * Inflect the person's first, last and middle names.
 *
 * @example var result = shevchenko({
 *     gender: "male",  // or "female"
 *     lastName: "Шевченко",
 *     firstName: "Тарас",
 *     middleName: "Григорович"
 * }, "vocative");
 *
 * @param {object} person
 * @param {string} caseName
 * @return {object}
 */
function shevchenko(person, caseName) {
    validateInput({person, caseName});

    const inflect = (type, name, gender, caseName) => {
        const inflectedName = getInflectionFunctions()[type](name.toLowerCase(), gender, caseName);
        return utils.string.applyCaseMask(name, inflectedName || name);
    };

    const result = {};

    if (typeof person.lastName === "string") {
        result.lastName = inflect("lastName", person.lastName, person.gender, caseName);
    }

    if (typeof person.firstName === "string") {
        result.firstName = inflect("firstName", person.firstName, person.gender, caseName);
    }

    if (typeof person.middleName === "string") {
        result.middleName = inflect("middleName", person.middleName, person.gender, caseName);
    }

    return result;
}

/**
 * Validate the library input data.
 *
 * @param {object} input
 * @return {void}
 */
function validateInput(input) {
    if (typeof input.person !== "object") {
        throw new Error("Invalid 'person' type.");
    }

    if (!input.person.hasOwnProperty("gender")) {
        throw new Error("Missed 'person.gender' property.");
    }

    if (typeof input.person.gender !== "string") {
        throw new Error("Invalid 'person.gender' type.");
    }

    if (shevchenko.getGenderNames().indexOf(input.person.gender) === -1) {
        throw new Error("Invalid 'person.gender' value.");
    }

    if (!input.person.hasOwnProperty("firstName") &&
        !input.person.hasOwnProperty("middleName") &&
        !input.person.hasOwnProperty("lastName")) {
        throw new Error("Missed 'person.lastName', 'person.firstName', 'person.middleName' properties.");
    }

    if (input.person.hasOwnProperty("lastName") && typeof input.person.lastName !== "string") {
        throw new Error("Invalid 'person.lastName' type.");
    }

    if (input.person.hasOwnProperty("firstName") && typeof input.person.firstName !== "string") {
        throw new Error("Invalid 'person.firstName' type.");
    }

    if (input.person.hasOwnProperty("middleName") && typeof input.person.middleName !== "string") {
        throw new Error("Invalid 'person.middleName' type.");
    }

    if (typeof input.caseName !== "string") {
        throw new Error("Invalid 'caseName' type.");
    }

    if (shevchenko.getCaseNames().indexOf(input.caseName) === -1) {
        throw new Error("Invalid 'caseName' value.");
    }
}

/**
 * Get inflection functions for anthroponyms.
 *
 * @return {object}
 */
function getInflectionFunctions() {
    return {
        /**
         * Inflect the person's last name.
         *
         * @param {string} name
         * @param {string} gender
         * @param {string} caseName
         * @return {string}
         */
        lastName: (name, gender, caseName) => {
            return mapCompoundNameSegments(name, (name, index, length) => {
                // If the first (on practice, not the last) short part of the compound last name has only one vowel,
                // it is not perceived as an independent surname and returned "as is".
                const isLastSegment = index === length - 1;
                if (!isLastSegment && name.match(/(а|о|у|е|и|і|я|ю|є|ї)/g).length === 1) {
                    return name;
                }

                const rule = shevchenko
                    .getRules()
                    .filter((rule) => rules.filter.byGender(rule, gender) &&
                        rules.filter.byApplication(rule, "lastName") &&
                        rules.filter.byRegexp(rule, name) &&
                        rules.filter.byPos(rule, pos.recognize(gender, name)))
                    .sort((firstRule, secondRule) => rules.sort.rulesByApplication(firstRule, secondRule, "lastName"))
                    .shift();

                return rules.inflector.inflectByRule(rule, caseName, name);
            });
        },
        /**
         * Inflect the person's first name.
         *
         * @param {string} name
         * @param {string} gender
         * @param {string} caseName
         * @return {string}
         */
        firstName: (name, gender, caseName) => {
            return mapCompoundNameSegments(name, (name) => {
                const rule = shevchenko
                    .getRules()
                    .filter((rule) => rules.filter.byGender(rule, gender) &&
                        rules.filter.byApplication(rule, "firstName") &&
                        rules.filter.byRegexp(rule, name))
                    .sort((firstRule, secondRule) => rules.sort.rulesByApplication(firstRule, secondRule, "firstName"))
                    .shift();

                return rules.inflector.inflectByRule(rule, caseName, name);
            });
        },
        /**
         * Inflect the person's middle name.
         *
         * @param {string} name
         * @param {string} gender
         * @param {string} caseName
         * @return {string}
         */
        middleName: (name, gender, caseName) => {
            const rule = shevchenko
                .getRules()
                .filter((rule) => rules.filter.byGender(rule, gender) &&
                    rules.filter.byApplication(rule, "middleName", true) &&
                    rules.filter.byRegexp(rule, name))
                .sort((firstRule, secondRule) => rules.sort.rulesByApplication(firstRule, secondRule, "middleName"))
                .shift();

            return rules.inflector.inflectByRule(rule, caseName, name);
        },
    };
}

/**
 * Create a new compound name with the results of calling a provided function on every segment in the calling compound name.
 *
 * @param {string} name
 * @param {function} callback
 * @param {string} delimiter
 * @return {string}
 */
function mapCompoundNameSegments(name, callback, delimiter = "-") {
    const segments = name.split(delimiter);
    return segments.map((segment, index) => callback(segment, index, segments.length)).join(delimiter);
}

module.exports = shevchenko;
