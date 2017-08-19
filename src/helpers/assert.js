"use strict";

const Assert = {};

/**
 * Assert than a value is a string.
 *
 * @param value
 * @param {string|null} errorMessage
 */
Assert.number = (value, errorMessage = null) => {
    if (typeof value !== "number") Assert.throw(errorMessage);
};

/**
 * Assert than a value is a string.
 *
 * @param value
 * @param {string|null} errorMessage
 */
Assert.string = (value, errorMessage = null) => {
    if (typeof value !== "string") Assert.throw(errorMessage);
};

/**
 * Assert than a value is an object.
 *
 * @param value
 * @param {string|null} errorMessage
 */
Assert.object = (value, errorMessage = null) => {
    if (typeof value !== "object") Assert.throw(errorMessage);
};

/**
 * Assert than a value is an array.
 *
 * @param value
 * @param {string|null} errorMessage
 */
Assert.array = (value, errorMessage = null) => {
    if (!(value instanceof Array)) Assert.throw(errorMessage);
};

/**
 * Assert than a value exists in array.
 *
 * @param {Array} array
 * @param value
 * @param {string|null} errorMessage
 */
Assert.inArray = (array, value, errorMessage = null) => {
    if (array.indexOf(value) === -1) Assert.throw(errorMessage);
};

/**
 * Throw an assertion errorMessage.
 *
 * @param {string|null} errorMessage
 */
Assert.throw = (errorMessage) => {
    throw new Error(errorMessage || "Invalid value.");
};

module.exports = Assert;
