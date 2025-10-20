/* eslint-disable jsdoc/reject-any-type -- Needed */
/**
 * @typedef {any} AnyValue
 */
/* eslint-enable jsdoc/reject-any-type -- Needed */

/**
 * @typedef {string | number | boolean | null} JSONPrimitive
 */
/**
 * @typedef {JSONValue[]} JSONArray
 */
/**
 * @typedef {JSONPrimitive |
 *   { [key: string]: JSONValue } | JSONArray} JSONValue
 */

/**
 * @param {AnyValue} json
 * @returns {JSONValue}
 */
function jsonClone (json) {
  // eslint-disable-next-line @stylistic/max-len -- Long
  // eslint-disable-next-line unicorn/prefer-structured-clone -- May be needed as is
  return JSON.parse(JSON.stringify(json));
}

export default jsonClone;
