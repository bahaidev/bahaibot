# Bahá'í Bot

[![npm](https://img.shields.io/npm/v/bahaibot.svg)](https://www.npmjs.com/package/bahaibot)

The Bahá'í Bot has default support for the chat server,
[Discord](https://discord.com/), but it could be applied for other
applications, including even client-side browser-based apps.

## Installation

```shell
npm i bahaibot
```

You can add the "9star" and "Bstar" emojis to your server to have them used
by the Bot. (If you can contribute open source versions of the "awesome" emoji
or our Persian new year "sabzi", we'd welcome a PR!.)

Otherwise, they will be silently ignored.

## CLI Usage

You can add this command to one of your `scripts` in `package.json`:

`bahaibot`

### CLI flags

- `--checkins` - Boolean on whether to perform automated checkins
- `--locales` - (Currently `en-US` only, the default)

## Importing

For Discord usage:

```js
import 'bahaibot';
```

or:

```js
import buildBahaiBot from 'bahaibot/discordBot';

const bahaibot = buildBahaiBot({
  // ... Override default arguments
});
```

For non-Discord usage:

```js
import buildBahaiBot from 'bahaibot/bot';

const bahaibot = buildBahaiBot({
  // ... Supply browser values
});
```

Note that for non-Discord usage, you must supply your own implementations to
the API (see the API below).

For the rarer use case that one wishes an integrated client-server environment
which runs in a browser context like an add-on or a web app where there is only
one (trusted) user, you can use the `integratedClientServerBot` which has
`fs` and `getPath` implementations baked in:

```js
// If you do not want a build step, you can use this import instead:
// import buildBahaiBot from
//   './node_modules/bahaibot/dist/integratedClientServerBot.js';
import buildBahaiBot from 'bahaibot/dist/integratedClientServerBot.js';

const bahaibot = buildBahaiBot({
  // Supply implementations for:
  dialogflow,
  Discord
});
```

Note that this "browser" usage is not for a typical client-server
architecture, but rather for more of a self-contained browser add-on or
web app which used HTML/JavaScript technologies but was not necessarily
interactive or managing privileges between different users on a server.
The HTTP middleware which could facilitate such a bot might be added in
the future.

## API

```js
buildBahaiBot({
  // Boolean whether to run checkin code
  checkins,
  // Defaults to `['en-US']` in Node and otherwise, defaults to checking
  //  `navigator.languages` for any matches with the app's locales, adding
  //  `en-US` if none are found.
  locales,

  // THESE ARE REQUIRED FOR NON-NODE IMPLEMENTATIONS (Node will auto-supply
  //  all of the following)

  fetch, // Defaults to `globalThis.fetch` for non-Node; Node auto-supplies
  // These can either be imported as global values or supplied via a direct
  //  ESM `/node_modules` import (or build step).
  i18n, // Defaults to `globalThis.intlDom.i18n`, assuming UMD of
  //       `intl-dom` dep. used
  striptags, // Defaults to `globalThis.striptags`, assuming UMD of `striptags`
  //       exists

  Discord, // A Discord implementation
  client, // A Discord.Client implementation (defaults to `new Discord.Client`)
  dialogflow, // dialogflow implementation

  fs, // The Node `fs/promises`

  // Provided `system` value of `getPath('settings.json')` JSON; returns
  //  settings object `system.development` by default, though in Node,
  //  allowing for a `--production` flag to trigger getting `system.production`
  //  instead.
  getSettings,
  getPath // The Node equivalent of:
  //           `require('path').join(process.cwd(), path)`
  //            May be passed `settings.json` or `PROJECT_JSON` within
  //            `settings.json`

});
```

## Settings

- `token` - Get this string from your Bot page on the Discord Developer Dashboard;
    be sure not to publish it
- `disableNotMentioned` - Defaults to `false`
- `welcomeChannel` - Defaults to 'welcome'
- `awesomeEmoji` - Defaults to 'awesome'
- `helpTeam` - Defaults to `DiscordConstants.BAHAI_FYI_HELP_TEAM`
- `rulesChannel` - Defaults to `DiscordConstants.BAHAI_FYI_RULES_CHANNEL_ID`
- `PUPPET_AUTHOR` - Defaults to `DiscordConstants.USER_AB`
- `ADMIN_PERMISSION` - Defaults to `DiscordConstants.ADMIN_PERMISSION`
- `ADMIN_IDS` - Defaults to `DiscordConstants.ADMIN_IDS`
- `ADMIN_ROLES` - Defaults to `DiscordConstants.ADMIN_ROLES`
- `disabledCommandGroups` - Defaults to `[]`
- `enabledCommandGroups` - Defaults to `['*']`
- `embedColor` - The color border
- `embedTextLimit` - The maximum text limit
- `PROJECT_ID` - dialogflow service account key (see https://cloud.google.com/dialogflow/es/docs/quick/setup#sa-create)
- `PROJECT_JSON` - dialogflow service account key json file (see https://cloud.google.com/dialogflow/es/docs/quick/setup#sa-create)
- `bstarEmoji` - Defaults to 'bstar'
- `checkinGuilds` = Defaults to:

```js
checkinGuilds = [
  {
    guildID: DiscordConstants.BAHAI_LAB_GUILD_ID,
    guildName: getLocalizedSetting('labServerName'),
    guildChannels: [
      {
        id: DiscordConstants.BAHAI_LAB_BOT_TESTING_CHANNEL_ID,
        greetings: getLocalizedSetting('debugCheckin', {
          defaultValue: greets.debugCheckin
        }),
        reportUptime: true
      }
    ]
  },
  {
    guildID: DiscordConstants.BAHAI_FYI_GUILD_ID,
    guildName: getLocalizedSetting('serverName'),
    guildChannels: [
      {
        id: DiscordConstants.BAHAI_FYI_GENERAL_CHANNEL_ID,
        greetings: getLocalizedSetting('fyiCheckin-general', {
          defaultValue: greets.fyiCheckin.general
        })
      },
      {
        id: DiscordConstants.BAHAI_FYI_STUDY_HALL_CHANNEL_ID,
        bpToday: true
      }
    ]
  },
  {
    guildID: DiscordConstants.BAHAI_WIKIS_GUILD_ID,
    guildName: "Bahá'í Wikis",
    guildChannels: [
      {
        id: DiscordConstants.BAHAI_WIKIS_GENERAL_CHANNEL_ID,
        greetings: getLocalizedSetting('bahaiWikisCheckin-general', {
          defaultValue: greets.fyiCheckin.general
        })
      }
    ]
  }
];
```

## Building one's own implemenations

See [implementation-notes.md](./implementation-notes.md).

### A.I. Integration

### Functions

#### Hidden Words

#### Search

#### Prayers

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## To-dos

1. Waiting: Update to discord 15 when comes out

1. See about establishing maintenance of bot on own server

1. See about any refactoring needed to allow to work with bahai-matrix-bot and
    easier for website; make website version support opening URLs on behalf
    of user for full context of the Writings and support speech synthesis

1. Go through in-code to-dos
    1. complete i18nizing messages

1. Augment Dialogflow fallbacks with Bahaipedia search: A new intent called
   "General knowledge" has been created in Dialogflow. When the bot gets
   results back from Dialogflow, it should check to see if this intent has
   been matched: (i.e. `["queryResult"]["intent"]["displayName"] ==
   "General knowledge"`). If it has, it should follow up its own response
   with a Bahaipedia search for the given phrase. Ex.: A user message reading
   "Who was Robert Turner" would trigger the general knowledge intent and
   follow up with the same results as `/bp Robert Turner`.

1. Other to-dos per @dragfyre
    1.  `/read` defaults to return a link to a page from a book, OR displays
        the Hidden Word in an embed if the Hidden Words are chosen; search
        individual books, possibly by `/page` or `/para` or some sort of
        BibleBot thing that searches for formatted references
    1. `/library` returns a search link to the Baha'i Reference Library
        (i.e. bahai.org)
    1. `/blo` returns a search link to Baha'i Library Online
    1. `/rand` and `/randcat` take wikis as input and return a random page;
        `/randcat` also takes a category name - not sure whether we should
        remove the `-rand` flag from `/bp`, `/bw`, `/bm`, `/b9`
    1. `/help` - just update to show slash commands
