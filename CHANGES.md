# CHANGES for `bahaibot`

## 0.4.0 (Unreleased)

- Build: Update
- Linting: As per latest ash-nazg
- npm: Update `@discordjs/opus` (patch), `@google-cloud/dialogflow` (major),
  `discord-tts` (minor), `file-fetch` (minor), striptags (minor)
- npm: Update devDeps.

## 0.3.0

- See `0.2.0`.

## 0.2.0 (Unpublished)

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
