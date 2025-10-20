const _Date = Date;

/**
 * @todo See about replacing with `mockdate` if it exports its own `MockDate`
 * class for purposes of our overwriting `global.Date`:
 * {@link https://github.com/boblauer/MockDate/issues/46}
 * @param {object} [cfg]
 * @param {string|((num: number|undefined) => string|number|Date)} [cfg.date]
 * @param {string|number|Date|(() => string|number|Date)} [cfg.now]
 * @returns {{new (): MockDate}}
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
     * @returns {number}
     */
    static now () {
      if (typeof now === 'function') {
        return new _Date(now()).getTime();
      }
      return now ? new _Date(now).getTime() : _Date.now();
    }
    /**
     * @param {import('../../src/getWikiTools.js').Integer} [_date]
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
     * @returns {import('../../src/getWikiTools.js').Integer}
     */
    getTime () {
      return this._date.getTime();
    }
    /**
     * @returns {import('../../src/getWikiTools.js').Integer}
     */
    getUTCHours () {
      return this._date.getUTCHours();
    }
    /**
     * @returns {import('../../src/getWikiTools.js').Integer}
     */
    getUTCMinutes () {
      return this._date.getUTCMinutes();
    }
  }

  return MockDate;
}

export default mockDate;
