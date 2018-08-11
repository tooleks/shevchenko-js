/**
 * An array of inflection rules.
 *
 * @type {Array}
 */
const INFLECTION_RULES = process.env.INFLECTION_RULES;

/**
 * A neural network structure for female last names with endings "-a", "-я".
 *
 * @type {Readonly}
 */
const POS_NN_A_YA_STRUCTURE = Object.freeze(process.env.POS_NN_A_YA_STRUCTURE);

/**
 * A neural network cache for female last names with endings "-a", "-я".
 *
 * @type {object}
 */
const POS_NN_A_YA_CACHE = process.env.POS_NN_A_YA_CACHE;

/**
 * A neural network structure for male last names with endings "-ой", "-ий", "-ій".
 *
 * @type {Readonly}
 */
const POS_NN_OI_YI_II_STRUCTURE = Object.freeze(process.env.POS_NN_OI_YI_II_STRUCTURE);

/**
 * A neural network cache for male last names with endings "-ой", "-ий", "-ій".
 *
 * @type {object}
 */
const POS_NN_OI_YI_II_CACHE = process.env.POS_NN_OI_YI_II_CACHE;

/**
 * A neural network structure for male last names with endings "-их".
 *
 * @type {Readonly}
 */
const POS_NN_YH_STRUCTURE = Object.freeze(process.env.POS_NN_YH_STRUCTURE);

/**
 * A neural network cache for male last names with endings "-их".
 *
 * @type {object}
 */
const POS_NN_YH_CACHE = process.env.POS_NN_YH_CACHE;

export {
    INFLECTION_RULES,
    POS_NN_A_YA_STRUCTURE,
    POS_NN_A_YA_CACHE,
    POS_NN_OI_YI_II_STRUCTURE,
    POS_NN_OI_YI_II_CACHE,
    POS_NN_YH_STRUCTURE,
    POS_NN_YH_CACHE,
};
