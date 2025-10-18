## Building one's own implemenations

To fully repeat the functionality of the Discord and dialogflow content, a lot of
methods need to be polyfilled.

However, some implementations might not be concerned with chat-type
functionality, and one can see below which components require a certain API.
If not needed by the core, an implementation might choose to avoid support
for parts of the API.

### Building one's own `dialogflow` implementation

If supplying one's own dialogflow implementation, it should use, or follow
the structure modeled in `src/getDialogflowAdapter.js`.

(It will be called in the default command and its responses passed to the
router.)

```js
// 1. Use the `dialogflow` wrapper with your own `doAIProcessing`.
import getDialogflowAdapter from 'bahaibot/getDialogflowAdapter';

// This is the default, so you can omit this
const projectAgentSessionPath = (projectID, sessionID) => {
  // This can be shaped differently
  return `${projectID}--${sessionID}`;
};

const dialogflow = getDialogflowAdapter({
  // You must supply this yourself
  doAIProcessing,
  projectAgentSessionPath
});

// Pass on `dialogflow` to `bot.js` or `discordBot.js`
await bot({
  dialogflow
  // ...other arguments
});
```

The items that will be passed to your `doAIProcessing` will be as follows:

```js
// 1. Will first have `SessionsClient` property instantiated
const keyFilename = getPath(settings.PROJECT_JSON);

// eslint-disable-next-line new-cap -- API
const app = dialogflow.SessionsClient({
  keyFilename
});

// 2. Later as commands arrive, will be sent user input and the options which
//   include the current message's author ID (from your Discord mock API)
const userInput = 'What is God?';

// 3. `projectAgentSessionPath` method will be called to create a `sessionId`,
//   using `PROJECT_ID` in the `settings.json` file

const sessionId = app.projectAgentSessionPath(
  settings.PROJECT_ID,
  message.author.id
);

// 4. `detectIntent` method will be called with a request, using the
//      `sessionPath` and `userInput` (as well as the current locale). Its
//        response will be passed to the Bot's router for processing.
const fulfillmentText = await doAIProcessing({
  userInput,
  sessionId,
  keyFilename,
  languageCode // Locale
});
```

### Building one's own `discordTTS` implementation

Needs a `getVoiceStream` method which accepts the words as a string and returns
a stream (passed to `broadcast.play()` (see below)). Needed only for the
admin `speak` command.

### Building one's own `discord.js` implementation

Note that when an object is listed, only the properties/methods enumerated
are required for support, and even then, only if using one of the commands
mentioned in the "Required by" column.

| Parent API object    | Property, Method, or Child Class | Notes | Required by |
|-------------------|-----------------|-------|-------------|
| `Discord` | - | Tracks part of `Discord.js` main object | (See methods)
| `Discord` | `.Client()` | Creates an object; see also `client` | (Called in main bot code if `client` not supplied)
| `Discord` | `.MessageEmbed()` | Creates an object and passed to `message.channel.send` | Bahá'í Info, Bahá'í Writings (`readBook` and `readRandom` commands)
| `MessageEmbed()` | `.setAuthor(text, avatarURL)` | | Bahá'í Info, Bahá'í Writings (`readBook` and `readRandom` commands)
| `MessageEmbed()` | `.setDescription(text)` | | Bahá'í Info, Bahá'í Writings (`readBook` and `readRandom` commands)
| `MessageEmbed()` | `.addField('Support Server', markdownLink)` or `addField('Notes', text)` | | Bahá'í Info, Bahá'í Writings (`readBook` and `readRandom` commands)
| `MessageEmbed()` | `.setColor(numberForColorBorder)` | | Bahá'í Writings (`readBook` and `readRandom` commands)
| `client` | - | Tracks part of `Discord.Client`; if no `client` is supplied, then requires `Discord.Client` (to create the `client`) | (See methods and properties)
| `client` | `.on(event, listener)` | | (Called in main bot code)
| `client` | `.user` | Passed to `message.mentions.has()` | (Obtained in main bot code within "message" event)
| `client.user` | `.avatarURL()` | | "Bahá'í Writings" (`readBook` and `readRandom` commands)
| `client.user` | `.setPresence({activity: {name: '@BahaiBot !help', type: 'PLAYING'}})` | | (Accessed in main bot code (within "ready" event))
| `client` | `.emojis.cache.find(({name}) => {return bool;})` | | (Called in main bot code (within "guildMemberAdd" event or if `checkins` flag passed)); also in Bahá'í Info (`badi` command), Bahá'í Salutations (`abha`, `nawruz`, and `ridvan` commands), Bahá'í Wikis (`today`, `b9`, `bm`, `bp` commands), Admin (`checkin` command); see also `emoji.toString()`
| `client` | `.guilds.cache.get(guildID)` | Returns a guild object | (Called in main bot code if `checkins` flag passed); also in Admin (`checkin` command); see also `guild` for the returned object)
| `client` | `.channels.cache.get(channelId)` | | Admin (`speak` command); see also `channel.join()`
| `client` | `.voice.createBroadcast()` | Passed to `connection.play()` | Admin (`speak` command); see also `broadcast`
| `client` | `.login(token)` | | (Called in main bot code after listeners)
| `client.on(event, listener)` | `'ready'` event | | (Called in main bot code)
| `client.on(event, listener)` | `'guildMemberAdd'` event | | (Called in main bot code); see also `guildMemberAddEvent`
| `client.on(event, listener)` | `'message'` event | | (Called in main bot code; see also `message`)
| `guildMemberAddEvent` | `guild.channels.cache.find({name})` | Uses `channel.send(string)` | (Called in main bot code)
| `guildMemberAddEvent` | `guild.channels.cache.get(rulesChannel).toString()` | Uses `channel.send(string)` | (Called in main bot code)
| `guildMemberAddEvent` | `user.id` | String | (Called in main bot code)
| `message`| | Tracks a subset of `Discord.Message`; may be a string or an object | See table below and "Building one's own `dialogflow` implementation" section
| `guild` | `.channels.cache.get(guildChannelID)` | Returns a channel object | (Called in main bot code if `checkins` flag passed; also in Admin (`checkin` command); see also `channel` for the returned object)
| `broadcast` | `play` | Will be passed `discordTTS.getVoiceStream(words)` | Admin (`speak` command)
| `channel` | `.name` | A string | (Accessed in main bot code if `checkins` flag passed); also in Admin (`checkin` command))
| `channel` | `.send(string)` | See also the object signature | (Called in main bot code if `checkins` flag passed); also in Admin (`checkin` command))
| `channel` | `.send(object)` | Object has two properties: `content` string, and `embed` subobject (with `color` number and `description` string) | (Called in main bot code if `checkins` flag passed); also in Admin (`checkin` command))
| `channel` | `.join()` | Resolves to `connection` | Admin (`speak` command)
| `connection` | `.play()` | Returns a `dispatcher` | Admin (`speak` command)
| `dispatcher` | `on()` | "error", "debug", and "start" events with an error object to the first two | Admin (`speak` command)
| `emoji` | `.toString()` | | (Called in main bot code (within "guildMemberAdd" event or if `checkins` flag passed)); also in Bahá'í Info (`badi` command), Bahá'í Salutations (`abha`, `nawruz`, and `ridvan` commands), Bahá'í Wikis (`today`, `b9`, `bm`, `bp` commands), Admin (`checkin` command)

