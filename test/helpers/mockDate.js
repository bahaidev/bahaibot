const _Date = Date;

/**
 * @todo See about replacing with `mockdate` if it exports its own `MockDate`
 * class for purposes of our overwriting `global.Date`:
 * {@link https://github.com/boblauer/MockDate/issues/46}
 * @param {object} cfg
 * @param {string} cfg.date
 * @param {string} cfg.now
 * @returns {MockDate}
 */
function mockDate ({
  date,
  now
} = {}) {
  /**
   * Mock `Date`.
   */
  class MockDate {
    /**
     * @returns {void}
     */
    static now () {
      if (typeof now === 'function') {
        return new _Date(now()).getTime();
      }
      return now ? new _Date(now).getTime() : _Date.now();
    }
    /**
     * @param {Integer} _date
     */
    constructor (_date) {
      if (typeof date === 'function') {
        this._date = new _Date(date(_date));
        return;
      }
      // When no `date` present, default to reusing any `now`
      if (_date === undefined || date === undefined) {
        this._date = new _Date(MockDate.now());
        return;
      }

      this._date = new _Date(date);
    }

    /**
     * @returns {Integer}
     */
    getTime () {
      return this._date.getTime();
    }
    /**
     * @returns {Integer}
     */
    getUTCHours () {
      return this._date.getUTCHours();
    }
    /**
     * @returns {Integer}
     */
    getUTCMinutes () {
      return this._date.getUTCMinutes();
    }
  }

  return MockDate;
}

export default mockDate;
