import * as fs from 'fs/promises';
import {join} from 'path';

import Discord from 'discord.js';
import fetch from 'node-fetch';
import {i18n, setFetch} from 'intl-dom';
import fileFetch from 'file-fetch'; // For `intl-dom`
import striptags from 'striptags';

import getDialogflowAdapter from '../src/getDialogflowAdapter.js';
import bot from '../src/bot.js';

/**
* @type {GetPath}
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
      striptags,
      Discord,
      fs,
      getPath,
      dialogflow: getDialogflowAdapter({
        doAIProcessing () {
          //
        }
      })
    });

    const settings = getSettings(system);
    expect(settings).to.have.property('token');
  });
});