| `message` Property, Method, or Child Class | Notes | Required by |
|--------------------------------------------|-------|-------------|
| `content` | String | Accessed by default command, Bahá'í Writings (`readBook` command), Admin (`speak`, `echo`, `puppet` commands); Social Info (`seen` command); Bahá'í Wikis (`bp`, `today`, `b9`, `bm` commands)
| `author.id` | String | Accessed by default command; Admin (`speak`, `puppet`, `echo`, `checkin` command)
| `author.username` | String | Accessed by Help (`help` command), Bahá'í Writings (`showList` command); Admin (`puppet`, `echo`, and `checkin` commands); Bahá'í Salutations (`abha` command); Salutations (`sup`, `morning`, `afternoon`, `evening`, `hello`, `welcome` commands); Social Info (`users` and `seen` commands); Bahá'í Wikis (`bp`, `today`, `b9`, `bm` commands)
| `channel.send(string)` | See also the object signature | Called by default command (and possibly in dialogflow router); Bahá'í Writings (`readBook` and default `reader` fallback commands); Admin (`echo`, `puppet` command); Bahá'í Info (`badi` command); Bahá'í Salutations (`abha`, `nawruz`, and `ridvan` commands); Salutations (`sup`, `morning`, `afternoon`, `evening`, `hello`, `welcome` commands); Light-hearted (`coffee`, `tea`, `unladen`, `bruh`, `goodbot`, `badbot`, `repeating`, `santacat`, `ping` commands); Social Info (`users` and `seen` commands)
| `channel.send(object)` | Like the `channel.send` above | Bahá'í Writings (`readBook` and `readRandom` commands); possibly in dialogflow router (via default command)
| `channel.send(object)` | Like the `channel.send` above though also has `fields` on `embed` which is an array of `{name: string, value: string}` objects (the command and help text for it) | Help (`help` command), Bahá'í Writings (`showList` command); Bahá'í Info (`info` command)
| `channel.send(object)` | Like the `channel.send` above though also has `image: {url: string}` on `embed` | Bahá'í Wikis (`bp`, `today`, `b9`, `bm` commands)
| `guild.members.cache.filter({presence: {status}, roles: {cache: {some}}})` | `some` will check against a role `name` property | Social Info (`users` and `seen` commands)
| `guild.channels.cache.find({name})` | Checks against channel name | Admin (`puppet` command)
| `member.permissions.has(permissions.permission)` | | Admin (`puppet`) though not currently enabled
| `member.voice.channelID` | | Admin (`speak` command)
| `mentions.has(user)` | Passed a user object | (Called in main bot code (within "message" event))
| `mentions.members.first()` | Truthy result; called within `notMentioned` only | Bahá'í Salutations (`abha` command); Salutations (`welcome` command `notMentioned` check)
| `react` | | Bahá'í Salutations (`abha`, `nawruz`, and `ridvan` commands); Salutations (`welcome` command `notMentioned` check); Light-hearted (`goodbot`, `badbot` commands; `tea` and `coffee` `notMentioned` commands); Bahá'í Wikis (`bp`, `today`, `b9`, `bm` commands)
