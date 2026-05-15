/* eslint-disable no-console -- Debugging */
import {readFile, writeFile} from 'node:fs/promises';

import {db} from './knex.js';
import {langCodes, langs} from './langs.js';

/**
 * @import {Language} from '../src/commands/getQuoteReader.js';
 */

await saveHiddenWords();

/**
 * @returns {Promise<void>}
 */
async function saveHiddenWords () {
  for (const [idx, lang] of langs.entries()) {
    // eslint-disable-next-line no-await-in-loop -- Sequential
    await savePersianHiddenWords(lang, langCodes[idx]);
    // eslint-disable-next-line no-await-in-loop -- Sequential
    await saveArabicHiddenWords(lang, langCodes[idx]);
  }
}

/**
 * @param {Language} lang
 * @param {string} langCode
 * @returns {Promise<void>}
 */
async function savePersianHiddenWords (lang, langCode) {
  const resPersian = await db.
    select('*').
    from('i18n').
    where('key', 'writings/hidden-words/BH00113').
    where('language', langCode);

  const {title} = resPersian[0].value;

  const persianHWPath = './library/hw_persian.json';
  const json = JSON.parse(await readFile(persianHWPath, 'utf8'));

  json.title[lang] = title;

  await writeFile(persianHWPath, `${JSON.stringify(json, null, '\t')}\n`);

  console.log('title', lang, title);
}

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

  const arabicHWPath = './library/hw_arabic.json';
  const json = JSON.parse(await readFile(arabicHWPath, 'utf8'));

  json.title[lang] = title;

  await writeFile(arabicHWPath, `${JSON.stringify(json, null, '\t')}\n`);

  console.log('title', lang, title);
}
