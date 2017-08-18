"use strict";

(() => {

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
    };

    validator.validateCaseNameParameter = (caseName) => {
        assert.string(caseName, "Invalid 'caseName' type.");
        assert.inArray(shevchenko.getCaseNames(), caseName, "Invalid 'caseName' value.");
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
     * An upper case identifier.
     *
     * @type {string}
     */
    stringCaseMask.upperCase = "u";

    /**
     * A lower case identifier.
     *
     * @type {string}
     */
    stringCaseMask.lowerCase = "l";

    /**
     * Not recognized case identifier.
     *
     * @type {string}
     */
    stringCaseMask.notRecognizedCase = null;

    /**
     * Detect if a character is a segment break character.
     *
     * Used in the double last names such as "Нечуй-Левицький", to create case mask segments for each word.
     *
     * @param {string} char
     * @return {boolean}
     */
    stringCaseMask.isSegmentBreakCharacter = (char) => char === "-";

    /**
     * Detect if a character is in the upper case.
     *
     * @param {string} char
     */
    stringCaseMask.isUpperCase = (char) => char === char.toUpperCase() && char !== char.toLowerCase();

    /**
     * Detect if a character is in the lower case.
     *
     * @param {string} char
     */
    stringCaseMask.isLowerCase = (char) => char === char.toLowerCase() && char !== char.toUpperCase();

    /**
     * Load the case mask from the string.
     *
     * @param {string} string
     * @returns {Object}
     */
    stringCaseMask.loadMask = (string) => {
        assert.string(string);
        const mask = {};
        let segmentNumber = 0;
        let stringIndex = 0;
        while (stringIndex < string.length) {
            let char = string.charAt(stringIndex++);
            // If the current character is a segment break character go to the next segment.
            if (stringCaseMask.isSegmentBreakCharacter(char)) {
                segmentNumber++;
                continue;
            }
            // Initialize the default value (an empty array) for a new segment.
            if (typeof mask[segmentNumber] === "undefined") mask[segmentNumber] = [];
            // If a character is in the upper case push the uppercase identifier into the segment array.
            if (stringCaseMask.isUpperCase(char)) mask[segmentNumber].push(stringCaseMask.upperCase);
            // If a character is in the lower case push the lowercase identifier into the segment array.
            else if (stringCaseMask.isLowerCase(char)) mask[segmentNumber].push(stringCaseMask.lowerCase);
            // If a character case is not recognized push the empty identifier into the segment array.
            else mask[segmentNumber].push(stringCaseMask.notRecognizedCase);
        }
        return mask;
    };

    /**
     * Apply the case mask to the string.
     *
     * @param {Object} mask
     * @param {string} string
     * @returns {string}
     */
    stringCaseMask.applyByMask = (mask, string) => {
        let result = "";
        let segmentNumber = 0;
        let segmentIndex = 0;
        let stringIndex = 0;
        while (stringIndex < string.length) {
            let char = string.charAt(stringIndex++);
            // If the current character is a segment break character go to the next segment and reset the segment index.
            if (stringCaseMask.isSegmentBreakCharacter(char)) {
                segmentNumber++;
                segmentIndex = -1;
            }
            let segment = mask[segmentNumber];
            let charMask = segment[segmentIndex++];
            // If the string length is bigger than a segment length set the character mask to the last segment character mask value.
            if (typeof charMask === "undefined") charMask = segment[segment.length - 1];
            // If a character mask equals the upper case identifier convert the character to upper case.
            if (charMask === stringCaseMask.upperCase) char = char.toUpperCase();
            // If a character mask equals the lower case identifier convert the character to lower case.
            else if (charMask === stringCaseMask.lowerCase) char = char.toLowerCase();
            // Append the character to the resulting string.
            result += char;
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
        return stringCaseMask.applyByMask(mask, string);
    };

    if (typeof module !== "undefined" && module.hasOwnProperty("exports")) { // Export for Node.js environment.
        module.exports = shevchenko;
    } else if (typeof window !== "undefined") { // Export for a browser environment.
        window.shevchenko = shevchenko;
    } else {
        throw new Error("Unknown environment.");
    }

})();
