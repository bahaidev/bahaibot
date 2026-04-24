# CHANGES for `bahaibot`

## 0.5.0

- feat: Add Badí' date and long Gregorian date to `/today`
- feat: export types
- feat: Gregorian to Badí' `/date` conversion
- feat: add book option to `quote-random`
- feat: add `/uptime`
- feat: support language for `quote` and `quote-random`; ensure
    HW has separate preambles and conclusion
- fix: don't exit upon problem with `setSaferInterval`
- fix: HW max
- fix: defer reply for `/users` and `/today`
- chore: update deps. and devDeps.
- refactor: use `node:` prefix for Node imports

## 0.4.2

- fix: i18n path

## 0.4.1

- fix: `exports`

## 0.4.0

- Numerous other features and fixes; see commit logs
- Build: Update
- Linting: As per latest ash-nazg
- npm: Update `@discordjs/opus` (patch), `@google-cloud/dialogflow` (major),
  `discord-tts` (minor), `file-fetch` (minor), `striptags` (minor),
  `discord.js-rate-limiter` (minor)
- npm: Update devDeps.

## 0.3.0

- See `0.2.0`.

## 0.2.0

- Update from deprecated `apiai` to `@google-cloud/dialogflow` (@sscotti)
- Fix: Ensure there is a means to get at `settings.json` `production` section
  (by command line flag).
- Fix: Ensure star exists for `badi` command
- Fix: For checkins, ensure bstar exists
- Fix: Strip initial bot reference if without a nickname (`!`)
- Fix: Convert any subsequent snowflakes into a corresponding user name.
- Enhancement: Create adapter `getDialogflowAdapter`
- Docs: Add Contributing file
- npm: Update `file-fetch`, `discord-tts`, devDeps.

## 0.1.0

- Initial version
