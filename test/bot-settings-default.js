import * as fs from 'fs/promises';
import {join} from 'path';

import Discord from 'discord.js';
import fetch from 'node-fetch';
import {i18n, setFetch} from 'intl-dom';
import fileFetch from 'file-fetch'; // For `intl-dom`
import striptags from 'striptags';
import apiai from 'apiai';

import bot from '../src/bot.js';

/**
* @type {GetSettingsPath}
*/
const getSettingsPath = () => {
  return join(process.cwd(), 'settings.json');
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
      getSettingsPath,
      apiai
    });

    const settings = getSettings(system);
    expect(settings).to.have.property('token');
  });
});
