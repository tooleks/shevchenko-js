"use strict";

const helpers = require("./helpers");
const rules = require("./rules");
const pos = require("./pos");

const assert = helpers.assert;
const stringCaseMask = helpers.stringCaseMask;
const inflector = rules.inflector;
const filter = rules.filter;
const sort = rules.sort;

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
 * @returns {Array<Object>}
 */
shevchenko.getRules = () => {
    const rules = __rules__;
    return rules.slice(0);
};

/**
 * Get an array of gender names.
 *
 * @returns {Array<string>}
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
 * @returns {Array<string>}
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
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inNominative = (person) => shevchenko(person, shevchenko.getCaseNameNominative());

/**
 * Inflect the person's first, last and middle names in a genitive case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inGenitive = (person) => shevchenko(person, shevchenko.getCaseNameGenitive());

/**
 * Inflect the person's first, last and middle names in a dative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inDative = (person) => shevchenko(person, shevchenko.getCaseNameDative());

/**
 * Inflect the person's first, last and middle names in an accusative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inAccusative = (person) => shevchenko(person, shevchenko.getCaseNameAccusative());

/**
 * Inflect the person's first, last and middle names in an ablative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inAblative = (person) => shevchenko(person, shevchenko.getCaseNameAblative());

/**
 * Inflect the person's first, last and middle names in a locative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inLocative = (person) => shevchenko(person, shevchenko.getCaseNameLocative());

/**
 * Inflect the person's first, last and middle names in a vocative case.
 *
 * @param {Object} person
 * @returns {Object}
 */
shevchenko.inVocative = (person) => shevchenko(person, shevchenko.getCaseNameVocative());

/**
 * Inflect the person's first, last and middle names in all cases.
 *
 * @param {Object} person
 * @return {Object}
 */
shevchenko.inAll = (person) => {
    const results = {};
    shevchenko.getCaseNames().forEach((caseName) => results[caseName] = shevchenko(person, caseName));
    return results;
};

/**
 * Inflect the person's first, last and middle names.
 *
 * @example var result = shevchenko({
 *     gender: "male",  // or "female"
 *     lastName: "Шевченко",
 *     firstName: "Тарас",
 *     middleName: "Григорович"
 * }, shevchenko.getCaseNameVocative());
 *
 * @param {Object} person
 * @param {string} caseName
 * @returns {Object}
 */
function shevchenko(person, caseName) {
    assertPersonParameter(person);
    assertCaseNameParameter(caseName);

    const result = {};

    if (typeof person.lastName === "string") {
        let inflectedName = inflectLastName(person.gender, person.lastName.toLowerCase(), caseName);
        result.lastName = stringCaseMask.applyByExample(person.lastName, inflectedName || person.lastName);
    }

    if (typeof person.firstName === "string") {
        let inflectedName = inflectFirstName(person.gender, person.firstName.toLowerCase(), caseName);
        result.firstName = stringCaseMask.applyByExample(person.firstName, inflectedName || person.firstName);
    }

    if (typeof person.middleName === "string") {
        let inflectedName = inflectMiddleName(person.gender, person.middleName.toLowerCase(), caseName);
        result.middleName = stringCaseMask.applyByExample(person.middleName, inflectedName || person.middleName);
    }

    return result;
}

/**
 * Validate the person parameter.
 *
 * @param {Object} person
 */
function assertPersonParameter(person) {
    assert.object(person, "Invalid 'person' type.");
    if (!person.hasOwnProperty("gender")) assert.throw("Missed 'person.gender' property.");
    assert.string(person.gender, "Invalid 'person.gender' type.");
    assert.inArray(shevchenko.getGenderNames(), person.gender, "Invalid 'person.gender' value.");
    if (!person.hasOwnProperty("firstName") && !person.hasOwnProperty("middleName") && !person.hasOwnProperty("lastName")) {
        assert.throw("Missed 'person.lastName', 'person.firstName', 'person.middleName' properties.");
    }
    if (person.hasOwnProperty("lastName")) assert.string(person.lastName, "Invalid 'person.lastName' type.");
    if (person.hasOwnProperty("firstName")) assert.string(person.firstName, "Invalid 'person.firstName' type.");
    if (person.hasOwnProperty("middleName")) assert.string(person.middleName, "Invalid 'person.middleName' type.");
}

/**
 * Validate the caseName parameter.
 *
 * @param {string} caseName
 */
function assertCaseNameParameter(caseName) {
    assert.string(caseName, "Invalid 'caseName' type.");
    assert.inArray(shevchenko.getCaseNames(), caseName, "Invalid 'caseName' value.");
}

/**
 * Inflect the person's last name.
 *
 * @param {string} gender
 * @param {string} lastName
 * @param {string} caseName
 * @return {string}
 */
function inflectLastName(gender, lastName, caseName) {
    const doubleLastName = lastName.split("-");
    if (doubleLastName.length > 1) {
        return doubleLastName.map((lastName) => inflectLastName(gender, lastName, caseName)).join("-");
    }

    const rule = shevchenko
        .getRules()
        .filter((rule) => filter.byGender(rule, gender))
        .filter((rule) => gender === shevchenko.getGenderNameMale() || filter.byPos(rule, pos.resolve(lastName))) // #pos_limits
        .filter((rule) => filter.byApplication(rule, "lastName"))
        .filter((rule) => filter.byRegexp(rule, lastName))
        .sort((firstRule, secondRule) => sort.rulesByApplicationDesc(firstRule, secondRule, "lastName"))
        .shift();

    return inflector.inflectByRule(rule, caseName, lastName);
}

/**
 * Inflect the person's first name.
 *
 * @param {string} gender
 * @param {string} firstName
 * @param {string} caseName
 * @return {string}
 */
function inflectFirstName(gender, firstName, caseName) {
    const rule = shevchenko
        .getRules()
        .filter((rule) => filter.byGender(rule, gender))
        .filter((rule) => filter.byApplication(rule, "firstName"))
        .filter((rule) => filter.byRegexp(rule, firstName))
        .sort((firstRule, secondRule) => sort.rulesByApplicationDesc(firstRule, secondRule, "firstName"))
        .shift();

    return inflector.inflectByRule(rule, caseName, firstName);
}

/**
 * Inflect the person's middle name.
 *
 * @param {string} gender
 * @param {string} middleName
 * @param {string} caseName
 * @return {string}
 */
function inflectMiddleName(gender, middleName, caseName) {
    const rule = shevchenko
        .getRules()
        .filter((rule) => filter.byGender(rule, gender))
        .filter((rule) => filter.byApplication(rule, "middleName", true))
        .filter((rule) => filter.byRegexp(rule, middleName))
        .sort((firstRule, secondRule) => sort.rulesByApplicationDesc(firstRule, secondRule, "middleName"))
        .shift();

    return inflector.inflectByRule(rule, caseName, middleName);
}

module.exports = shevchenko;
