# Contributing

1. Clone the repository
2. Run `npm i -g pnpm` (to get `pnpm` installed and to ensure it is the latest one)
3. Run `pnpm i` to install all `devDependencies` as well as `dependencies`.

## Commands

Bot commands are stored in the file `getCommands.js` which expects the
following structure:

```js
const commands = {
  commandKey: {

    // The regex expression you wish to examine in a text from a user
    re: /(?:regexToMatchYourCommandHere)/iv,

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
    re: /\bgood morning\b/iv,
    // Good morning
    action (message) {
      message.channel.send(
        `Good morning ${message.author.username}! :coffee:`
      );
    }
  }
};
```
