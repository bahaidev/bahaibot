import * as fs from 'fs/promises';
import {join} from 'path';
import {expect} from 'chai';
import * as Discord from 'discord.js';
// eslint-disable-next-line no-shadow -- Familiar
import fetch from 'node-fetch';
import {i18n, setFetch} from 'intl-dom';
import fileFetch from 'file-fetch'; // For `intl-dom`
// eslint-disable-next-line import/no-unresolved -- Bug
import {stripHtml} from 'string-strip-html';

import getDialogflowAdapter from '../src/getDialogflowAdapter.js';
import bot from '../src/bot.js';

/**
* @type {import('../src/discordBot.js').GetPath}
*/
const getPath = (path) => {
  return join(process.cwd(), path);
};

// Needed by intl-dom
setFetch(fileFetch);

describe('Bot', function () {
  it('getSettings default', async function () {
    const {system, getSettings} = await bot({
      fetch,
      i18n,
      striptags: (str) => stripHtml(str).result,
      Discord,
      fs,
      getPath,
      // @ts-expect-error Just a mock
      dialogflow: getDialogflowAdapter({
        // @ts-expect-error Just a mock
        doAIProcessing () {
          //
        }
      })
    });

    const settings = getSettings?.(
      /** @type {import('../src/discordBot.js').SettingsFile} */ (system)
    );
    expect(settings).to.have.property('token');
  });
});
