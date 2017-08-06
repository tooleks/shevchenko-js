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
        assertPerson(person);
        assertCaseName(caseName);
        normalizePerson(person);

        var result = {};

        if (typeof person.lastName !== "undefined") {
            result.lastName = inflectLastName(person.gender, person.lastName, caseName);
        }
        if (typeof person.firstName !== "undefined") {
            result.firstName = inflectFirstName(person.gender, person.firstName, caseName);
        }
        if (typeof person.middleName !== "undefined") {
            result.middleName = inflectMiddleName(person.gender, person.middleName, caseName);
        }

        if (typeof person.lastName !== "undefined" && typeof result.lastName === "undefined") {
            result.lastName = person.lastName;
        }
        if (typeof person.fistName !== "undefined" && typeof result.lastName === "undefined") {
            result.fistName = person.fistName;
        }
        if (typeof person.middleName !== "undefined" && typeof result.lastName === "undefined") {
            result.middleName = person.middleName;
        }

        return result;
    }

    function assertPerson(person) {
        if (typeof person !== "object") {
            throw new Error("Invalid person object type.");
        }
        if (!person.hasOwnProperty("gender")) {
            throw new Error("No gender property found in the person object.");
        }
        if (typeof person.gender !== "string") {
            throw new Error("Invalid gender property type provided in the person object.");
        }
        if (shevchenko.getGenders().indexOf(person.gender) === -1) {
            throw new Error("Invalid gender property value provided in the person object.");
        }
        if (!person.hasOwnProperty("firstName") && !person.hasOwnProperty("middleName") && !person.hasOwnProperty("lastName")) {
            throw new Error("No name properties found in the person object.");
        }
    }

    function assertCaseName(caseName) {
        if (typeof caseName !== "string") {
            throw new Error("Invalid caseName type.");
        }
        if (shevchenko.getCaseNames().indexOf(caseName) === -1) {
            throw new Error("Invalid caseName value.");
        }
    }

    function normalizePerson(person) {
        if (person.hasOwnProperty("lastName") && typeof person.lastName !== "undefined") {
            person.lastName = person.lastName.toLowerCase();
        }
        if (person.hasOwnProperty("firstName") && typeof person.firstName !== "undefined") {
            person.firstName = person.firstName.toLowerCase();
        }
        if (person.hasOwnProperty("middleName") && typeof person.middleName !== "undefined") {
            person.middleName = person.middleName.toLowerCase();
        }
    }

    function inflectLastName(gender, lastName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filterRulesByGender(rule, gender);
        }).filter(function (rule) {
            return filterRulesByType(rule, "lastName");
        }).filter(function (rule) {
            return filterRulesByRegexp(rule, lastName);
        }).sort(function (firstRule, secondRule) {
            return sortByTypeAndPriorityDesc(firstRule, secondRule, "lastName");
        }).map(function (rule) {
            return inflectByRule(rule, caseName, lastName);
        }).shift();
    }

    function inflectFirstName(gender, firstName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filterRulesByGender(rule, gender);
        }).filter(function (rule) {
            return filterRulesByType(rule, "firstName");
        }).filter(function (rule) {
            return filterRulesByRegexp(rule, firstName);
        }).sort(function (firstRule, secondRule) {
            return sortByTypeAndPriorityDesc(firstRule, secondRule, "firstName");
        }).map(function (rule) {
            return inflectByRule(rule, caseName, firstName);
        }).shift();
    }

    function inflectMiddleName(gender, middleName, caseName) {
        return shevchenko.getRules().filter(function (rule) {
            return filterRulesByGender(rule, gender);
        }).filter(function (rule) {
            return filterRulesByType(rule, "middleName", true);
        }).filter(function (rule) {
            return filterRulesByRegexp(rule, middleName);
        }).sort(function (firstRule, secondRule) {
            return sortByTypeAndPriorityDesc(firstRule, secondRule, "middleName");
        }).map(function (rule) {
            return inflectByRule(rule, caseName, middleName);
        }).shift();
    }

    function inflectByRule(rule, caseName, word) {
        var ruleType = rule.applyType;
        var regexp = rule.regexp.modify;
        var caseValue = rule.cases[caseName][0];
        return getInflectionCallbacks()[ruleType](regexp, word, caseValue);
    }

    function getInflectionCallbacks() {
        return {
            "append": function (regexp, word, caseValue) {
                if (typeof caseValue !== "string") {
                    throw new Error("Invalid parameter type exception.");
                }
                if (caseValue.length) {
                    return word + caseValue;
                }
                return word;
            },
            "replace": function (regexp, word, caseValue) {
                if (typeof regexp !== "string") {
                    throw new Error("Invalid parameter type exception.");
                }
                if (typeof caseValue !== "string") {
                    throw new Error("Invalid parameter type exception.");
                }
                if (caseValue.length) {
                    return word.replace(new RegExp(regexp, "gm"), caseValue);
                }
                return word;
            }
        };
    }

    function sortByTypeAndPriorityDesc(firstRule, secondRule, type) {
        return !firstRule.hasOwnProperty("types") && secondRule.hasOwnProperty("types") && secondRule.types.indexOf(type) !== -1
            ? 1
            : 0;
    }

    function filterRulesByType(rule, type, strict) {
        if (!rule.hasOwnProperty("types")) {
            return !strict;
        }
        return rule.types.some(function (ruleType) {
            return ruleType === type;
        });
    }

    function filterRulesByGender(rule, gender) {
        return rule.gender.indexOf(gender) !== -1;
    }

    function filterRulesByRegexp(rule, value) {
        return (new RegExp(rule.regexp.find, "gm")).test(value);
    }

    if (typeof module !== "undefined" && module.hasOwnProperty("exports")) { // Export for Node.js environment.
        module.exports = shevchenko;
    } else if (typeof window !== "undefined") { // Export for a browser environment.
        window.shevchenko = shevchenko;
    } else {
        throw new Error("Unknown environment.");
    }

})();
