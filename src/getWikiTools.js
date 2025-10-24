/**
 * @typedef {number} Integer
 */
/**
 * @typedef {(text: string) => string} StripTags
 */
/**
 * @typedef {object} PageInfo
 * @property {string} url
 * @property {string} title
 * @property {string} img
 * @property {string} [snippet]
 */
/**
 * @callback BpGetTodayTool
 * @returns {Promise<string>}
 */
/**
 * @callback WikiGetRandomTool
 * @param {Integer} num
 * @param {string} host
 * @param {boolean} wikiPrefix
 * @returns {Promise<PageInfo|"">}
 */
/**
 * @callback WikiGetURLTool
 * @param {string} kw
 * @param {Integer} num
 * @param {string} host
 * @param {boolean} [wikiPrefix=false]
 * @returns {Promise<PageInfo|false|undefined>}
 */
/**
* @typedef {object} BotWikiTools
* @property {import('./commands/getAdmin.js').PuppetTool} [puppet]
* @property {BpGetTodayTool} bpGetToday
* @property {WikiGetRandomTool} wikiGetRandom
* @property {WikiGetURLTool} wikiGetURL
*/

/**
 * @param {object} cfg
 * @param {globalThis.fetch} cfg.fetch
 * @param {import('intl-dom').I18NCallback} cfg._
 * @param {StripTags} cfg.striptags
 * @returns {BotWikiTools}
 */
