/**
 * Number of nodes for input layer.
 *
 * @type {number}
 */
export const NETWORK_LAYER_SIZE_INPUT = 360;

/**
 * Number of nodes for hidden layer.
 *
 * @type {number}
 */
export const NETWORK_LAYER_SIZE_HIDDEN = 20;

/**
 * Number of nodes for output layer.
 *
 * @type {number}
 */
export const NETWORK_LAYER_SIZE_OUTPUT = 1;

/**
 * Preconfigured mapping for parts of speech.
 *
 * @type {Readonly}
 */
export const POS_MAPPING = Object.freeze({
    noun: [0],
    adjective: [1],
});
