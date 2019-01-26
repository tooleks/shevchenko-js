import {INFLECTION_CASES} from './InflectionCase';
import {GENDERS} from './Gender';

/**
 * Validate gender value.
 *
 * @param {*} gender
 * @return {void}
 * @throws {TypeError}
 */
export function genderValue(gender) {
  const allowedValues = Object.values(GENDERS);
  const isAllowedValue = allowedValues.includes(gender);
  if (!isAllowedValue) {
    throw new TypeError(`Invalid gender value. Allowed values: ${allowedValues.join(', ')}.`);
  }
}

/**
 * Validate inflection case value.
 *
 * @param {*} inflectionCase
 * @return {void}
 * @throws {TypeError}
 */
export function inflectionCaseValue(inflectionCase) {
  const allowedValues = Object.values(INFLECTION_CASES);
  const isAllowedValue = allowedValues.includes(inflectionCase);
  if (!isAllowedValue) {
    throw new TypeError(`Invalid inflection case value. Allowed values: ${allowedValues.join(', ')}.`);
  }
}

/**
 * Validate first name value.
 *
 * @param {*} firstName
 * @return {void}
 * @throws {TypeError}
 */
export function firstNameValue(firstName) {
  const isAllowedType = typeof firstName === 'string';
  if (!isAllowedType) {
    throw new TypeError('Invalid first name type. Allowed types: string.');
  }
}

/**
 * Validate middle name value.
 *
 * @param {*} middleName
 * @return {void}
 * @throws {TypeError}
 */
export function middleNameValue(middleName) {
  const isAllowedType = typeof middleName === 'string';
  if (!isAllowedType) {
    throw new TypeError('Invalid middle name type. Allowed types: string.');
  }
}

/**
 * Validate last name value.
 *
 * @param {*} lastName
 * @return {void}
 * @throws {TypeError}
 */
export function lastNameValue(lastName) {
  const isAllowedType = typeof lastName === 'string';
  if (!isAllowedType) {
    throw new TypeError('Invalid last name type. Allowed types: string.');
  }
}

/**
 * Validate anthroponym value.
 *
 * @param {*} anthroponym
 * @return {void}
 * @throws {TypeError}
 */
export function anthroponymValue(anthroponym) {
  const isAllowedType = typeof anthroponym === 'object' && anthroponym !== null;
  if (!isAllowedType) {
    throw new TypeError('Invalid anthroponym type. Allowed types: object.');
  }

  const hasFirstName = Object.prototype.hasOwnProperty.call(anthroponym, 'firstName');
  const hasMiddleName = Object.prototype.hasOwnProperty.call(anthroponym, 'middleName');
  const hasLastName = Object.prototype.hasOwnProperty.call(anthroponym, 'lastName');
  if (!hasFirstName && !hasMiddleName && !hasLastName) {
    throw new TypeError('Invalid anthroponym value.');
  }

  genderValue(anthroponym.gender);

  if (hasFirstName) {
    firstNameValue(anthroponym.firstName);
  }

  if (hasMiddleName) {
    middleNameValue(anthroponym.middleName);
  }

  if (hasLastName) {
    lastNameValue(anthroponym.lastName);
  }
}

export default {genderValue, inflectionCaseValue, firstNameValue, middleNameValue, lastNameValue, anthroponymValue};
