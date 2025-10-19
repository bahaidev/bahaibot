// We could let the user rely on the (global) defaults for these instead of
//  baking in these two modules, but they would be forced to non-modularly
//  add script tags and rely on globals.
import {i18n} from 'intl-dom';
// eslint-disable-next-line import/no-unresolved -- Bug
import {stripHtml} from 'string-strip-html';

import bot from './bot.js';

const {hash, search} = location;
const hashParams = hash.slice(1);

// GET LOCALE
const locales = [
  new URLSearchParams(hashParams).get('locales') ||
  new URLSearchParams(search).get('locales') || 'en_US'
];

// GET OTHER OPTIONS
const checkins = Boolean(new URLSearchParams(hashParams).get('checkins') ||
  new URLSearchParams(search).get('checkins'));

/**
 * @param {string} path
 * @returns {string}
 */
const getPath = (path) => {
  return `${location.href.replace(/\/$/v, '')}/${path}`;
};

// Note: These implementations are specific to our needs
const fs = /** @type {LimitedFs} */ ({
  /**
   * @param {string|URL} fileName
   * @returns {Promise<string>}
   */
  async readFile (fileName) {
    return await (await fetch(
      typeof fileName === 'object' && 'href' in fileName && fileName.href
        ? fileName.href
        : fileName
    )).text();
  },
  /**
   * @param {string} fileName
   * @param {string} data
   * @returns {void}
   */
  writeFile (fileName, data) {
    localStorage.setItem(`bahaibot-${fileName}`, String(data || Date.now()));
  },
  /**
   * @param {string} fileName
   * @returns {Promise<{mtime: Date}>}
   */
  stat (fileName) {
    return Promise.resolve({
      mtime: new Date(Number(localStorage.getItem(`bahaibot-${fileName}`)))
    });
  },
  /**
   * @param {string} fileName
   * @returns {void}
   */
  unlink (fileName) {
    localStorage.removeItem(fileName);
  }
});

/**
 * @template {object} T
 * @template {keyof T} K
 * @typedef {Omit<T, K> & Partial<Pick<T, K>>} SetOptional
 */

/**
 * @typedef {Pick<import('node:fs/promises'),
 *   'readFile'|'writeFile'|'stat'|'unlink'>} LimitedFs
 */

/**
 * This is created separately from `index.js` so as to allow testing files to
 * have Discord conveniently baked in, requiring case-by-case overrides only.
 * @param {SetOptional<import('./bot.js').BotOptions, 'getPath'|'fs'>} args
 * @returns {Promise<import('./bot.js').BotResponse>}
 */
function discordBot (args) {
  return bot({
    checkins,
    locales,
    getPath,
    fs,
    fetch,
    i18n,
    /** @type {import('./getWikiTools.js').StripTags} */
    striptags: (str) => stripHtml(str).result,
    // Todo: See about using https://github.com/mishushakov/dialogflow-web-v2
    //   to pass in as is (or with an adapter as needed) for our `dialogflow`
    //   argument, allowing the user to only neeed to pass in their own
    //   `Discord`
    ...args
  });
}

export default discordBot;
