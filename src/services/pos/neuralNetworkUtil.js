import * as stringUtil from "../../util/stringUtil";
import { POS_MAPPING, NETWORK_LAYER_SIZE_INPUT } from "./config";

/**
 * Determines if provided value is a valid part of speech value.
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isValidPos(value) {
  return Object.keys(POS_MAPPING).includes(value);
}

/**
 * Encodes word value for usage in the neural network.
 *
 * @param {string} input
 * @returns {Array<string>}
 */
export function encodeInput(input) {
  return stringUtil
    .toBinary(input)
    .padStart(NETWORK_LAYER_SIZE_INPUT, "0")
    .split("");
}

/**
 * Encodes part of speech value for usage in the neural network.
 *
 * @param {string} output
 * @returns {Array<number>|undefined}
 */
export function encodeOutput(output) {
  return POS_MAPPING[output];
}

/**
 * Decodes part of speech value returned from the neural network.
 *
 * @param {Array<number>} output
 * @returns {string|null}
 */
export function decodeOutput(output) {
  const value = output.map((value) => Math.round(value));
  const posIndex = Object.values(POS_MAPPING).findIndex((posValue) => posValue.join("") === value.join(""));
  return Object.keys(POS_MAPPING)[posIndex] || null;
}
