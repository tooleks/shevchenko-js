import InflectionCase from './models/InflectionCase';
import {INFLECTION_CASES} from './models/InflectionCase';
import Anthroponym from './models/Anthroponym';
import {GENDERS} from './models/Gender';
import {anthroponymInflector} from './bootstrap';

/**
 * Inflect the anthroponym.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 * @param {string} inflectionCase
 */
function shevchenko(anthroponym, inflectionCase) {
  return anthroponymInflector.inflect(new Anthroponym(anthroponym), new InflectionCase(inflectionCase)).toObject();
}

/**
 * Inflect the anthroponym in nominative case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
function inNominative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASES.NOMINATIVE);
}

/**
 * Inflect the anthroponym in genitive case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
function inGenitive(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASES.GENITIVE);
}

/**
 * Inflect the anthroponym in dative case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
function inDative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASES.DATIVE);
}

/**
 * Inflect the anthroponym in accusative case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
function inAccusative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASES.ACCUSATIVE);
}

/**
 * Inflect the anthroponym in ablative case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
function inAblative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASES.ABLATIVE);
}

/**
 * Inflect the anthroponym in locative case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
function inLocative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASES.LOCATIVE);
}

/**
 * Inflect the anthroponym in vocative case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
function inVocative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASES.VOCATIVE);
}

/**
 * Inflect the anthroponym in all cases.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
function inAll(anthroponym) {
  return Object.values(INFLECTION_CASES).reduce((results, inflectionCase) => {
    results[inflectionCase] = shevchenko(anthroponym, inflectionCase);
    return results;
  }, {});
}

export {
  inNominative,
  inGenitive,
  inDative,
  inAccusative,
  inAblative,
  inLocative,
  inVocative,
  inAll,
  GENDERS,
  INFLECTION_CASES,
};

shevchenko.inNominative = inNominative;
shevchenko.inGenitive = inGenitive;
shevchenko.inDative = inDative;
shevchenko.inAccusative = inAccusative;
shevchenko.inAblative = inAblative;
shevchenko.inLocative = inLocative;
shevchenko.inVocative = inVocative;
shevchenko.inAll = inAll;
shevchenko.GENDERS = GENDERS;
shevchenko.INFLECTION_CASES = INFLECTION_CASES;

export default shevchenko;