function getWikiTools ({
  // eslint-disable-next-line no-shadow -- Familiar
  fetch,
  striptags,
  _
}) {
  // Modules
  /**
   * @type {BotWikiTools}
   */
  return {
    /**
     * @type {BpGetTodayTool}
     */
    async bpGetToday () {
      const options = {month: 'long', day: 'numeric'};
      const date = Date.now();
      const md = new Intl.DateTimeFormat(
        _.resolvedLocale,
        // @ts-expect-error TS issue
        options
      ).format(date);
      // console.log(md);

      const url = 'https://bahaipedia.org/api.php';
      const queryParams = {
        action: 'parse',
        page: `Bahaipedia:Today_in_History/${md.toString()}`,
        prop: 'text',
        format: 'json'
      };

      const tUrl = `${url}?${new URLSearchParams({
        ...queryParams,
        origin: '*'
      })}`;

      // console.log(tUrl);

      try {
        const tResponse = await (await fetch(tUrl)).json();
        const rawText = tResponse.parse.text['*'].split('</center>\n');
        /* c8 ignore next -- Which page to use? */
        const text = striptags(rawText.length > 1 ? rawText[1] : rawText[0]);
        // console.log(text);
        // console.log(uUrl);
        return text;
      } catch (error) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error retrieving JSON for today URL', tUrl, error);
        return '';
      }
    },

    /**
     * @type {WikiGetRandomTool}
     */
    async wikiGetRandom (num, host, wikiPrefix) {
      const url = `https://${host}/api.php`;

      const queryParams = /** @type {Record<string, string>} */ ({
        action: 'query',
        indexpageids: '1',
        prop: (host === 'bahai.media') ? 'imageinfo' : '',
        // list: (host == 'bahai.media')?'':'random',
        iiprop: (host === 'bahai.media') ? 'url' : '',
        generator: 'random',
        grnnamespace: (host === 'bahai.media') ? '6' : '0',
        grnlimit: String(num),
        format: 'json'
      });

      const rUrl = `${url}?${new URLSearchParams({
        ...queryParams,
        origin: '*'
      })}`;

      // console.log(rUrl);

      try {
        const rResponse = await (await fetch(rUrl)).json();
        const titles = rResponse.query.pages[
          rResponse.query.pageids[0]
        ].title;
        // console.log(titles);

        // console.log("foo");
        // console.log(uUrl);
        return {
          title: titles,
          url: `https://${host}/${wikiPrefix ? 'wiki/' : ''}${
            encodeURIComponent(titles)}`,
          img: (host === 'bahai.media')
            ? rResponse.query.pages[
              rResponse.query.pageids[0]
            ].imageinfo[0].url
            : ''
        };
      } catch (error) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error retrieving random wiki URL', rUrl, error);
        return '';
      }
    },

    /**
     *
     * @param {string} kw
     * @param {Integer} num
     * @returns {Promise<PageInfo|false|undefined>}
     */
    /*
    bpGetRandom (kw, num) {
      const host = 'bahaipedia.org';

      return this.wikiGetURL(kw, num, host);
    },
    */

    /**
     *
     * @param {string} kw
     * @param {Integer} num
     * @returns {Promise<PageInfo|false|undefined>}
     */
    /*
    b9GetRandom (kw, num) {
      const host = 'bahai9.com';

      return this.wikiGetURL(kw, num, host, true);
    },
    */

    /**
     * @type {WikiGetURLTool}
     */
    async wikiGetURL (kw, num, host, wikiPrefix = false) {
      const url = `https://${host}/api.php`;
      const searchParams = /** @type {Record<string, string>} */ ({
        action: 'query',
        list: 'search',
        generator: 'search',
        prop: (host === 'bahai.media') ? 'imageinfo' : '',
        iiprop: (host === 'bahai.media') ? 'url' : '',
        srsearch: kw,
        srnamespace: (host === 'bahai.media') ? '6' : '0',
        srlimit: String(num),
        srprop: 'snippet',
        gsrsearch: kw,
        gsrnamespace: (host === 'bahai.media') ? '6' : '0',
        gsrlimit: String(num),
        format: 'json'
      });

      const sUrl = `${url}?${new URLSearchParams({
        ...searchParams,
        origin: '*'
      })}`;

      // console.log(sUrl);

      try {
        const sResponse = await (await fetch(sUrl)).json();

        if (sResponse.query.searchinfo.totalhits !== 0) {
          const titles = sResponse.query.search[0].title;
          // console.log(titles);
          /*
          const urlParams = {
            action: 'query',
            titles,
            prop: 'info',
            inprop: 'url',
            format: 'json'
          };
          */
          // console.log("foo");

          /*
          const uUrl = `${url}?${new URLSearchParams({
            ...urlParams,
            origin: '*'
          })}`;
          */

          // console.log(uUrl);
          return {
            title: titles,
            url: `https://${host}/${
              wikiPrefix ? 'wiki/' : ''
            }${encodeURIComponent(titles)}`,
            snippet: sResponse.query.search[0].snippet,
            img: (host === 'bahai.media')
              ? sResponse.query.pages[
                sResponse.query.search[0].pageid
              ].imageinfo[0].url
              : ''
          };
        }
        return false;
      } catch (error) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error retrieving wiki search URL', sUrl, error);
        return undefined;
      }
    }

    /**
     *
     * @param {string} kw
     * @param {Integer} num
     * @returns {Promise<PageInfo|false|undefined>}
     */
    /*
    bpGetURL (kw, num) {
      const host = 'bahaipedia.org';

      return this.wikiGetURL(kw, num, host);
    },
    */

    /**
     *
     * @param {string} kw
     * @param {Integer} num
     * @returns {Promise<PageInfo|false|undefined>}
     */
    /*
    b9GetURL (kw, num) {
      const host = 'bahai9.com';

      return this.wikiGetURL(kw, num, host, true);
    },
    */

    /**
     *
     * @param {string} url
     * @param {string} snip
     * @returns {Promise<false|undefined|PageInfo>}
     */
    /*
    async bpGetPageInfo (url, snip) {
      // console.log("bar");
      // console.log(url);
      try {
        const pResponse = await (await fetch(url)).json();
        if (pResponse) {
          const {pages} = pResponse.query;
          // console.log(pages);
          const fpk = Object.keys(pages)[0];
          const p = {
            url: pages[fpk].canonicalurl,
            title: pages[fpk].title,
            snippet: snip
          };
          // console.log(p);
          // console.log("baz");
          return p;
        }
        return false;
      } catch (error) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error retrieving Bahaipedia page info', url, error);
        return undefined;
      }
    },
    */
  };
}

export default getWikiTools;
