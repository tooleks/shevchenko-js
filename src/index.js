"use strict";

const Inflector = require("./Inflector");

const inflector = new Inflector(process.env.INFLECTION_RULES);

/**
 * Inflect the person's first, last and middle names.
 *
 * @param {Object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.middleName
 * @param {string} person.gender
 * @param {string} inflectionCaseName
 */
const shevchenko = (person, inflectionCaseName) => inflector.inflect(person, inflectionCaseName);

/**
 * Inflect the person's first, last and middle names in nominative case.
 *
 * @param {Object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.middleName
 * @param {string} person.gender
 */
shevchenko.inNominative = (person) => inflector.inflect(person, Inflector.INFLECTION_CASE_NAMES.NOMINATIVE);

/**
 * Inflect the person's first, last and middle names in genitive case.
 *
 * @param {Object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.middleName
 * @param {string} person.gender
 */
shevchenko.inGenitive = (person) => inflector.inflect(person, Inflector.INFLECTION_CASE_NAMES.GENITIVE);

/**
 * Inflect the person's first, last and middle names in dative case.
 *
 * @param {Object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.middleName
 * @param {string} person.gender
 */
shevchenko.inDative = (person) => inflector.inflect(person, Inflector.INFLECTION_CASE_NAMES.DATIVE);

/**
 * Inflect the person's first, last and middle names in accusative case.
 *
 * @param {Object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.middleName
 * @param {string} person.gender
 */
shevchenko.inAccusative = (person) => inflector.inflect(person, Inflector.INFLECTION_CASE_NAMES.ACCUSATIVE);

/**
 * Inflect the person's first, last and middle names in ablative case.
 *
 * @param {Object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.middleName
 * @param {string} person.gender
 */
shevchenko.inAblative = (person) => inflector.inflect(person, Inflector.INFLECTION_CASE_NAMES.ABLATIVE);

/**
 * Inflect the person's first, last and middle names in locative case.
 *
 * @param {Object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.middleName
 * @param {string} person.gender
 */
shevchenko.inLocative = (person) => inflector.inflect(person, Inflector.INFLECTION_CASE_NAMES.LOCATIVE);

/**
 * Inflect the person's first, last and middle names in vocative case.
 *
 * @param {Object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.middleName
 * @param {string} person.gender
 */
shevchenko.inVocative = (person) => inflector.inflect(person, Inflector.INFLECTION_CASE_NAMES.VOCATIVE);

/**
 * Inflect the person's first, last and middle names in all cases.
 *
 * @param {Object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.middleName
 * @param {string} person.gender
 */
shevchenko.inAll = (person) => {
    return Object.values(Inflector.INFLECTION_CASE_NAMES).reduce((results, inflectionCaseName) => {
        results[inflectionCaseName] = shevchenko(person, inflectionCaseName);
        return results;
    }, {});
};

/**
 * Available gender names.
 *
 * @type {Readonly}
 */
shevchenko.GENDER_NAMES = Object.freeze({...Inflector.GENDER_NAMES});

/**
 * Available inflection case names.
 *
 * @type {Readonly}
 */
shevchenko.INFLECTION_CASE_NAMES = Object.freeze({...Inflector.INFLECTION_CASE_NAMES});

module.exports = shevchenko;
