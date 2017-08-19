"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Assert = {};

/**
 * Assert than a value is a string.
 *
 * @param value
 * @param {string|null} errorMessage
 */
Assert.number = function (value) {
  var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (typeof value !== "number") Assert.throw(errorMessage);
};

/**
 * Assert than a value is a string.
 *
 * @param value
 * @param {string|null} errorMessage
 */
Assert.string = function (value) {
  var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (typeof value !== "string") Assert.throw(errorMessage);
};

/**
 * Assert than a value is an object.
 *
 * @param value
 * @param {string|null} errorMessage
 */
Assert.object = function (value) {
  var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if ((typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object") Assert.throw(errorMessage);
};

/**
 * Assert than a value is an array.
 *
 * @param value
 * @param {string|null} errorMessage
 */
Assert.array = function (value) {
  var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!(value instanceof Array)) Assert.throw(errorMessage);
};

/**
 * Assert than a value exists in array.
 *
 * @param {Array} array
 * @param value
 * @param {string|null} errorMessage
 */
Assert.inArray = function (array, value) {
  var errorMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (array.indexOf(value) === -1) Assert.throw(errorMessage);
};

/**
 * Throw an assertion errorMessage.
 *
 * @param {string|null} errorMessage
 */
Assert.throw = function (errorMessage) {
  throw new Error(errorMessage || "Invalid value.");
};

module.exports = Assert;