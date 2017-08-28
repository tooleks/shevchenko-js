"use strict";

/**
 * Contains a set of methods for a values assertions.
 *
 * @type {Object}
 */
const assert = {};

/**
 * Assert than a value is a string.
 *
 * @param value
 * @param {string|null} errorMessage
 */
assert.number = (value, errorMessage = null) => {
    if (typeof value !== "number") assert.throw(errorMessage);
};

/**
 * Assert than a value is a string.
 *
 * @param value
 * @param {string|null} errorMessage
 */
assert.string = (value, errorMessage = null) => {
    if (typeof value !== "string") assert.throw(errorMessage);
};

/**
 * Assert than a value is an object.
 *
 * @param value
 * @param {string|null} errorMessage
 */
assert.object = (value, errorMessage = null) => {
    if (typeof value !== "object") assert.throw(errorMessage);
};

/**
 * Assert than a value is an array.
 *
 * @param value
 * @param {string|null} errorMessage
 */
assert.array = (value, errorMessage = null) => {
    if (!(value instanceof Array)) assert.throw(errorMessage);
};

/**
 * Assert than a value exists in array.
 *
 * @param {Array} array
 * @param value
 * @param {string|null} errorMessage
 */
assert.inArray = (array, value, errorMessage = null) => {
    if (array.indexOf(value) === -1) assert.throw(errorMessage);
};

/**
 * Throw an assertion errorMessage.
 *
 * @param {string|null} errorMessage
 */
assert.throw = (errorMessage) => {
    throw new Error(errorMessage || "Invalid value.");
};

module.exports = assert;
