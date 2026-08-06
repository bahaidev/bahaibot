/**
 * @file Overwrites Hidden Words files to add localized text. Requires
 *    `DB_HOST`, etc. be set under `development` of `settings.json` and running
 *    dolt server (`pnpm dolt`) in another tab.
 */

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
  // const colInfo = await db('inventory_fulltext').columnInfo();
  // console.log('colInfo', colInfo);

  // const res = await db.
  //   select('*').
  //   from('inventory_fulltext').
  //   whereILike('phelps', 'BH00113%').
  //   // whereNot({language: 'en'}).
  //   // whereLike('phelps', 'BH00386%').
  //   orderBy('phelps', 'asc');

  // console.log('res', res);

  // whereIn('language', ['ru']). // Arabic: 72, 72, 72, 72, 71, 72, 72
  // whereIn('language', ['zh-Hans']). // Persian: 82, 84, 84, 83, 83, 84, 84

  const resPersian = await db.
    select('*').
    from('writings').
    whereILike('phelps', 'BH00113%'). // Persian HW
    where('type', 'hidden_words').
    where('language', langCode).
    orderBy('phelps', 'asc');

  const persianHWPath = './library/hw_persian.json';
  const json = JSON.parse(await readFile(persianHWPath, 'utf8'));

  resPersian.forEach(({text}, idx) => {
    const {paras} = json.chapters[idx];

    const newPars = /** @type {string[]} */ (
      text.replace(/^<p>/v, '').replace(/<\/p>$/v, '').split(/<\/p>\s*<p>/v)
    );

    // These Persian Hidden Words have intros, so need to join
    //   the "O Son of..." later
    const hasIntro = [20, 37, 48].includes(idx);

    newPars.forEach((newPar, index) => {
      if (hasIntro) {
        if (index >= 1) {
          paras[0][lang] += ` ${newPar}`;
        } else {
          if (!Object.hasOwn(paras, index)) {
            paras[index] = {
              id: index + 1
            };
          }
          paras[index][lang] = newPar;
        }
        return;
      }

      if (index === 1) {
        paras[0][lang] += ` ${newPar}`;
      } else {
        const idex = index === 0
          ? index
          : index - 1;
        if (!Object.hasOwn(paras, idex)) {
          paras[idex] = {
            id: idex + 1
          };
        }
        paras[idex][lang] = newPar;
      }
    });
  });

  await writeFile(persianHWPath, `${JSON.stringify(json, null, '\t')}\n`);

  console.log('resPersian', resPersian, resPersian.length);
}

/**
 * @param {Language} lang
 * @param {string} langCode
 * @returns {Promise<void>}
 */
async function saveArabicHiddenWords (lang, langCode) {
  const resArabic = await db.
    select('*').
    from('writings').
    whereILike('phelps', 'BH00386%'). // Arabic HW
    where('type', 'hidden_words').
    where('language', langCode).
    orderBy('phelps', 'asc');


  const arabicHWPath = './library/hw_arabic.json';
  const json = JSON.parse(await readFile(arabicHWPath, 'utf8'));

  resArabic.forEach(({text}, idx) => {
    const {paras} = json.chapters[idx];

    const newPars = /** @type {string[]} */ (
      text.replace(/^<p>/v, '').replace(/<\/p>$/v, '').split(/<\/p>\s*<p>/v)
    );

    newPars.forEach((newPar, index) => {
      if (index === 1) {
        paras[0][lang] += ` ${newPar}`;
      } else {
        const idex = index === 0 ? index : index - 1;
        if (!Object.hasOwn(paras, idex)) {
          paras[idex] = {
            id: idex + 1
          };
        }
        paras[idex][lang] = newPar;
      }
    });
  });

  await writeFile(arabicHWPath, `${JSON.stringify(json, null, '\t')}\n`);

  console.log('resArabic', resArabic, resArabic.length);
}
