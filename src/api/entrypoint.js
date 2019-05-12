import Joi from "joi";
import schema from "./schema";
import { GENDER, INFLECTION_CASE } from "../enums";
import { anthroponymInflector } from "../bootstrap";

/**
 * Inflects the anthroponym in a supplied grammatical case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 * @param {string} inflectionCase
 */
function shevchenko(anthroponym, inflectionCase) {
  const validation = Joi.validate({ anthroponym, inflectionCase }, schema);
  if (validation.error != null) {
    throw new TypeError(validation.error.message);
  }
  return anthroponymInflector.inflect(validation.value.anthroponym, validation.value.inflectionCase);
}

/**
 * Inflects the anthroponym in nominative grammatical case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
shevchenko.inNominative = function inNominative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASE.NOMINATIVE);
};

/**
 * Inflects the anthroponym in genitive grammatical case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
shevchenko.inGenitive = function inGenitive(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASE.GENITIVE);
};

/**
 * Inflects the anthroponym in dative grammatical case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
shevchenko.inDative = function inDative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASE.DATIVE);
};

/**
 * Inflects the anthroponym in accusative grammatical case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
shevchenko.inAccusative = function inAccusative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASE.ACCUSATIVE);
};

/**
 * Inflects the anthroponym in ablative grammatical case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
shevchenko.inAblative = function inAblative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASE.ABLATIVE);
};

/**
 * Inflects the anthroponym in locative grammatical case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
shevchenko.inLocative = function inLocative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASE.LOCATIVE);
};

/**
 * Inflects the anthroponym in vocative grammatical case.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
shevchenko.inVocative = function inVocative(anthroponym) {
  return shevchenko(anthroponym, INFLECTION_CASE.VOCATIVE);
};

/**
 * Inflects the anthroponym in all grammatical cases.
 *
 * @param {object} anthroponym
 * @param {string} anthroponym.firstName
 * @param {string} anthroponym.lastName
 * @param {string} anthroponym.middleName
 * @param {string} anthroponym.gender
 */
shevchenko.inAll = function inAll(anthroponym) {
  return Object.values(INFLECTION_CASE).reduce((results, inflectionCase) => {
    results[inflectionCase] = shevchenko(anthroponym, inflectionCase);
    return results;
  }, {});
};

shevchenko.GENDER = GENDER;
shevchenko.INFLECTION_CASE = INFLECTION_CASE;

export default shevchenko;
