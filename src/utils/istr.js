/**
 * Given time in seconds, creates pretty output in days, hours,
 *   minutes, and seconds.
 * @todo See about replacing with
 *   {@link https://github.com/tc39/proposal-intl-duration-format|Intl.DurationFormat}
 *   once it may be standardized and/or better polyfilled.
 * This should also be i18nized but should be able to get that easier by
 *   replacing with `Intl.DurationFormat` when available.
 * @param {Float} seconds
 * @returns {string}
 */
function istr (seconds) {
  let sec = seconds;
  const cid = Math.floor(sec / 86400);
  sec %= 86400;
  const cih = Math.floor(sec / 3600);
  sec %= 3600;
  const cim = Math.floor(sec / 60);
  const cis = Math.floor(sec % 60);

  let timestr = '';
  if (Math.floor(seconds) === 0) {
    timestr = '0s';
  } else {
    const noDays = cid === 0;
    const noHours = cih === 0;
    const noMinutes = cim === 0;
    const noSeconds = cis === 0;

    timestr += noDays ? '' : `${cid}d`;
    timestr += (noDays || (noHours && noMinutes && noSeconds)) ? '' : ', ';
    timestr += noHours ? '' : `${cih}h`;
    timestr += (
      noHours || (noMinutes && noSeconds)
    )
      ? ''
      : ', ';
    timestr += noMinutes ? '' : `${cim}m`;
    timestr += (noMinutes || noSeconds) ? '' : ', ';
    timestr += noSeconds ? '' : `${cis}s`;
  }
  return timestr;
}

export default istr;
