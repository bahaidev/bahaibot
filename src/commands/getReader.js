/* READER AND LIBRARY FILE */

/**
 * @param {object} cfg
 * @param {FileSystem} cfg.fs
 * @param {Settings} cfg.settings
 * @returns {Reader}
 */
async function getReader ({fs, settings}) {
  // IMPORT FILES

  /**
   * @typedef {object} ListingEntry
   * @property {string} title
   * @property {string} author
   * @property {string} filename
   * @property {string} url
   */

  /**
   * @typedef {Object<string,ListingEntry>} LibraryListing
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
  const MAX_TEXT_LIMIT = settings.embedTextLimit;

  const availableRandomOptions = Object.keys(library.index);

  const fileRegex = /\bread (?<refName>\S.+) (?<index>[\-.\d]+)\b/iv;

  // FUNCTIONS

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
   * Checks whether file exists.
   * @param {LibraryFile} file Name of the file based on the library_listing
   * @param {Integer} index
   * @returns {LibraryFileEntry|string}
   */
  function readFile (file, index) {
    // Collect size of file
    const max = file.chapters.length;

    // Setup index. It's subtracted by 1 due to array listing
    // 0 is the first element, 1 is the second, etc.
    index = Number.parseInt(index) - 1;

    // If the index value is within the permitted range
    if (index > -1 && index < max) {
      // Return the relevant section
      return file.chapters[index];
    }
    /* c8 ignore next 4 */
    // Unless a book has a missing chapter numbering, it seems this will be
    //   unreachable
    return "I know which work you're talking about, but I can't find that " +
      `section in it. Valid section numbers are from **1** to **${max}**.`;
  }

  /**
   * Split large text while maintaining full words (from stackoverflow:
   * {@link https://stackoverflow.com/questions/7624713/js-splitting-a-long-string-into-strings-with-char-limit-while-avoiding-splittin}.
   * @param {string} str
   * @param {Integer} l
   * @returns {string[]}
   */
  function splitter (str, l) {
    const strs = [];

    // Disable this and test once other works are enabled besides the
    //   Hidden Words (which should not have any verses we could use
    //   exceeding our default `MAX_TEXT_LIMIT` setting)
    /* c8 ignore next 20 */
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
   * @param {DiscordModule} Discord
   * @param {string} avatar
   * @param {DiscordMessage} message
   * @param {Integer} refNumber
   * @param {string} refName
   * @param {LibraryFileEntry|string} content
   * @returns {void}
   */
  function embedCreator (
    Discord, avatar, message, refNumber, refName, content
  ) {
    // Define the embed features
    let embedDescription = '';

    // Initialize output
    embedDescription = (refName.toLowerCase() === 'hwa' ||
      refName.toLowerCase() === 'hwp')
      ? `**${refNumber}. ${content.title}**\n`
      // Remove this and test once other works besides hwa/hwp enabled.
      /* c8 ignore next */
      : `**Chapter ${refNumber}, Para 1. ${content.title}**\n`;

    // Split text if large
    const textDescriptionSplit = splitter(content.paras[0].text,
      MAX_TEXT_LIMIT);

    // Process the embed data based on the size of the text
    textDescriptionSplit.forEach((textDesc, i) => {
      // Re-create a new object for the next round of embed for super long text
      const embed = new Discord.MessageEmbed();

      // Set colors and data
      embed.setColor(colorBorder);
      embed.setAuthor(
        `${library.list[library.index[refName]].title} by ` +
        `${library.list[library.index[refName]].author}`,
        avatar
      );

      // Append new information
      embedDescription += textDesc;
      embed.setDescription(embedDescription);

      // Place the 'note' in the last embed message
      if (i === textDescriptionSplit.length - 1) {
        // Unreachable currently with the two Hidden Words options not
        //  having notes; remove this ignore and test when enabling
        //  other works that do have notes.
        /* c8 ignore next 12 */
        // If there are notes
        if (content.notes !== undefined && content.notes.length > 0) {
          let ntext = '';

          for (const n of content.notes) {
            ntext += `${n.fn}. ${n.note}\n`;
          }

          if (ntext !== '') {
            embed.addField('Notes', ntext);
          }
        }
      }

      // Publish message
      message.channel.send(embed);

      // Reset the text info
      embedDescription = '';
    });
  }

  /**
   * Shows the listing of library items.
   * @returns {string}
   */
  function showListing () {
    // Initiatilze output string
    let output = '';

    // Based on the global variable, pull the names and loop through the data
    for (const element of library.list) {
      output += `\n**${
        element.code.toUpperCase()
      }**: ${element.title} (${element.author})`;
    }

    // Add additional space
    output += '\n';

    // Output message
    return output;
  }

  /**
   * Opens the file.
   * @param {string} refName
   * @returns {LibraryFile}
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

  /**
   *
   * @param {DiscordMessage} message
   * @returns {void}
   */
  function showList (message) {
    const content = showListing();

    message.channel.send({
      content: `The following texts are available in my ` +
                      `library, ${message.author.username}.`,
      embed: {
        color: 8359053,
        description: '\nTo read from one of these texts, mention the ' +
            "book name and the section you're interested in. For example, " +
            'to read the 12th Arabic Hidden Word, say: `!read HWA 12`.',
        fields: [
          {
            name: 'Available Texts',
            value: content
          }
        ]
      }
    });
  }

  /**
   *
   * @param {DiscordMessage} message
   * @param {string} avatar
   * @param {DiscordModule} Discord
   * @returns {Promise<void>}
   */
  async function readBook (message, avatar, Discord) {
    // Collect user input
    const userInput = message.content;

    // Pull the relevant data from the regex
    const {groups} = userInput.match(fileRegex);

    let {refName} = groups;
    const {index} = groups;

    // Make sure the file exists
    if (!Object.hasOwn(library.index, refName.toLowerCase())) {
      return;
    }

    // Transform user input
    refName = refName.toLowerCase();

    // Open the file
    const file = await openFile(refName);

    // Feed into readFile function
    const content = readFile(file, index);

    // If condition based on data type returned
    if (typeof content === 'object') {
      // Create the embed
      embedCreator(
        Discord, avatar, message, index, refName, content
      );
    /* c8 ignore next 6 */
    // Unless a book has a missing chapter numbering, it seems this will be
    //   unreachable
    } else {
      // Inform the user that they did not select the correct section
      message.channel.send(content);
    }
  }

  /**
   *
   * @param {DiscordMessage} message
   * @param {string} avatar
   * @param {DiscordModule} Discord
   * @returns {Promise<void>}
   */
  async function readRandom (message, avatar, Discord) {
    // Select a random element
    const refName = availableRandomOptions[
      Math.floor(Math.random() * availableRandomOptions.length)
    ];

    // Receive the file
    const file = await openFile(refName);

    // Generate random reference number
    const randomNumber = Math.floor(Math.random() * file.chapters.length);

    // Generate a random number based on the file length and pull content
    //  from file
    const content = readFile(file, randomNumber);

    // Create the embed
    embedCreator(Discord, avatar, message, randomNumber, refName, content);
  }

  /**
   *
   * @param {DiscordMessage} message
   * @returns {void}
   */
  function reader (message) {
    // Inform the user they need to provide the correct input.
    // This is the default false conditions
    message.channel.send(
      "I couldn't understand your request. Make sure you format your " +
      'request like this: ``read <work> <section number>``. To see the ' +
      'list of works in my library, type ``read list``.'
    );
  }

  /**
   * @type {Reader}
   */
  return {
    showList,
    readBook,
    readRandom,
    reader
  };
}

export default getReader;
