"use strict";

/**
 * Contains a set of methods for type checking.
 *
 * @type {object}
 */
const type = {};

/**
 * Determine if a value is `string`.
 *
 * @param value
 * @return {boolean}
 */
type.string = (value) => typeof value === "string";

/**
 * Determine if a value is not `string`.
 *
 * @param value
 * @return {boolean}
 */
type.notString = (value) => !type.string(value);

/**
 * Determine if a value is `boolean`.
 *
 * @param value
 * @return {boolean}
 */
type.boolean = (value) => typeof value === "boolean";

/**
 * Determine if a value is not `boolean`.
 *
 * @param value
 * @return {boolean}
 */
type.notBoolean = (value) => !type.boolean(value);

/**
 * Determine if a value is `number`.
 *
 * @param value
 * @return {boolean}
 */
type.number = (value) => typeof value === "number";

/**
 * Determine if a value is not `number`.
 *
 * @param value
 * @return {boolean}
 */
type.notNumber = (value) => !type.number(value);

/**
 * Determine if a value is `function`.
 *
 * @param value
 * @return {boolean}
 */
type.function = (value) => typeof value === "function";

/**
 * Determine if a value is not `function`.
 *
 * @param value
 * @return {boolean}
 */
type.notFunction = (value) => !type.function(value);

/**
 * Determine if a value is `object`.
 *
 * @param value
 * @return {boolean}
 */
type.object = (value) => typeof value === "object";

/**
 * Determine if a value is not `object`.
 *
 * @param value
 * @return {boolean}
 */
type.notObject = (value) => !type.object(value);

/**
 * Determine if a value is `Array`.
 *
 * @param value
 * @return {boolean}
 */
type.array = (value) => value instanceof Array;

/**
 * Determine if a value is not `Array`.
 *
 * @param value
 * @return {boolean}
 */
type.notArray = (value) => !type.array(value);

/**
 * Determine if a value is `undefined`.
 *
 * @param value
 * @return {boolean}
 */
type.undefined = (value) => typeof value === "undefined";

/**
 * Determine if a value is not `undefined`.
 *
 * @param value
 * @return {boolean}
 */
type.notUndefined = (value) => !type.undefined(value);

/**
 * Determine if a value equals to `null`.
 *
 * @param value
 * @return {boolean}
 */
type.null = (value) => value === null;

/**
 * Determine if a value not equals to `null`.
 *
 * @param value
 * @return {boolean}
 */
type.notNull = (value) => !type.null(value);

/**
 * Determine if a value not equals to `null` and not `undefined`.
 *
 * @param value
 * @return {boolean}
 */
type.valuable = (value) => type.notUndefined(value) && type.notNull(value);

/**
 * Determine if a value equals to `null` or `undefined`.
 *
 * @param value
 * @return {boolean}
 */
type.notValuable = (value) => !type.valuable(value);

module.exports = type;
