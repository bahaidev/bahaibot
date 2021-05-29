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
`fs` and `getSettingsPath` implementations baked in:

```js
// If you do not want a build step, you can use this import instead:
// import buildBahaiBot from
//   './node_modules/bahaibot/dist/integratedClientServerBot.js';
import buildBahaiBot from 'bahaibot/dist/integratedClientServerBot.js';

const bahaibot = buildBahaiBot({
  // Supply implementations for:
  apiai,
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

  fetch, // Defaults to `window.fetch` for non-Node; Node auto-supplies
  // These can either be imported as global values or supplied via a direct
  //  ESM `/node_modules` import (or build step).
  i18n, // Defaults to `window.intlDom.i18n`, assuming UMD of
  //       `intl-dom` dep. used
  striptags, // Defaults to `window.striptags`, assuming UMD of `striptags`
  //       dep. used

  Discord, // A Discord implementation
  client, // A Discord.Client implementation (defaults to `new Discord.Client`)
  apiai, // apiai implementation

  fs, // The Node `fs/promises`

  // Provided `system` value of `getSettingsPath()` JSON; returns settings
  //  object `system.development` by default
  getSettings,
  getSettingsPath // The Node equivalent of:
  //                  `require('path').join(process.cwd(), 'settings.json')`
});
```

## Settings

- `dialogflowToken`
- `token`
- `disableNotMentioned` - Defaults to `false`
- `welcomeChannel` - Defaults to 'welcome'
- `awesomeEmoji` - Defaults to 'awesome'
- `helpTeam` - Defaults to `DiscordConstants.BAHAI_FYI_HELP_TEAM`
- `rulesChannel` - Defaults to `DiscordConstants.BAHAI_FYI_RULES_CHANNEL_ID`
- `PUPPET_AUTHOR` - Defaults to `DiscordConstants.USER_AB`
- `ADMIN_PERMISSION` - Defaults to `DiscordConstants.ADMIN_PERMISSION`
- `BOT_ID` - Defaults to `DiscordConstants.BAHAI_BOT_ID`
- `ADMIN_IDS` - Defaults to `DiscordConstants.ADMIN_IDS`
- `ADMIN_ROLES` - Defaults to `DiscordConstants.ADMIN_ROLES`
- `disabledCommandGroups` - Defaults to `[]`
- `enabledCommandGroups` - Defaults to `['*']`
- `embedColor` - The color border
- `embedTextLimit` - The maximum text limit
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
        id: DiscordConstants.BAHAI_FYI_IRC_BRIDGE_CHANNEL_ID,
        greetings: getLocalizedSetting('fyiCheckin-ircBridge', {
          defaultValue: greets.fyiCheckin.ircBridge
        })
      },
      {
        id: DiscordConstants.BAHAI_FYI_STUDY_HALL_CHANNEL_ID,
        bpToday: true
      }
    ]
  }
];
```

## Building one's own implemenations

See [implementation-notes.md](./docs/implementation-notes.md).

## Developing

### Commands

Bot commands are stored in the file `getCommands.js` which expects the
following structure:

```js
const commands = {
  commandKey: {

    // The regex expression you wish to examine in a text from a user
    re: /(?:regexToMatchYourCommandHere)/iu,

    // The action you wish the bot to take given satisfaction of regex
    //   condition
    action (message) {
      // Do something
    }
  }
};
```

Here's an example:

```js
const commands = {
  morning: {
    re: /\bgood morning\b/iu,
    // Good morning
    action (message) {
      message.channel.send(
        `Good morning ${message.author.username}! :coffee:`
      );
    }
  }
};
```

### A.I. Integration

### Functions

#### Hidden Words

#### Search

#### Prayers
