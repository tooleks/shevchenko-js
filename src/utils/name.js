"use string";

/**
 * Create a new compound name with the results of calling a provided function on every part in the compound name.
 *
 * For example, the compound last name "Нечуй-Левицький" includes two parts "Нечуй" and "Левицький" divided by a delimiter "-".
 *
 * @param {string} name
 * @param {function} callback
 * @param {string} delimiter
 * @return {string}
 */
function mapNameParts(name, callback, delimiter = "-") {
    const parts = name.split(delimiter);
    return parts.map((part, index) => callback(part, index, parts.length)).join(delimiter);
}

module.exports = {mapNameParts};
