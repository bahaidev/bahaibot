// eslint-disable-next-line max-len -- Long
/* eslint-env browser -- Though not a standard browser-server app, this runs in a browser context */

// We could let the user rely on the (global) defaults for these instead of
//  baking in these two modules, but they would be forced to non-modularly
//  add script tags and rely on globals.
import {i18n} from 'intl-dom';
import striptags from 'striptags';

import bot from './bot.js';

const {hash, search} = location;
const hashParams = hash.slice(1);

// GET LOCALE
const locales = [
  new URLSearchParams(hashParams).get('locales') ||
  new URLSearchParams(search).get('locales')
];

// GET OTHER OPTIONS
const checkins = new URLSearchParams(hashParams).get('checkins') ||
  new URLSearchParams(search).get('checkins');

/**
 * @returns {string}
 */
const getSettingsPath = () => {
  return `${location.href.replace(/\/$/u, '')}/settings.json`;
};

// Note: These implementations are specific to our needs
const fs = {
  /**
   * @param {string} fileName
   * @returns {Promise<string>}
   */
  async readFile (fileName) {
    return await (await fetch(fileName?.href ?? fileName)).text();
  },
  /**
   * @param {string} fileName
   * @param {string} data
   * @returns {void}
   */
  writeFile (fileName, data) {
    localStorage.setItem(`bahaibot-${fileName}`, data || Date.now());
  },
  /**
   * @param {string} fileName
   * @returns {string}
   */
  stat (fileName) {
    return localStorage.getItem(`bahaibot-${fileName}`);
  },
  /**
   * @param {string} fileName
   * @returns {void}
   */
  unlink (fileName) {
    localStorage.removeItem(fileName);
  }
};

/**
 * This is created separately from `index.js` so as to allow testing files to
 * have Discord conveniently baked in, requiring case-by-case overrides only.
 * @param {BotOptions} args
 * @returns {Promise<void>}
 */
function discordBot (args) {
  return bot({
    checkins,
    locales,
    getSettingsPath,
    fs,
    fetch,
    i18n,
    striptags,
    // Todo: See about using https://github.com/mishushakov/dialogflow-web-v2
    //   to pass in as is (or with an adapter as needed) for our `apiai`
    //   argument, allowing the user to only neeed to pass in their own
    //   `Discord`
    ...args
  });
}

export default discordBot;
