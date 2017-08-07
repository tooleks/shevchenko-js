"use strict";

(function () {

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
    shevchenko.inNominative = function (person) {
        return shevchenko(person, shevchenko.caseNameNominative);
    };

    /**
     * Inflect the person first, last and middle names in genitive case. / Відмінити прізвище, ім'я та по батькові особи в родовому відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inGenitive = function (person) {
        return shevchenko(person, shevchenko.caseNameGenitive);
    };

    /**
     * Inflect the person first, last and middle names in dative case. / Відмінити прізвище, ім'я та по батькові особи в давальному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inDative = function (person) {
        return shevchenko(person, shevchenko.caseNameDative);
    };

    /**
     * Inflect the person first, last and middle names in accusative case. / Відмінити прізвище, ім'я та по батькові особи в знахідному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inAccusative = function (person) {
        return shevchenko(person, shevchenko.caseNameAccusative);
    };

    /**
     * Inflect the person first, last and middle names in ablative case. / Відмінити прізвище, ім'я та по батькові особи в орудному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inAblative = function (person) {
        return shevchenko(person, shevchenko.caseNameAblative);
    };

    /**
     * Inflect the person first, last and middle names in locative case. / Відмінити прізвище, ім'я та по батькові особи в місцевому відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inLocative = function (person) {
        return shevchenko(person, shevchenko.caseNameLocative);
    };

    /**
     * Inflect the person first, last and middle names in vocative case. / Відмінити прізвище, ім'я та по батькові особи в кличному відмінку.
     *
     * @param {object} person
     * @returns {Object}
     */
    shevchenko.inVocative = function (person) {
        return shevchenko(person, shevchenko.caseNameVocative);
    };

    /**
     * Inflect the person first, last and middle names. / Відмінити прізвище, ім'я та по батькові особи.
     *
     * @example var result = shevchenko({
     *     gender: "male",
     *     lastName: "Петренко",
     *     firstName: "Петро",
     *     middleName: "Петрович"
     * }, shevchenko.caseNameVocative);
     *
     * @param {object} person
     * @param {string} caseName
     * @returns {object}
     */
    function shevchenko(person, caseName) {
        assert.personParameter(person);
        assert.caseNameParameter(caseName);

        var result = {};

        if (typeof person.lastName === "string") {
            result.lastName = inflector.inflectLastName(person.gender, person.lastName.toLowerCase(), caseName);
            if (typeof result.lastName === "undefined") {
                result.lastName = person.lastName;
            }
        }

        if (typeof person.firstName === "string") {
            result.firstName = inflector.inflectFirstName(person.gender, person.firstName.toLowerCase(), caseName);
            if (typeof result.firstName === "undefined") {
                result.firstName = person.firstName;
            }
        }

        if (typeof person.middleName === "string") {
            result.middleName = inflector.inflectMiddleName(person.gender, person.middleName.toLowerCase(), caseName);
            if (typeof result.middleName === "undefined") {
                result.middleName = person.middleName;
            }
        }

        formatter.formatResult(result);

        return result;
    }

    var inflector = {};

    inflector.inflectLastName = function (gender, lastName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filter.rulesByGender(rule, gender);
        }).filter(function (rule) {
            return filter.rulesByType(rule, "lastName");
        }).filter(function (rule) {
            return filter.rulesByRegexp(rule, lastName);
        }).sort(function (firstRule, secondRule) {
            return sort.rulesByTypeDesc(firstRule, secondRule, "lastName");
        }).map(function (rule) {
            return inflector.inflectByRule(rule, caseName, lastName);
        }).shift();
    };

    inflector.inflectFirstName = function (gender, firstName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filter.rulesByGender(rule, gender);
        }).filter(function (rule) {
            return filter.rulesByType(rule, "firstName");
        }).filter(function (rule) {
            return filter.rulesByRegexp(rule, firstName);
        }).sort(function (firstRule, secondRule) {
            return sort.rulesByTypeDesc(firstRule, secondRule, "firstName");
        }).map(function (rule) {
            return inflector.inflectByRule(rule, caseName, firstName);
        }).shift();
    };

    inflector.inflectMiddleName = function (gender, middleName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filter.rulesByGender(rule, gender);
        }).filter(function (rule) {
            return filter.rulesByType(rule, "middleName", true);
        }).filter(function (rule) {
            return filter.rulesByRegexp(rule, middleName);
        }).sort(function (firstRule, secondRule) {
            return sort.rulesByTypeDesc(firstRule, secondRule, "middleName");
        }).map(function (rule) {
            return inflector.inflectByRule(rule, caseName, middleName);
        }).shift();
    };

    inflector.inflectByRule = function (rule, caseName, word) {
        var ruleType = rule.applyType;
        var regexp = rule.regexp.modify;
        var caseValue = rule.cases[caseName][0];
        return inflector.getInflectionCallbacks()[ruleType](regexp, word, caseValue);
    };

    inflector.getInflectionCallbacks = function () {
        return {
            "append": function (regexp, word, caseValue) {
                if (typeof caseValue !== "string") {
                    throw new Error("Invalid caseValue parameter type exception.");
                }
                if (caseValue.length) {
                    return word + caseValue;
                }
                return word;
            },
            "replace": function (regexp, word, caseValue) {
                if (typeof regexp !== "string") {
                    throw new Error("Invalid regexp parameter type exception.");
                }
                if (typeof caseValue !== "string") {
                    throw new Error("Invalid caseValue parameter type exception.");
                }
                if (caseValue.length) {
                    return word.replace(new RegExp(regexp, "gm"), caseValue);
                }
                return word;
            }
        };
    };

    var assert = {};

    assert.personParameter = function (person) {
        if (typeof person !== "object") {
            throw new Error("Invalid person parameter type.");
        }
        if (!person.hasOwnProperty("gender")) {
            throw new Error("No gender property found in the person parameter.");
        }
        if (typeof person.gender !== "string") {
            throw new Error("Invalid gender property type provided in the person parameter.");
        }
        if (shevchenko.getGenders().indexOf(person.gender) === -1) {
            throw new Error("Invalid gender property value provided in the person parameter.");
        }
        if (!person.hasOwnProperty("firstName") && !person.hasOwnProperty("middleName") && !person.hasOwnProperty("lastName")) {
            throw new Error("No name properties found in the person parameter.");
        }
        if (person.hasOwnProperty("lastName")) {
            assert.personLastNameParameter(person.lastName);
        }
        if (person.hasOwnProperty("firstName")) {
            assert.personFirstNameParameter(person.firstName);
        }
        if (person.hasOwnProperty("middleName")) {
            assert.personMiddleNameParameter(person.middleName);
        }
    };

    assert.personLastNameParameter = function (lastName) {
        if (typeof lastName !== "string") {
            throw new Error("Invalid person lastName parameter type.");
        }
    };

    assert.personFirstNameParameter = function (firstName) {
        if (typeof firstName !== "string") {
            throw new Error("Invalid person firstName parameter type.");
        }
    };

    assert.personMiddleNameParameter = function (middleName) {
        if (typeof middleName !== "string") {
            throw new Error("Invalid person middleName parameter type.");
        }
    };

    assert.caseNameParameter = function (caseName) {
        if (typeof caseName !== "string") {
            throw new Error("Invalid caseName type.");
        }
        if (shevchenko.getCaseNames().indexOf(caseName) === -1) {
            throw new Error("Invalid caseName value.");
        }
    };

    var sort = {};

    sort.rulesByTypeDesc = function (firstRule, secondRule, type) {
        return !firstRule.hasOwnProperty("types") && secondRule.hasOwnProperty("types") && secondRule.types.indexOf(type) !== -1;
    };

    var filter = {};

    filter.rulesByType = function (rule, type, strict) {
        if (!rule.hasOwnProperty("types")) {
            return !strict;
        }
        return rule.types.some(function (ruleType) {
            return ruleType === type;
        });
    };

    filter.rulesByGender = function (rule, gender) {
        return rule.gender.indexOf(gender) !== -1;
    };

    filter.rulesByRegexp = function (rule, value) {
        return (new RegExp(rule.regexp.find, "gm")).test(value);
    };

    var formatter = {};

    formatter.formatResult = function (result) {
        result.lastName = formatter.capitalize(result.lastName);
        result.firstName = formatter.capitalize(result.firstName);
        result.middleName = formatter.capitalize(result.middleName);
    };

    formatter.capitalize = function (string) {
        if (typeof string !== "string") {
            return string;
        }
        if (string.length === 0) {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    if (typeof module !== "undefined" && module.hasOwnProperty("exports")) { // Export for Node.js environment.
        module.exports = shevchenko;
    } else if (typeof window !== "undefined") { // Export for a browser environment.
        window.shevchenko = shevchenko;
    } else {
        throw new Error("Unknown environment.");
    }

})();
