"use strict";

const Helpers = require("./helpers");
const Rules = require("./rules");
const Pos = require("./pos");

const Assert = Helpers.Assert;
const StringCaseMask = Helpers.StringCaseMask;
const Inflector = Rules.Inflector;
const Filter = Rules.Filter;
const Sort = Rules.Sort;

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
 * Get an array of Rules.
 *
 * @returns {Array<Object>}
 */
shevchenko.getRules = () => {
    const Rules = __rules__;
    return Rules.slice(0);
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
    validatePersonParameter(person);
    validateCaseNameParameter(caseName);

    const result = {};

    if (typeof person.lastName === "string") {
        let inflectedName = inflectLastName(person.gender, person.lastName.toLowerCase(), caseName);
        result.lastName = StringCaseMask.applyByExample(person.lastName, inflectedName || person.lastName);
    }

    if (typeof person.firstName === "string") {
        let inflectedName = inflectFirstName(person.gender, person.firstName.toLowerCase(), caseName);
        result.firstName = StringCaseMask.applyByExample(person.firstName, inflectedName || person.firstName);
    }

    if (typeof person.middleName === "string") {
        let inflectedName = inflectMiddleName(person.gender, person.middleName.toLowerCase(), caseName);
        result.middleName = StringCaseMask.applyByExample(person.middleName, inflectedName || person.middleName);
    }

    return result;
}

function validatePersonParameter(person) {
    Assert.object(person, "Invalid 'person' type.");
    if (!person.hasOwnProperty("gender")) Assert.throw("Missed 'person.gender' property.");
    Assert.string(person.gender, "Invalid 'person.gender' type.");
    Assert.inArray(shevchenko.getGenderNames(), person.gender, "Invalid 'person.gender' value.");
    if (!person.hasOwnProperty("firstName") && !person.hasOwnProperty("middleName") && !person.hasOwnProperty("lastName")) {
        Assert.throw("Missed 'person.lastName', 'person.firstName', 'person.middleName' properties.");
    }
    if (person.hasOwnProperty("lastName")) Assert.string(person.lastName, "Invalid 'person.lastName' type.");
    if (person.hasOwnProperty("firstName")) Assert.string(person.firstName, "Invalid 'person.firstName' type.");
    if (person.hasOwnProperty("middleName")) Assert.string(person.middleName, "Invalid 'person.middleName' type.");
}

function validateCaseNameParameter(caseName) {
    Assert.string(caseName, "Invalid 'caseName' type.");
    Assert.inArray(shevchenko.getCaseNames(), caseName, "Invalid 'caseName' value.");
}

function inflectLastName(gender, lastName, caseName) {
    const doubleLastName = lastName.split("-");
    if (doubleLastName.length > 1) {
        return doubleLastName.map((lastName) => inflectLastName(gender, lastName, caseName)).join("-");
    }

    const rule = shevchenko
        .getRules()
        .filter((rule) => Filter.byGender(rule, gender))
        .filter((rule) => gender === shevchenko.getGenderNameMale() || Filter.byPos(rule, Pos.resolve(lastName))) // #pos_limits
        .filter((rule) => Filter.byApplication(rule, "lastName"))
        .filter((rule) => Filter.byRegexp(rule, lastName))
        .sort((firstRule, secondRule) => Sort.rulesByApplicationDesc(firstRule, secondRule, "lastName"))
        .shift();

    return Inflector.inflectByRule(rule, caseName, lastName);
}

function inflectFirstName(gender, firstName, caseName) {
    const rule = shevchenko
        .getRules()
        .filter((rule) => Filter.byGender(rule, gender))
        .filter((rule) => Filter.byApplication(rule, "firstName"))
        .filter((rule) => Filter.byRegexp(rule, firstName))
        .sort((firstRule, secondRule) => Sort.rulesByApplicationDesc(firstRule, secondRule, "firstName"))
        .shift();

    return Inflector.inflectByRule(rule, caseName, firstName);
}

function inflectMiddleName(gender, middleName, caseName) {
    const rule = shevchenko
        .getRules()
        .filter((rule) => Filter.byGender(rule, gender))
        .filter((rule) => Filter.byApplication(rule, "middleName", true))
        .filter((rule) => Filter.byRegexp(rule, middleName))
        .sort((firstRule, secondRule) => Sort.rulesByApplicationDesc(firstRule, secondRule, "middleName"))
        .shift();

    return Inflector.inflectByRule(rule, caseName, middleName);
}

module.exports = shevchenko;
