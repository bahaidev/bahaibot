/**
 * @typedef {number} Float
 */
/**
 * Given time in seconds, creates pretty output in days, hours,
 *   minutes, and seconds.
 * @param {string} locale
 * @param {Float} secs
 * @returns {string}
 */
function istr (locale, secs) {
  if (secs === 0) {
    return '0s';
  }

  let sec = secs;
  const days = Math.floor(sec / 86400);
  sec %= 86400;
  const hours = Math.floor(sec / 3600);
  sec %= 3600;
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);

  // Could extend to write for the following as well:
  // years
  // months
  // weeks
  // milliseconds
  // microseconds
  // nanoseconds

  const format = {
    days,
    hours,
    minutes,
    seconds
  };

  return new Intl.DurationFormat(locale, {
    style: 'narrow'
  }).formatToParts(format).map(({type, value, unit}) => {
    // We use `formatToParts` as we otherwise don't get the comma we want
    if (type === 'literal' && value === ' ') {
      return {
        type,
        value: ', '
      };
    }
    return {type, value, unit};
  }).reduce((str, {value}) => {
    return str + value;
  }, '');
}

export default istr;
