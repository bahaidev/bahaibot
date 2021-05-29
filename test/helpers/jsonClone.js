/**
 * @param {JSON} json
 * @returns {JSON}
 */
function jsonClone (json) {
  return JSON.parse(JSON.stringify(json));
}

export default jsonClone;
