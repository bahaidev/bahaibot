/* READER AND LIBRARY FILE */

import {i18n} from 'intl-dom';
import {hiddenWordsLanguages as languages} from './getBahaiWritings.js';
import authors from '../../library/authors.json' with {type: 'json'};
import {langs, langCodes} from '../../dolt-scripts/langs.js';


/**
 * @typedef {"Arabic"|"Chinese (Simplified)"|"English"|"Spanish"|"French"|
 *   "Russian"|"Persian"} Language
 */

/**
 * @callback QuoteList
 * @param {import('discord.js').Message<true>} message
 * @returns {Promise<void>}
 */

/**
 * @callback QuoteBook
 * @param {import('discord.js').Message<true>} message
 * @param {string|null} avatar
 * @param {typeof import('discord.js')} Discord
 * @returns {Promise<void>}
 */
/**
 * @callback ReadRandom
 * @param {import('discord.js').Message<true>} message
 * @param {string|null} avatar
 * @param {typeof import('discord.js')} Discord
 * @returns {Promise<void>}
 */
/**
 * @callback Reader
 * @param {import('discord.js').Message<true>} message
 * @returns {void}
 */
/**
 * @typedef {{
 *   quoteList: QuoteList,
 *   quoteBook: QuoteBook,
 *   readRandom: ReadRandom,
 *   reader: Reader,
 *   getAvailableRandomOptions: () => string[]
 * }} ReaderInfo
 */

/**
 * @typedef {object} Footnote
 * @property {string} fn
 * @property {string} note
 */

/**
 * @typedef {object} LibraryFileEntry
 * @property {string} title
 * @property {string} text
 * @property {Footnote[]} notes
 */

/**
 * @typedef {LibraryFileEntry[]} LibraryFile
 */

/**
 * @typedef {{
 *   id: number,
 *   title: string,
 *   paras: {
 *     id: number,
 *     English: string,
 *     Arabic: string,
 *     "Chinese (Simplified)": string,
 *     Spanish: string,
 *     French: string,
 *     Russian: string,
 *     Persian: string
 *   }[],
 *   notes: Footnote[]
 * }} Chapter
 */

/**
 * @typedef {{
 *   title: Record<Language, string>,
 *   author: "BH",
 *   url: string,
 *   chapters: Chapter[]
 * }} LibraryFileWithChapters
 */

/**
 * @param {object} cfg
 * @param {import('../integratedClientServerBot.js').LimitedFs} cfg.fs
 * @param {import('../discordBot.js').Settings} cfg.settings
 * @param {import('intl-dom').I18NCallback} cfg._
 * @returns {Promise<ReaderInfo>}
 */
