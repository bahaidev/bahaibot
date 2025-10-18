/**
 * @param {JSON} json
 * @returns {JSON}
 */
function jsonClone (json) {
  // eslint-disable-next-line @stylistic/max-len -- Long
  // eslint-disable-next-line unicorn/prefer-structured-clone -- May be needed as is
  return JSON.parse(JSON.stringify(json));
}

export default jsonClone;
