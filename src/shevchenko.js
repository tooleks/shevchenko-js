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
    shevchenko.getRules = () => {
        return shevchenko.rules.slice(0);
    };

    /**
     * Get available genders.
     *
     * @returns {Array<string>}
     */
    shevchenko.getGenders = () => {
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
    shevchenko.getCaseNames = () => {
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
     * @param {Object} person
     * @returns {Object}
     */
    shevchenko.inNominative = (person) => shevchenko(person, shevchenko.caseNameNominative);

    /**
     * Inflect the person first, last and middle names in genitive case.
     *
     * @param {Object} person
     * @returns {Object}
     */
    shevchenko.inGenitive = (person) => shevchenko(person, shevchenko.caseNameGenitive);

    /**
     * Inflect the person first, last and middle names in dative case.
     *
     * @param {Object} person
     * @returns {Object}
     */
    shevchenko.inDative = (person) => shevchenko(person, shevchenko.caseNameDative);

    /**
     * Inflect the person first, last and middle names in accusative case.
     *
     * @param {Object} person
     * @returns {Object}
     */
    shevchenko.inAccusative = (person) => shevchenko(person, shevchenko.caseNameAccusative);

    /**
     * Inflect the person first, last and middle names in ablative case.
     *
     * @param {Object} person
     * @returns {Object}
     */
    shevchenko.inAblative = (person) => shevchenko(person, shevchenko.caseNameAblative);

    /**
     * Inflect the person first, last and middle names in locative case.
     *
     * @param {Object} person
     * @returns {Object}
     */
    shevchenko.inLocative = (person) => shevchenko(person, shevchenko.caseNameLocative);

    /**
     * Inflect the person first, last and middle names in vocative case.
     *
     * @param {Object} person
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
     * @param {Object} person
     * @param {string} caseName
     * @returns {Object}
     */
    function shevchenko(person, caseName) {
        validator.validatePersonParameter(person);
        validator.validateCaseNameParameter(caseName);

        const result = {};

        if (typeof person.lastName === "string") {
            let inflectedName = personInflector.inflectLastName(person.gender, person.lastName.toLowerCase(), caseName);
            result.lastName = stringCaseMask.applyByExample(person.lastName, inflectedName || person.lastName);
        }

        if (typeof person.firstName === "string") {
            let inflectedName = personInflector.inflectFirstName(person.gender, person.firstName.toLowerCase(), caseName);
            result.firstName = stringCaseMask.applyByExample(person.firstName, inflectedName || person.firstName);
        }

        if (typeof person.middleName === "string") {
            let inflectedName = personInflector.inflectMiddleName(person.gender, person.middleName.toLowerCase(), caseName);
            result.middleName = stringCaseMask.applyByExample(person.middleName, inflectedName || person.middleName);
        }

        return result;
    }

    const personInflector = {};

    personInflector.inflectLastName = (gender, lastName, caseName) => {
        const doubleLastName = lastName.split("-");
        if (doubleLastName.length > 1) {
            return doubleLastName.map((lastName) => personInflector.inflectLastName(gender, lastName, caseName)).join("-");
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

    personInflector.inflectFirstName = (gender, firstName, caseName) => {
        const rule = shevchenko
            .getRules()
            .filter((rule) => filter.rulesByGender(rule, gender))
            .filter((rule) => filter.rulesByApplication(rule, "firstName"))
            .filter((rule) => filter.rulesByRegexp(rule, firstName))
            .sort((firstRule, secondRule) => sort.rulesByApplicationDesc(firstRule, secondRule, "firstName"))
            .shift();

        return inflector.inflectByRule(rule, caseName, firstName);
    };

    personInflector.inflectMiddleName = (gender, middleName, caseName) => {
        const rule = shevchenko
            .getRules()
            .filter((rule) => filter.rulesByGender(rule, gender))
            .filter((rule) => filter.rulesByApplication(rule, "middleName", true))
            .filter((rule) => filter.rulesByRegexp(rule, middleName))
            .sort((firstRule, secondRule) => sort.rulesByApplicationDesc(firstRule, secondRule, "middleName"))
            .shift();

        return inflector.inflectByRule(rule, caseName, middleName);
    };

    const inflector = {};

    /**
     * Inflect a value by inflection rule.
     *
     * @param {Object} rule
     * @param {string} caseName
     * @param {string} value
     * @returns {string}
     */
    inflector.inflectByRule = (rule, caseName, value) => {
        if (typeof rule === "undefined") return value;
        const regexp = rule.regexp.modify;
        const modifiers = rule.cases[caseName][0]; // Retrieve the first group modifiers object by case name.
        return value.replace(new RegExp(regexp, "gm"), (match, ...groups) => {
            let replacement = "";
            const count = inflector.countRegexpGroups(regexp);
            let index = 0;
            while (index < count) {
                let modifier = typeof modifiers === "undefined" ? modifiers : modifiers[index];
                replacement += inflector.applyGroupModifier(modifier, groups[index]);
                index++;
            }
            return replacement;
        });
    };

    /**
     * Apply a group modifier to the value.
     *
     * @see inflector.inflectByRule
     *
     * @param {Object} modifier
     * @param {string} value
     * @returns {string}
     */
    inflector.applyGroupModifier = (modifier, value) => {
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
    inflector.countRegexpGroups = (regexp) => {
        return (new RegExp(regexp.toString() + "|")).exec("").length - 1;
    };

    const assert = {};

    /**
     * Assert than a value is an object.
     *
     * @param value
     * @param {string} error
     */
    assert.object = (value, error) => {
        if (typeof value !== "object") assert.throw(error);
    };

    /**
     * Assert than a value is a string.
     *
     * @param value
     * @param {string} error
     */
    assert.string = (value, error) => {
        if (typeof value !== "string") assert.throw(error);
    };

    /**
     * Assert than a value exists in array.
     *
     * @param {Array} array
     * @param value
     * @param {string} error
     */
    assert.inArray = (array, value, error) => {
        if (array.indexOf(value) === -1) assert.throw(error);
    };

    /**
     * Throw an assertion error.
     *
     * @param {string} error
     */
    assert.throw = (error) => {
        throw new Error(error);
    };

    const validator = {};

    validator.validatePersonParameter = (person) => {
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

    validator.validateCaseNameParameter = (caseName) => {
        assert.string(caseName, "Invalid caseName parameter type.");
        assert.inArray(shevchenko.getCaseNames(), caseName, "Invalid caseName parameter value.");
    };

    const sort = {};

    sort.rulesByApplicationDesc = (firstRule, secondRule, application) => {
        return !firstRule.applications.length && secondRule.applications.length && secondRule.applications.indexOf(application) !== -1;
    };

    const filter = {};

    filter.rulesByApplication = (rule, application, strict) => {
        if (rule.applications.length) {
            return rule.applications.some((ruleApplication) => ruleApplication === application);
        }
        return !strict;
    };

    filter.rulesByGender = (rule, gender) => {
        return rule.gender.indexOf(gender) !== -1;
    };

    filter.rulesByRegexp = (rule, value) => {
        return (new RegExp(rule.regexp.find, "gm")).test(value);
    };

    const stringCaseMask = {};

    /**
     * Load the case mask from the string.
     *
     * @param {string} string
     * @returns {Array}
     */
    stringCaseMask.loadMask = (string) => {
        assert.string(string);
        const mask = [];
        let index = 0;
        while (index < string.length) {
            let char = string.charAt(index);
            if (char === char.toUpperCase() && char !== char.toLowerCase()) mask.push("u");
            else if (char === char.toLowerCase() && char !== char.toUpperCase()) mask.push("l");
            else mask.push(null);
            index++;
        }
        return mask;
    };

    /**
     * Apply the case mask to the string.
     *
     * @param {Array} mask
     * @param {string} string
     * @returns {string}
     */
    stringCaseMask.applyByMask = (mask, string) => {
        let result = "";
        let index = 0;
        while (index < string.length) {
            let char = string.charAt(index);
            let charMask = mask[index];
            if (typeof charMask === "undefined") charMask = mask[mask.length - 1];
            if (charMask === "u") char = char.toUpperCase();
            else if (charMask === "l") char = char.toLowerCase();
            result += char;
            index++;
        }
        return result;
    };

    /**
     * Apply the case mask of the example string to the string.
     *
     * @param {string} exampleString
     * @param {string} string
     * @returns {string}
     */
    stringCaseMask.applyByExample = (exampleString, string) => {
        const mask = stringCaseMask.loadMask(exampleString);
        let result = "";
        let index = 0;
        while (index < string.length) {
            let char = string.charAt(index);
            let charMask = mask[index];
            if (typeof charMask === "undefined") charMask = mask[mask.length - 1];
            if (charMask === "u") char = char.toUpperCase();
            else if (charMask === "l") char = char.toLowerCase();
            result += char;
            index++;
        }
        return result;
    };

    if (typeof module !== "undefined" && module.hasOwnProperty("exports")) { // Export for Node.js environment.
        module.exports = shevchenko;
    } else if (typeof window !== "undefined") { // Export for a browser environment.
        window.shevchenko = shevchenko;
    } else {
        throw new Error("Unknown environment.");
    }

})();
