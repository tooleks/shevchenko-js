import * as stringUtil from '../util/stringUtil';
import {POS_MAPPING, NETWORK_LAYER_SIZE_INPUT} from './config';

/**
 * Determine if provided value is a valid part of speech value.
 *
 * @param {string} value
 * @return {boolean}
 */
export function isValidPos(value) {
  return Object.keys(POS_MAPPING).includes(value);
}

/**
 * Encode word value for usage in the neural network.
 *
 * @param {string} input
 * @return {Array<string>}
 */
export function encodeInput(input) {
  return stringUtil
    .toBinary(input)
    .padStart(NETWORK_LAYER_SIZE_INPUT, '0')
    .split('');
}

/**
 * Encode part of speech value for usage in the neural network.
 *
 * @param {string} output
 * @return {Array<number>|undefined}
 */
export function encodeOutput(output) {
  return POS_MAPPING[output];
}

/**
 * Decode part of speech value returned from the neural network.
 *
 * @param {Array<number>} output
 * @return {string|null}
 */
export function decodeOutput(output) {
  const value = output.map((value) => Math.round(value));
  const posIndex = Object.values(POS_MAPPING).findIndex((posValue) => posValue.join('') === value.join(''));
  return Object.keys(POS_MAPPING)[posIndex] || null;
}
