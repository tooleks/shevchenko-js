"use strict";

(() => {

    /**
     * Inflection rules.
     *
     * @type {Array<object>}
     */
    shevchenko.rules = __rules__;

    /**
     * Male gender.
     *
     * @type {string}
     */
    shevchenko.genderMale = "male";

    /**
     * Female gender.
     *
     * @type {string}
     */
    shevchenko.genderFemale = "female";

    /**
     * Nominative case.
     *
     * @type {string}
     */
    shevchenko.caseNameNominative = "nominative";

    /**
     * Genitive case.
     *
     * @type {string}
     */
    shevchenko.caseNameGenitive = "genitive";

    /**
     * Dative case.
     *
     * @type {string}
     */
    shevchenko.caseNameDative = "dative";

    /**
     * Accusative case.
     *
     * @type {string}
     */
    shevchenko.caseNameAccusative = "accusative";

    /**
     * Ablative case.
     *
     * @type {string}
     */
    shevchenko.caseNameAblative = "ablative";

    /**
     * Locative case.
     *
     * @type {string}
     */
    shevchenko.caseNameLocative = "locative";

    /**
     * Vocative case.
     *
     * @type {string}
     */
    shevchenko.caseNameVocative = "vocative";

    /**
     * Get available rules.
     *
     * @returns {Array<object>}
     */
    shevchenko.getRules = function () {
        return shevchenko.rules.slice(0);
    };

    /**
     * Get available genders.
     *
     * @returns {Array<string>}
     */
    shevchenko.getGenders = function () {
        return [
            shevchenko.genderMale,
            shevchenko.genderFemale
        ];
    };

    /**
     * Get available case names.
     *
     * @returns {Array<string>}
     */
    shevchenko.getCaseNames = function () {
        return [
            shevchenko.caseNameNominative,
            shevchenko.caseNameGenitive,
            shevchenko.caseNameDative,
            shevchenko.caseNameAccusative,
            shevchenko.caseNameAblative,
            shevchenko.caseNameLocative,
            shevchenko.caseNameVocative
        ];
    };

    /**
     * Inflect the person first, last and middle names in nominative case.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inNominative = (person) => shevchenko(person, shevchenko.caseNameNominative);

    /**
     * Inflect the person first, last and middle names in genitive case.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inGenitive = (person) => shevchenko(person, shevchenko.caseNameGenitive);

    /**
     * Inflect the person first, last and middle names in dative case.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inDative = (person) => shevchenko(person, shevchenko.caseNameDative);

    /**
     * Inflect the person first, last and middle names in accusative case.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inAccusative = (person) => shevchenko(person, shevchenko.caseNameAccusative);

    /**
     * Inflect the person first, last and middle names in ablative case.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inAblative = (person) => shevchenko(person, shevchenko.caseNameAblative);

    /**
     * Inflect the person first, last and middle names in locative case.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inLocative = (person) => shevchenko(person, shevchenko.caseNameLocative);

    /**
     * Inflect the person first, last and middle names in vocative case.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inVocative = (person) => shevchenko(person, shevchenko.caseNameVocative);

    /**
     * Inflect the person first, last and middle names.
     *
     * @example var result = shevchenko({
     *     gender: "male",  // or "female"
     *     lastName: "Шевченко",
     *     firstName: "Тарас",
     *     middleName: "Григорович"
     * }, shevchenko.caseNameVocative);
     *
     * @param {object} person
     * @param {string} caseName
     * @returns {object}
     */
    function shevchenko(person, caseName) {
        validator.validatePersonParameter(person);
        validator.validateCaseNameParameter(caseName);

        const result = {};

        if (typeof person.lastName === "string") {
            result.lastName = inflector.inflectLastName(person.gender, person.lastName.toLowerCase(), caseName);
            if (typeof result.lastName === "undefined") {
                result.lastName = person.lastName;
            }
            result.lastName = formatter.capitalize(result.lastName);
        }

        if (typeof person.firstName === "string") {
            result.firstName = inflector.inflectFirstName(person.gender, person.firstName.toLowerCase(), caseName);
            if (typeof result.firstName === "undefined") {
                result.firstName = person.firstName;
            }
            result.firstName = formatter.capitalize(result.firstName);
        }

        if (typeof person.middleName === "string") {
            result.middleName = inflector.inflectMiddleName(person.gender, person.middleName.toLowerCase(), caseName);
            if (typeof result.middleName === "undefined") {
                result.middleName = person.middleName;
            }
            result.middleName = formatter.capitalize(result.middleName);
        }

        return result;
    }

    const inflector = {};

    inflector.inflectLastName = function (gender, lastName, caseName) {
        const lastNames = lastName.split("-");
        if (lastNames.length > 1) {
            return lastNames.map((lastName) => inflector.inflectLastName(gender, lastName, caseName)).join("-");
        }

        const rule = shevchenko
            .getRules()
            .filter((rule) => filter.rulesByGender(rule, gender))
            .filter((rule) => filter.rulesByApplication(rule, "lastName"))
            .filter((rule) => filter.rulesByRegexp(rule, lastName))
            .sort((firstRule, secondRule) => sort.rulesByApplicationDesc(firstRule, secondRule, "lastName"))
            .shift();

        return inflector.inflectByRule(rule, caseName, lastName);
    };

    inflector.inflectFirstName = function (gender, firstName, caseName) {
        const rule = shevchenko
            .getRules()
            .filter((rule) => filter.rulesByGender(rule, gender))
            .filter((rule) => filter.rulesByApplication(rule, "firstName"))
            .filter((rule) => filter.rulesByRegexp(rule, firstName))
            .sort((firstRule, secondRule) => sort.rulesByApplicationDesc(firstRule, secondRule, "firstName"))
            .shift();

        return inflector.inflectByRule(rule, caseName, firstName);
    };

    inflector.inflectMiddleName = function (gender, middleName, caseName) {
        const rule = shevchenko
            .getRules()
            .filter((rule) => filter.rulesByGender(rule, gender))
            .filter((rule) => filter.rulesByApplication(rule, "middleName", true))
            .filter((rule) => filter.rulesByRegexp(rule, middleName))
            .sort((firstRule, secondRule) => sort.rulesByApplicationDesc(firstRule, secondRule, "middleName"))
            .shift();

        return inflector.inflectByRule(rule, caseName, middleName);
    };

    /**
     * Inflect a value by inflection rule.
     *
     * @param {object} rule
     * @param {string} caseName
     * @param {string} value
     * @returns {string}
     */
    inflector.inflectByRule = function (rule, caseName, value) {
        if (typeof rule === "undefined") return value;
        const regexp = rule.regexp.modify;
        const modifiers = rule.cases[caseName][0]; // Retrieve the first group modifiers object by case name.
        return value.replace(new RegExp(regexp, "gm"), (match, ...groups) => {
            let replacement = "";
            const count = inflector.countRegexpGroups(regexp);
            for (let index = 0; index < count; index++) {
                replacement += inflector.applyGroupModifier(
                    typeof modifiers === "undefined" ? modifiers : modifiers[index],
                    groups[index]
                );
            }
            return replacement;
        });
    };

    /**
     * Apply a group modifier to the value.
     *
     * @see inflector.inflectByRule
     *
     * @param {object} modifier
     * @param {string} value
     * @returns {string}
     */
    inflector.applyGroupModifier = function (modifier, value) {
        if (typeof modifier === "undefined") return value;
        switch (modifier.type) {
            case "append":
                return value + modifier.value;
            case "replace":
                return modifier.value;
            default:
                return value;
        }
    };

    /**
     * Count a number of groups in regular expression string.
     *
     * @param {string} regexp
     * @returns {number}
     */
    inflector.countRegexpGroups = function (regexp) {
        return (new RegExp(regexp.toString() + "|")).exec("").length - 1;
    };

    const assert = {};

    /**
     * Assert than a value is an object.
     *
     * @param value
     * @param {string} error
     */
    assert.object = function (value, error) {
        if (typeof value !== "object") assert.throw(error);
    };

    /**
     * Assert than a value is a string.
     *
     * @param value
     * @param {string} error
     */
    assert.string = function (value, error) {
        if (typeof value !== "string") assert.throw(error);
    };

    /**
     * Assert than a value exists in array.
     *
     * @param {Array} array
     * @param value
     * @param {string} error
     */
    assert.inArray = function (array, value, error) {
        if (array.indexOf(value) === -1) assert.throw(error);
    };

    /**
     * Throw an assertion error.
     *
     * @param {string} error
     */
    assert.throw = function (error) {
        throw new Error(error);
    };

    const validator = {};

    validator.validatePersonParameter = function (person) {
        assert.object(person, "Invalid person parameter type.");
        if (!person.hasOwnProperty("gender")) assert.throw("No gender property found in the person parameter.");
        assert.string(person.gender, "Invalid gender property type provided in the person parameter.");
        assert.inArray(shevchenko.getGenders(), person.gender, "Invalid gender property value provided in the person parameter.");
        if (!person.hasOwnProperty("firstName") && !person.hasOwnProperty("middleName") && !person.hasOwnProperty("lastName")) {
            assert.throw("No name properties found in the person parameter.");
        }
        if (person.hasOwnProperty("lastName")) assert.string(person.lastName, "Invalid person lastName parameter type.");
        if (person.hasOwnProperty("firstName")) assert.string(person.firstName, "Invalid person firstName parameter type.");
        if (person.hasOwnProperty("middleName")) assert.string(person.middleName, "Invalid person middleName parameter type.");
    };

    validator.validateCaseNameParameter = function (caseName) {
        assert.string(caseName, "Invalid caseName parameter type.");
        assert.inArray(shevchenko.getCaseNames(), caseName, "Invalid caseName parameter value.");
    };

    const sort = {};

    sort.rulesByApplicationDesc = function (firstRule, secondRule, application) {
        return !firstRule.applications.length && secondRule.applications.length && secondRule.applications.indexOf(application) !== -1;
    };

    const filter = {};

    filter.rulesByApplication = function (rule, application, strict) {
        if (rule.applications.length) {
            return rule.applications.some((ruleApplication) => ruleApplication === application);
        }
        return !strict;
    };

    filter.rulesByGender = function (rule, gender) {
        return rule.gender.indexOf(gender) !== -1;
    };

    filter.rulesByRegexp = function (rule, value) {
        return (new RegExp(rule.regexp.find, "gm")).test(value);
    };

    const formatter = {};

    formatter.capitalize = function (string) {
        const strings = string.split("-");
        if (strings.length > 1) {
            return strings.map((string) => formatter.capitalize(string)).join("-");
        }
        return typeof string === "string"
            ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
            : string;
    };

    if (typeof module !== "undefined" && module.hasOwnProperty("exports")) { // Export for Node.js environment.
        module.exports = shevchenko;
    } else if (typeof window !== "undefined") { // Export for a browser environment.
        window.shevchenko = shevchenko;
    } else {
        throw new Error("Unknown environment.");
    }

})();
