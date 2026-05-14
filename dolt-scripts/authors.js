/* eslint-disable no-console -- Debugging */
import {readFile, writeFile} from 'node:fs/promises';

import {db} from './knex.js';
import {langCodes, langs} from './langs.js';

/**
 * @import {Language} from '../src/commands/getQuoteReader.js';
 */

await save();

/**
 * @returns {Promise<void>}
 */
async function save () {
  for (const [idx, lang] of langs.entries()) {
    // eslint-disable-next-line no-await-in-loop -- Sequential
    await saveAuthors(lang, langCodes[idx]);
  }
}

/**
 * @param {Language} lang
 * @param {string} langCode
 * @returns {Promise<void>}
 */
async function saveAuthors (lang, langCode) {
  const authorInfo = await db.
    select('*').
    from('i18n').
    where('key', 'author/BH').
    where('language', langCode);

  const {name} = authorInfo[0]
    ? authorInfo[0].value
    : {name: "Bahá'u'lláh"}; // Default to English

  const authorsPath = './library/authors.json';
  const json = JSON.parse(await readFile(authorsPath, 'utf8'));

  json.BH[lang] = name;

  await writeFile(authorsPath, `${JSON.stringify(json, null, '\t')}\n`);

  console.log('name', lang, langCode, name);
}