async function getQuoteReader ({fs, settings, _}) {
  // IMPORT FILES

  /**
   * @typedef {object} ListingEntry
   * @property {number} id
   * @property {string[]} aka_codes
   * @property {string} title
   * @property {string} author
   * @property {string} filename
   * @property {string} url
   * @property {string} code
   */

  /**
   * @typedef {{
   *   index: Record<string, number>,
   *   list: ListingEntry[]
   * }} LibraryListing
   */

  /**
   * Retrieve Library Data.
   * @type {LibraryListing}
   */
  const library = JSON.parse(
    await fs.readFile(
      new URL('../../library/library_listing.json', import.meta.url), 'utf8'
    )
  );

  // GLOBAL VARIABLES
  const colorBorder = settings.embedColor;
  /* c8 ignore next -- TS */
  const MAX_TEXT_LIMIT = settings.embedTextLimit ?? 2000;

  const availableRandomOptions = Object.keys(library.index);

  const fileRegex = /\bquote (?<refName>\S.+) (?<index>[\-.\d]+)(?: (?<language>\w+))?/iv;

  // FUNCTIONS

  /**
   * @returns {string[]}
   */
  const getAvailableRandomOptions = () => {
    return availableRandomOptions;
  };

  /**
   * Checks whether file exists.
   * @param {LibraryFileWithChapters} file Name of the file based on the
   *   library_listing
   * @param {import('../getWikiTools.js').Integer} index
   * @returns {Chapter|string}
   */
  function readFile (file, index) {
    // Collect size of file
    const max = file.chapters.length -
      /* c8 ignore next -- Hidden Words only currently, so 0-based */
      (file.chapters[0].id === 0 ? 1 : 0);

    // Setup index. It's subtracted by 1 due to array listing
    // 0 is the first element, 1 is the second, etc.
    index = Math.trunc(index) -
      /* c8 ignore next -- Hidden Words only currently, so 0-based */
      (file.chapters[0].id === 0 ? 0 : 1);

    // If the index value is within the permitted range
    if (index > -1 && index <= max) {
      // Return the relevant section
      return file.chapters[index];
    }
    /* c8 ignore next 4 -- Unless a book has a missing chapter numbering,
        it seems this will be unreachable */
    return /** @type {string} */ (_('know_which_work_but_cant_find', {
      max
    }));
  }

  /**
   * Split large text while maintaining full words (from stackoverflow:
   * {@link https://stackoverflow.com/questions/7624713/js-splitting-a-long-string-into-strings-with-char-limit-while-avoiding-splittin}.
   * @param {string} str
   * @param {import('../getWikiTools.js').Integer} l
   * @returns {string[]}
   */
  function splitter (str, l) {
    const strs = [];

    // Disable this and test once other works are enabled besides the
    //   Hidden Words (which should not have any verses we could use
    //   exceeding our default `MAX_TEXT_LIMIT` setting)
    /* c8 ignore next 22 -- Need texts besides Hidden Words */
    // If content string is greater than max limit
    while (str.length > l) {
      // Find the last position of space
      let pos = str.slice(0, Math.max(0, l)).lastIndexOf(' ');

      // Identify the substring position
      pos = pos <= 0 ? l : pos;

      // Push sub string into array of strings
      strs.push(str.slice(0, Math.max(0, pos)));

      // Setup the new index for the string
      let i = str.indexOf(' ', pos) + 1;

      // Make sure it's not the last position
      if (i < pos || i > pos + l) {
        i = pos;
      }

      // Recreate the full text as str, and repeat
      str = str.slice(Math.max(0, i));
    }

    // Push the final string into strings
    strs.push(str);

    // Pass out the data
    return strs;
  }

  /**
   * Embed creator for the reader function.
   * @param {typeof import('discord.js')} Discord
   * @param {string|null} avatar
   * @param {import('discord.js').Message<true>} message
   * @param {import('../getWikiTools.js').Integer} refNumber
   * @param {string} refName
   * @param {Chapter} content
   * @param {Language} language
   * @param {Record<Language, string>} title
   * @param {"BH"} author
   * @returns {Promise<void>}
   */
  async function embedCreator (
    Discord, avatar, message, refNumber, refName, content, language,
    title, author
  ) {
    const lang = languages.includes(language) ? language : 'English';

    const __ = await i18n({
      localesBasePath: 'src',
      locales: [langCodes[langs.indexOf(lang)]]
    });

    // Define the embed features
    let embedDescription = '';

    // Initialize output
    // eslint-disable-next-line @stylistic/max-len -- Long
    // eslint-disable-next-line unicorn/prefer-minimal-ternary -- Semantically clearer
    embedDescription = (refName.toLowerCase() === 'hwa' ||
      refName.toLowerCase() === 'hwp')
      ? /** @type {string} */ (__('number_and_title', {
        refNumber,
        title: content.title
      }))
      // Remove this and test once other works besides hwa/hwp enabled.
      /* c8 ignore next -- Need other words besides Hidden Words */
      : /** @type {string} */ (__('chapter_and_para', {
        refNumber,
        title: content.title
      }));

    // Split text if large
    const textDescriptionSplit = splitter(content.paras[0][lang],
      MAX_TEXT_LIMIT);

    // Process the embed data based on the size of the text
    textDescriptionSplit.forEach((textDesc, i) => {
      // Re-create a new object for the next round of embed for super long text
      const embed = new Discord.EmbedBuilder();

      // Set colors and data
      /* c8 ignore next -- Set in settings */
      embed.setColor(colorBorder ?? null);

      embed.setAuthor({
        name: /** @type {string} */ (__('title_by_author', {
          title: title[lang],
          author: authors[author][lang]
        })),
        /* c8 ignore next -- A guard as is apparently present */
        iconURL: avatar ?? undefined
      });

      // Append new information
      embedDescription += textDesc;
      embed.setDescription(embedDescription);

      // Place the 'note' in the last embed message
      if (i === textDescriptionSplit.length - 1) {
        // Unreachable currently with the two Hidden Words options not
        //  having notes; remove this ignore and test when enabling
        //  other works that do have notes.
        /* c8 ignore next 16 -- Hidden Words do not have notes */
        // If there are notes
        if (content.notes !== undefined && content.notes.length > 0) {
          let ntext = '';

          for (const n of content.notes) {
            ntext += __('footnote', {
              fn: n.fn,
              note: n.note
            });
          }

          if (ntext !== '') {
            embed.addFields({
              name: /** @type {string} */ (__('notes')),
              value: ntext,
              inline: false
            });
          }
        }
      }

      // Publish message
      message.channel.send({embeds: [embed]});

      // Reset the text info
      embedDescription = '';
    });
  }

  /**
   * Shows the listing of library items.
   * @returns {Promise<string>}
   */
  async function quoteListing () {
    // Initialize output string
    let output = '';

    const language = 'English';
    const __ = await i18n({
      localesBasePath: 'src',
      locales: [langCodes[langs.indexOf(language)]]
    });

    // Based on the global variable, pull the names and loop through the data
    for (const element of library.list) {
      // eslint-disable-next-line no-await-in-loop -- Easier
      const file = await openFile(element.code);

      const title = file.title[language];
      const author = authors[file.author][language];

      output += __('quote_listing', {
        code: element.code.toUpperCase(),
        title,
        author
      });
    }

    // Add additional space
    output += '\n';

    // Output message
    return output;
  }

  /**
   * Opens the file.
   * @param {string} refName
   * @returns {Promise<LibraryFileWithChapters>}
   */
  async function openFile (refName) {
    // Retrieve file name
    const file = JSON.parse(
      await fs.readFile(
        new URL(
          `../../library/${library.list[library.index[refName]].filename}`,
          import.meta.url
        ),
        'utf8'
      )
    );

    return file;
  }

  // MODULES

  /** @type {QuoteList} */
  async function quoteList (message) {
    const content = await quoteListing();

    message.channel.send({
      content: /** @type {string} */ (
        _('following_texts_available_in_library', {
          username: message.author.username
        })
      ),
      embeds: [{
        color: 8359053,
        description: /** @type {string} */ (_('to_read_mention_book_name')),
        fields: [
          {
            name: /** @type {string} */ (_('available_texts')),
            value: content
          }
        ]
      }]
    });
  }

  /** @type {QuoteBook} */
  async function quoteBook (message, avatar, Discord) {
    // Collect user input
    const userInput = message.content;

    // Pull the relevant data from the regex
    /* c8 ignore next -- TS */
    const {groups} = userInput.match(fileRegex) ?? {};

    let {refName} = /** @type {{refName: string}} */ (groups);
    const {index, language} =
      /** @type {{index: string, language: Language}} */ (groups);

    // Make sure the file exists
    if (!Object.hasOwn(library.index, refName.toLowerCase())) {
      return;
    }

    // Transform user input
    refName = refName.toLowerCase();

    // Open the file
    const file = await openFile(refName);

    // Feed into readFile function
    const content = readFile(file, Number(index));

    // If condition based on data type returned
    if (typeof content === 'object') {
      // Create the embed
      await embedCreator(
        Discord, avatar, message, Number(index), refName, content, language,
        file.title, file.author
      );
    /* c8 ignore next 6 -- See note below */
    // Unless a book has a missing chapter numbering, it seems this will be
    //   unreachable
    } else {
      // Inform the user that they did not select the correct section
      message.channel.send(content);
    }
  }

  /** @type {ReadRandom} */
  async function readRandom (message, avatar, Discord) {
    const userInput = message.content;

    // Pull the relevant data from the regex
    /* c8 ignore next -- TS */
    const {groups = {}} = userInput.match(
      /\bquote random(?: (?<language>[\w\(\) ]+?))?(?: (?<book>\w+))?$/iv
    ) ?? {groups: {}};

    const language = /** @type {Language} */ (groups.language?.trim() ?? '');

    // Select a random element
    const refName = groups.book && availableRandomOptions.includes(groups.book)
      ? groups.book
      : availableRandomOptions[
        Math.floor(Math.random() * availableRandomOptions.length)
      ];

    // Receive the file
    const file = await openFile(refName);

    // Generate random reference number
    const randomNumber = Math.floor(
      Math.random() * (
        file.chapters.length +
        /* c8 ignore next -- Hidden Words only currently, so 0-based */
        (file.chapters[0].id === 0 ? 0 : 1)
      )
    );

    // Generate a random number based on the file length and pull content
    //  from file
    const content = /** @type {Chapter} */ (readFile(file, randomNumber));

    // Create the embed
    await embedCreator(
      Discord, avatar, message, randomNumber, refName, content, language,
      file.title, file.author
    );
  }

  /** @type {Reader} */
  function reader (message) {
    // Inform the user they need to provide the correct input.
    // This is the default false conditions
    message.channel.send(
      /** @type {string} */ (_('couldnt_understand_request'))
    );
  }

  /**
   * @type {ReaderInfo}
   */
  return {
    quoteList,
    quoteBook,
    readRandom,
    reader,
    getAvailableRandomOptions
  };
}

export default getQuoteReader;
