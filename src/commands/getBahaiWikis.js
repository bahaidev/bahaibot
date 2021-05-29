/**
 * @param {PlainObject} cfg
 * @param {BotWikiTools} cfg.wikiTools
 * @param {DiscordClient} cfg.client
 * @param {external:IntlDom} cfg._
 * @returns {BotCommand}
 */
const getBahaiWikis = function ({wikiTools, client, _}) {
  // Private methods

  /**
   * @param {DiscordMessage} message
   * @param {string} bstarString
   * @returns {Promise<void>}
   */
  const todayInHistory = async function (message, bstarString) {
    let res;
    try {
      res = await wikiTools.bpGetToday();
    // Shouldn't need catch
    /* c8 ignore next 5 */
    } catch (err) {
      // eslint-disable-next-line no-console -- CLI
      console.error('Error getting Bahaipedia Today', err);
      return;
    }
    // console.log(pi);
    if (res) {
      // eslint-disable-next-line no-console -- CLI
      console.log('Query completed.');
      const options = {month: 'long', day: 'numeric'};
      const date = Date.now();
      const md = new Intl.DateTimeFormat(
        _.resolvedLocale, options
      ).format(date);
      message.channel.send({
        content: 'Here is the result of your query.',
        embed: {
          color: 3447003,
          description: `${
            bstarString
          }}Here's Bahaipedia's Today in History entry for ${
            md
          }, ${message.author.username}:\n\n ${res}`
        }
      });
      return;
    }
    message.channel.send({
      content: 'Here is the result of your query.',
      embed: {
        color: 3447003,
        description: `${
          bstarString
        }Bahaipedia did not return any results for your query, ${
          message.author.username
        }. There may have been a network problem. If you think ` +
          `you're getting this message in error, you may want to ` +
          `try again later.`
      }
    });
  };

  /**
   * @param {DiscordMessage} message
   * @param {Integer} numResults
   * @param {string} host
   * @param {string} bstarString
   * @param {string} sitename
   * @param {boolean} wikiPrefix
   * @returns {Promise<void>}
   */
  const random = async function (
    message, numResults, host, bstarString, sitename, wikiPrefix
  ) {
    let qr;
    try {
      qr = await wikiTools.wikiGetRandom(numResults, host, wikiPrefix);
    // Shouldn't need catch
    /* c8 ignore next 5 */
    } catch (err) {
      // eslint-disable-next-line no-console -- CLI
      console.error('Error getting wiki random', err);
      return;
    }
    const res = qr && qr.title && qr;
    // console.log(pi);
    if (res) {
      // eslint-disable-next-line no-console -- CLI
      console.log('Query completed.');
      message.channel.send({
        content: 'Here is the result of your query.',
        embed: {
          color: 3447003,
          description: `${bstarString}${
            sitename
          } has returned the following random page, ${
            message.author.username
          }:\n\n **[${
            res.title
          }](${res.url})**`,
          image: {
            url: res.img !== ''
              /* c8 ignore next */
              ? res.img
              : ''
          }
        }
      });
      return;
    }
    message.channel.send({
      content: 'Here is the result of your query.',
      embed: {
        color: 3447003,
        description: `${bstarString}${
          sitename
        } did not return any results for your query, ${
          message.author.username
        }. There may have been a network problem. If you think ` +
          `you're getting this message in error, you may want to ` +
          `try again later.`
      }
    });
  };

  /**
   * @param {DiscordMessage} message
   * @param {string} kw
   * @param {Integer} numResults
   * @param {string} host
   * @param {string} bstarString
   * @param {string} sitename
   * @param {boolean} wikiPrefix
   * @returns {Promise<void>}
   */
  const search = async function (
    message, kw, numResults, host, bstarString, sitename, wikiPrefix
  ) {
    let sr;
    try {
      sr = await wikiTools.wikiGetURL(kw, numResults, host, wikiPrefix);
    // Errors should be caught internally by this method.
    /* c8 ignore next 4 */
    } catch (err) {
      // eslint-disable-next-line no-console -- CLI
      console.error('Error getting', err);
    }
    // eslint-disable-next-line no-console -- CLI
    console.log('Result:', sr);
    const res = sr?.title && sr;
    // console.log(pi);
    if (res) {
      // eslint-disable-next-line no-console -- CLI
      console.log(`Search completed: ${kw} => ${res.title}`);
      const regex = /<span class="searchmatch">|<\/span>/gui;
      const snip = res.snippet.replace(regex, '**');
      message.channel.send({
        content: 'Here is the result of your search.',
        embed: {
          color: 3447003,
          description: `${bstarString}${
            sitename
          } has returned the following page as the top result ` +
            `for your search, ${
              message.author.username
            }:\n\n **[${res.title}](${res.url})**\n\n${
              snip
            }`,
          image: {
            url: res.img !== ''
              /* c8 ignore next */
              ? res.img
              : ''
          }
        }
      });
      return;
    }
    message.channel.send({
      content: 'Here is the result of your search.',
      embed: {
        color: 3447003,
        description: `${bstarString}${
          sitename
        } did not return any results for your search, ${
          message.author.username
        }. Did you spell your search terms correctly?\n\n` +
          `There may also have been a network problem. ` +
          `If you think you're getting this message in ` +
          `error, you may want to try again later.`
      }
    });
  };

  // Bp looks up keywords on bahaipedia
  /**
   * @param {DiscordMessage} message
   * @param {PlainObject} cfg
   * @param {boolean} cfg.forceToday
   * @returns {Promise<void>}
   */
  async function bahaipediaAction (message, {forceToday} = {}) {
    const bwikiMatch = /!(?:bp|pedia|b9|bahai9|bm|media|img)/gui;
    // const flag = /-([1-5]|r|rnd|rand|t|tih|today)/gui;

    const words = message.content.split(' ');
    // const parsed = false;

    // console.log("0: " + words);

    // find the word matching the call to this function
    const bpIdx = words.findIndex((i) => i.match(bwikiMatch));

    // remove this and all previous words
    words.splice(0, bpIdx + 1);

    // console.log("1: " + words);

    const rndRgx = /-(?:r|rnd|rand)/gui;
    const tihRgx = /-(?:t|tih|today)/gui;
    const nrRgx = /-(?<nr>[1-5])/ui;

    // search
    const searchRegex = /[\w\s'‘’()-_,.]+/gui;
    const keywords = words.join(' ');
    // console.log("3: " + keywords);

    let tih = false;
    let numResults = 1;
    let rand = false;

    // which site
    let host = '';
    let sitename = '';
    let wikiPrefix = false;

    if (today.re.test(message.content)) {
      tih = true;
    } else {
      if (bp.re.test(message.content)) {
        host = 'bahaipedia.org';
        sitename = 'Bahaipedia';
      } else if (b9.re.test(message.content)) {
        host = 'bahai9.com';
        sitename = 'Bahai9';
        wikiPrefix = true;
      } else if (bm.re.test(message.content)) {
        host = 'bahai.media';
        sitename = 'Bahaimedia';
      }

      // find the rand flag
      const rndIdx = words.findIndex((i) => i.match(rndRgx));
      if (rndIdx >= 0) {
        rand = true;
        // remove this word
        words.splice(rndIdx, 1);
      } else { // rand supersedes today
        // find the today flag
        const tihIdx = words.findIndex((i) => i.match(tihRgx));
        if (tihIdx >= 0) {
          tih = true;
          // remove this word
          words.splice(tihIdx, 1);
        }
      }

      const nrIdx = words.findIndex((i) => i.match(nrRgx));
      if (nrIdx >= 0) {
        numResults = Number(words[nrIdx]);
        // remove this word
        words.splice(nrIdx, 1);
      }
    }

    // console.log("2: " + rand);

    const bstar = client.emojis.cache.find((val) => val.name === 'bstar');
    const bstarString = bstar?.toString() ? `${bstar.toString()} ` : '';
    if (bstar) {
      message.react(bstar);
    }

    // random page
    if (rand) {
      try {
        await random(
          message, numResults, host, bstarString, sitename, wikiPrefix
        );
      // Shouldn't err out.
      /* c8 ignore next 5 */
      } catch (err) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error with random wiki', err);
        return;
      }
    // today in history
    } else if (
      tih &&
      // Could remove this condition if other wikis support, but they
      //   don't currently, and we're hard-coding the URL in the tools method.
      (forceToday || host === 'bahaipedia.org')
    ) {
      try {
        await todayInHistory(message, bstarString);
      // Shouldn't err out.
      /* c8 ignore next 5 */
      } catch (err) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error with today in history', err);
        return;
      }
    } else if (searchRegex.test(keywords)) {
      try {
        await search(
          message, keywords, numResults, host,
          bstarString, sitename, wikiPrefix
        );
      // Shouldn't err out.
      /* c8 ignore next 5 */
      } catch (err) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error searching wiki', err);
        return;
      }
    }

    // eslint-disable-next-line no-console -- CLI
    console.log(`BP command issued by ${message.author.username}.`);
  }

  const today = {
    re: /!today\b/iu,
    helpInfo: {
      name: '!today',
      value: "Displays a list of events from today's date " +
          'in history, via Bahaipedia.'
    },
    /**
     * @param {DiscordMessage} message
     * @returns {Promise<void>}
     */
    async action (message) {
      return await bahaipediaAction(message, {forceToday: true});
    }
  };

  const b9 = {
    re: /!(?:b9|bahai9)\b/iu,
    /**
     * @param {DiscordMessage} message
     * @returns {void}
     */
    async action (message) {
      return await bahaipediaAction(message);
    }
  };

  const bm = {
    re: /!(?:bm|media|img)\b/iu,
    /**
     * @param {DiscordMessage} message
     * @returns {Promise<void>}
     */
    async action (message) {
      return await bahaipediaAction(message);
    }
  };

  const bp = {
    re: /!(?:bp|pedia)\b/iu,
    action: bahaipediaAction,
    // This will be reused across several commands
    helpInfo: {
      name: '!bp | !b9 | !bm [-rand | *‹keyword›*]',
      value: 'Return a link to the top result for *keyword* on ' +
          'Bahaipedia (`!bp`), Bahai9.com (`!b9`), or ' +
          'Bahai.media (`!bm`); `-rand` displays a random ' +
          'article (or file).'
    }
  };

  return {
    bp,
    today,
    b9,
    bm
  };
};

export default getBahaiWikis;
