/* eslint-disable no-console -- Debugging */
// import {readFile, writeFile} from 'node:fs/promises';

import {db} from './knex.js';
import {langCodes, langs} from './langs.js';

/**
 * @import {Language} from '../src/commands/getQuoteReader.js';
 */

/**
 * @param {Language} lang
 * @param {string} langCode
 * @returns {Promise<void>}
 */
async function saveArabicHiddenWords (lang, langCode) {
  const resArabic = await db.
    select('*').
    from('i18n').
    where('key', 'writings/hidden-words/BH00386').
    where('language', langCode);

  const {title} = resArabic[0].value;

  // Todo: Incomplete
  console.log('title', title);
}

await saveHiddenWords();

/**
 * @returns {Promise<void>}
 */
async function saveHiddenWords () {
  for (const [idx, lang] of langs.entries()) {
    // eslint-disable-next-line no-await-in-loop -- Sequential
    await saveArabicHiddenWords(lang, langCodes[idx]);
  }
}


// where('key', 'writings/hidden-words/BH00113').
