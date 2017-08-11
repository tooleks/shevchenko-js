"use strict";

(() => {

    /**
     * Inflection rules. / Правила відмінювання.
     *
     * @type {Array<object>}
     */
    shevchenko.rules = [] /* gulp build:rules */;

    /**
     * Male gender. / Чоловічий рід.
     *
     * @type {string}
     */
    shevchenko.genderMale = "male";

    /**
     * Female gender. / Жіночий рід.
     *
     * @type {string}
     */
    shevchenko.genderFemale = "female";

    /**
     * Nominative case. / Називний відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameNominative = "nominative";

    /**
     * Genitive case. / Родовий відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameGenitive = "genitive";

    /**
     * Dative case. / Давальний відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameDative = "dative";

    /**
     * Accusative case. / Знахідний відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameAccusative = "accusative";

    /**
     * Ablative case. / Орудний відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameAblative = "ablative";

    /**
     * Locative case. / Місцевий відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameLocative = "locative";

    /**
     * Vocative case. / Кличний відмінок.
     *
     * @type {string}
     */
    shevchenko.caseNameVocative = "vocative";

    /**
     * Get available rules. / Отримати доступні правила.
     *
     * @returns {Array<object>}
     */
    shevchenko.getRules = function () {
        return shevchenko.rules.slice(0);
    };

    /**
     * Get available genders. / Отримати доступні роди.
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
     * Get available case names. / Отримати доступні відмінки.
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
     * Inflect the person first, last and middle names in nominative case. / Відмінити прізвище, ім'я та по батькові особи в називному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inNominative = (person) => shevchenko(person, shevchenko.caseNameNominative);

    /**
     * Inflect the person first, last and middle names in genitive case. / Відмінити прізвище, ім'я та по батькові особи в родовому відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inGenitive = (person) => shevchenko(person, shevchenko.caseNameGenitive);

    /**
     * Inflect the person first, last and middle names in dative case. / Відмінити прізвище, ім'я та по батькові особи в давальному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inDative = (person) => shevchenko(person, shevchenko.caseNameDative);

    /**
     * Inflect the person first, last and middle names in accusative case. / Відмінити прізвище, ім'я та по батькові особи в знахідному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inAccusative = (person) => shevchenko(person, shevchenko.caseNameAccusative);

    /**
     * Inflect the person first, last and middle names in ablative case. / Відмінити прізвище, ім'я та по батькові особи в орудному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inAblative = (person) => shevchenko(person, shevchenko.caseNameAblative);

    /**
     * Inflect the person first, last and middle names in locative case. / Відмінити прізвище, ім'я та по батькові особи в місцевому відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inLocative = (person) => shevchenko(person, shevchenko.caseNameLocative);

    /**
     * Inflect the person first, last and middle names in vocative case. / Відмінити прізвище, ім'я та по батькові особи в кличному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inVocative = (person) => shevchenko(person, shevchenko.caseNameVocative);

    /**
     * Inflect the person first, last and middle names. / Відмінити прізвище, ім'я та по батькові особи.
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
            // Inflect recursively each part of the double last name.
            return lastNames.map((lastName) => inflector.inflectLastName(gender, lastName, caseName)).join("-");
        }
        return shevchenko
            .getRules()
            .filter((rule) => filter.rulesByGender(rule, gender))
            .filter((rule) => filter.rulesByType(rule, "lastName"))
            .filter((rule) => filter.rulesByRegexp(rule, lastName))
            .sort((firstRule, secondRule) => sort.rulesByTypeDesc(firstRule, secondRule, "lastName"))
            .map((rule) => inflector.inflectByRule(rule, caseName, lastName))
            .shift();
    };

    inflector.inflectFirstName = function (gender, firstName, caseName) {
        return shevchenko
            .getRules()
            .filter((rule) => filter.rulesByGender(rule, gender))
            .filter((rule) => filter.rulesByType(rule, "firstName"))
            .filter((rule) => filter.rulesByRegexp(rule, firstName))
            .sort((firstRule, secondRule) => sort.rulesByTypeDesc(firstRule, secondRule, "firstName"))
            .map((rule) => inflector.inflectByRule(rule, caseName, firstName))
            .shift();
    };

    inflector.inflectMiddleName = function (gender, middleName, caseName) {
        return shevchenko
            .getRules()
            .filter((rule) => filter.rulesByGender(rule, gender))
            .filter((rule) => filter.rulesByType(rule, "middleName", true))
            .filter((rule) => filter.rulesByRegexp(rule, middleName))
            .sort((firstRule, secondRule) => sort.rulesByTypeDesc(firstRule, secondRule, "middleName"))
            .map((rule) => inflector.inflectByRule(rule, caseName, middleName))
            .shift();
    };

    inflector.inflectByRule = function (rule, caseName, value) {
        const ruleType = rule.applyType;
        const regexp = rule.regexp.modify;
        const modifier = rule.cases[caseName][0];
        return inflector.getInflectionCallbacks()[ruleType](regexp, modifier, value);
    };

    inflector.getInflectionCallbacks = function () {
        return {
            "append": (regexp, modifier, value) => {
                assert.string(regexp, "Invalid regexp type of the rule.");
                assert.string(modifier, "Invalid modifier type of the rule.");
                assert.string(value, "Invalid value type provided into the inflection function.");
                return modifier.length
                    ? value + modifier
                    : value;
            },
            "replace": (regexp, modifier, value) => {
                assert.string(regexp, "Invalid regexp type of the rule.");
                assert.string(modifier, "Invalid modifier type of the rule.");
                assert.string(value, "Invalid value type provided into the inflection function.");
                return modifier.length
                    ? value.replace(new RegExp(regexp, "gm"), modifier)
                    : value;
            }
        };
    };

    const assert = {};

    assert.object = function (value, error) {
        if (typeof value !== "object") assert.throw(error);
    };

    assert.string = function (value, error) {
        if (typeof value !== "string") assert.throw(error);
    };

    assert.inArray = function (array, value, error) {
        if (array.indexOf(value) === -1) assert.throw(error);
    };

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

    sort.rulesByTypeDesc = function (firstRule, secondRule, type) {
        return !firstRule.hasOwnProperty("types") && secondRule.hasOwnProperty("types") && secondRule.types.indexOf(type) !== -1;
    };

    const filter = {};

    filter.rulesByType = function (rule, type, strict) {
        if (rule.hasOwnProperty("types")) {
            return rule.types.some((ruleType) => ruleType === type);
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
