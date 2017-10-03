"use strict";

/**
 * Contains a set of methods for type checking.
 *
 * @type {Object}
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var type = {};

/**
 * Determine if a value is `string`.
 *
 * @param value
 * @return {boolean}
 */
type.string = function (value) {
  return typeof value === "string";
};

/**
 * Determine if a value is not `string`.
 *
 * @param value
 * @return {boolean}
 */
type.notString = function (value) {
  return !type.string(value);
};

/**
 * Determine if a value is `boolean`.
 *
 * @param value
 * @return {boolean}
 */
type.boolean = function (value) {
  return typeof value === "boolean";
};

/**
 * Determine if a value is not `boolean`.
 *
 * @param value
 * @return {boolean}
 */
type.notBoolean = function (value) {
  return !type.boolean(value);
};

/**
 * Determine if a value is `number`.
 *
 * @param value
 * @return {boolean}
 */
type.number = function (value) {
  return typeof value === "number";
};

/**
 * Determine if a value is not `number`.
 *
 * @param value
 * @return {boolean}
 */
type.notNumber = function (value) {
  return !type.number(value);
};

/**
 * Determine if a value is `function`.
 *
 * @param value
 * @return {boolean}
 */
type.function = function (value) {
  return typeof value === "function";
};

/**
 * Determine if a value is not `function`.
 *
 * @param value
 * @return {boolean}
 */
type.notFunction = function (value) {
  return !type.function(value);
};

/**
 * Determine if a value is `object`.
 *
 * @param value
 * @return {boolean}
 */
type.object = function (value) {
  return (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object";
};

/**
 * Determine if a value is not `object`.
 *
 * @param value
 * @return {boolean}
 */
type.notObject = function (value) {
  return !type.object(value);
};

/**
 * Determine if a value is `Array`.
 *
 * @param value
 * @return {boolean}
 */
type.array = function (value) {
  return value instanceof Array;
};

/**
 * Determine if a value is not `Array`.
 *
 * @param value
 * @return {boolean}
 */
type.notArray = function (value) {
  return !type.array(value);
};

/**
 * Determine if a value is `undefined`.
 *
 * @param value
 * @return {boolean}
 */
type.undefined = function (value) {
  return typeof value === "undefined";
};

/**
 * Determine if a value is not `undefined`.
 *
 * @param value
 * @return {boolean}
 */
type.notUndefined = function (value) {
  return !type.undefined(value);
};

/**
 * Determine if a value equals to `null`.
 *
 * @param value
 * @return {boolean}
 */
type.null = function (value) {
  return value === null;
};

/**
 * Determine if a value not equals to `null`.
 *
 * @param value
 * @return {boolean}
 */
type.notNull = function (value) {
  return !type.null(value);
};

/**
 * Determine if a value not equals to `null` and not `undefined`.
 *
 * @param value
 * @return {boolean}
 */
type.valuable = function (value) {
  return type.notUndefined(value) && type.notNull(value);
};

/**
 * Determine if a value equals to `null` or `undefined`.
 *
 * @param value
 * @return {boolean}
 */
type.notValuable = function (value) {
  return !type.valuable(value);
};

module.exports = type;