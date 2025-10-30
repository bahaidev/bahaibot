import getQuoteReader from './getQuoteReader.js';
import {searchEngines} from './searchEngines.js';

const worksByBahaullahOrTheBab = new Set([
  'dor', 'esw', 'gdm', 'gwb', 'gwbs', 'hw', 'hwa', 'hwp', 'ka', 'kan',
  'kap', 'kaq', 'ki', 'kip', 'pb', 'pm', 'pms', 'slh', 'sv', 'swb',
  'tb', 'tu'
]);

const worksByAbdulBaha = new Set([
  'abl', 'adp', 'fwu', 'mf', 'pt', 'pup', 'saq', 'saqc', 'saqp', 'sdc',
  'swab', 'swabs', 'tab', 'taf', 'tdp', 'tn', 'wt'
]);

const worksByShoghiEffendi = new Set([
  'adj', 'aro', 'ba', 'bng', 'cf', 'dg', 'dnd', 'gpb', 'he', 'lanz',
  'ldg1', 'ldg2', 'ma', 'man', 'mbw', 'mc', 'mc2', 'msei', 'pass', 'pdc',
  'pdcp', 'syn', 'tdh', 'ud', 'wob'
  // 'manyear',
]);

const worksByOthersAndCompilations = new Set([
  'b9', 'bcommons', 'bib', 'bk', 'bl', 'blb', 'bnews', 'bpedia', 'br', 'bs',
  'bwf', 'bworks', 'cl', 'blaze', 'bne', 'bp', 'db', 'ddbc', 'log', 'bss',
  'logn', 'sow', 'qur', 'w'
]);

const worksByAuthorSiteOrCollectionSearch = new Set([
  'b9s', 'bcommonss', 'bibs', 'bloc', 'blbs', 'bls', 'bnewss', 'bos',
  'bpedias', 'bstorys',
  'btag', 'bworkss', 'bws', 'bdate', 'bauthor', 'btitle', 'cat', 'cchron',
  'chron', 'qurs',
  'sows', 'uhjs', 'ws'
]);
/*
const worksByRandom = new Set([
  // By random:
  'b9randcat', 'bpediarandcat', 'mediarandcat', 'worksrandcat'
]);
*/

/**
 * @param {object} cfg
 * @param {import('../integratedClientServerBot.js').LimitedFs} cfg.fs
 * @param {import('../discordBot.js').Settings} cfg.settings
 * @param {import('discord.js').Client} cfg.client
 * @param {import('discord.js')} cfg.Discord
 * @param {import('intl-dom').I18NCallback} cfg._
 * @returns {Promise<import('./getCommands.js').BotCommands>}
 */
const getBahaiWritings = async ({fs, settings, client, Discord, _}) => {
  const reader = await getQuoteReader({fs, settings, _});

  /*
    "While the overall number of potential subcommands can be quite high
    (e.g., 100 top-level commands * 25 subcommand groups * 25 subcommands
    per group = 62,500), there is also a 4000-character limit that applies
    to the combined string length of all subcommands within a command group."
  */

  const filteredSearchEngines = searchEngines.filter(({keyword}) => {
    return ![
      // Remove duplicates
      'b', 'blg',
      // Remove less necessary (whose group will otherwise run into 25
      //   option limit)
      'manyear'
    ].includes(keyword);
  });

  const groupedEngines = Object.groupBy(filteredSearchEngines, ({keyword}) => {
    return worksByBahaullahOrTheBab.has(keyword)
      ? 'worksByBahaullahOrTheBab'
      : worksByAbdulBaha.has(keyword)
        ? 'worksByAbdulBaha'
        : worksByShoghiEffendi.has(keyword)
          ? 'worksByShoghiEffendi'
          : worksByOthersAndCompilations.has(keyword)
            ? 'worksByOthersAndCompilations'
            : worksByAuthorSiteOrCollectionSearch.has(keyword)
              ? 'worksByAuthorSiteOrCollectionSearch'
              : 'worksByRandom';
  });

  // Works by section/selection -> works -> section/selection

  /**
   * @param {keyof groupedEngines} type
   */
  const mixinWorks = (type) => {
    return {
      /**
       * @param {import('discord.js').AutocompleteInteraction<
       *   import('discord.js').CacheType
       * >} interaction
       * @returns {Promise<void>}
       */
      async autocomplete (interaction) {
        // Get the value the user is typing
        const focusedValue = interaction.options.getFocused();

        // eslint-disable-next-line @stylistic/max-len -- Long
        const filtered = /** @type {import('./searchEngines.js').SearchEngine[]} */ (
          groupedEngines[type]
        ).filter(
          ({
            keyword, short_name: shortName
          }) => shortName.startsWith(focusedValue) ||
            keyword.startsWith(focusedValue)
        );

        await interaction.respond(
          filtered.map(({keyword, short_name: shortName}) => {
            return {
              name: shortName, value: keyword
            };
          })
        );
      },
      options: [
        {
          name: 'work',
          description: 'The work',
          type: Discord.ApplicationCommandOptionType.String,
          autocomplete: true,
          required: true
        },
        {
          name: 'section-selection',
          description:
            'The page, paragraph, or selection',
          type: Discord.ApplicationCommandOptionType.String,
          required: true
        }
      ],
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (!interaction.isChatInputCommand()) {
          return;
        }

        /* c8 ignore next 4 -- Required so fallback should not be necessary */
        const keyword = (
          /** @type {string} */
          (interaction.options.get('work')?.value) ?? ''
        );

        const {url, short_name: work} = searchEngines.find(({keyword: kw}) => {
          return keyword === kw;
        }) ?? /* c8 ignore next 3 -- TS */ {
          url: '',
          // eslint-disable-next-line camelcase -- API
          short_name: ''
        };

        // Could be like `1-1-1`
        const sectionSelection = interaction.options.getString(
          'section-selection'
        ) ?? '';

        await interaction.reply(
          `${
            type === 'worksByRandom' ? '<' : ''
          }[${work}${sectionSelection ? `, ${sectionSelection}` : ''}]` +
          `(${
            sectionSelection
              ? url.replaceAll(
                '%s', encodeURIComponent(sectionSelection)
              )
              : url.replaceAll('%s', '')
          })${
            type === 'worksByRandom' ? '>' : ''
          }`
        );
      }
    };
  };

  const newlyGroupedEngines =
    /** @type {import('./getCommands.js').BotCommands} */ ({
      worksByBahaullahOrTheBab: {
        name: 'works-by-bahaullah-or-the-bab',
        description: 'Works by Bahá\'u\'lláh or the Báb',
        ...mixinWorks('worksByBahaullahOrTheBab')
      },
      worksByAbdulBaha: {
        name: 'works-by-abdul-baha',
        description: 'Works by \'Abdu\'l-Bahá',
        ...mixinWorks('worksByAbdulBaha')
      },
      worksByShoghiEffendi: {
        name: 'works-by-shoghi-effendi',
        description: 'Works by Shoghi Effendi',
        ...mixinWorks('worksByShoghiEffendi')
      },
      worksByOthersAndCompilations: {
        name: 'works-by-others',
        description: 'Works by others and compilations',
        ...mixinWorks('worksByOthersAndCompilations')
      },
      worksByRandom: {
        name: 'randcat',
        description: 'Works randomly selected (by category)',
        ...mixinWorks('worksByRandom')
      },
      worksByAuthorSiteOrCollectionSearch: {
        name: 'works-search',
        description: 'Works by author, site, or collection search',
        ...mixinWorks('worksByAuthorSiteOrCollectionSearch')
      }
    });

  const writingsReferences = {
    re: new RegExp(
      `\\b(?<searchEngine>${
        // Shouldn't need escaping as these are just our simple shortcuts
        searchEngines.map(({keyword}) => {
          return keyword;
        }).join('|')
      }):(?<searchValue>[\\d:\\-]+)\\b`,
      'v'
    ),
    notMentioned: {
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {boolean}
       */
      check (message) {
        return writingsReferences.re.test(message.content);
      },
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        const {
          searchEngine,
          searchValue
        /* c8 ignore next -- Should always match */
        } = writingsReferences.re.exec(message.content)?.groups ?? {};
        const {short_name: shortName, url} = searchEngines.find(({keyword}) => {
          return keyword === searchEngine;
        /* c8 ignore next -- Should always match */
        }) ?? {};
        await message.channel.send({
          content: `[${shortName} ${
            searchValue
          }](${url?.replaceAll('%s', searchValue)})`
        });
      }
    }
  };

  return /** @type {import('./getCommands.js').BotCommands} */ ({
    ...newlyGroupedEngines,
    // NOTE: If we need to remove these, we can add `deleted` property to them,
    //        or invoke `client.application.commands.set([]);`, bearing in mind
    //        the 200 day Discord limit on new commands
    library: {
      name: 'library',
      description: "A link to a search of the Bahá'í Writings " +
        'on the official site',
      options: [
        {
          name: 'search',
          description: 'The search term',
          type: Discord.ApplicationCommandOptionType.String,
          required: true
        }
      ],
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (!interaction.isChatInputCommand()) {
          return;
        }

        /* c8 ignore next -- Required so fallback should not be necessary */
        const search = interaction.options.getString('search') ?? '';

        await interaction.reply(
          `[${search}](https://www.bahai.org/library/authoritative-texts/search?q=${
            encodeURIComponent(search)
          })`
        );
      }
    },
    blo: {
      name: 'blo',
      description: "A link to a search of Bahá'í Library Online",
      options: [
        {
          name: 'search',
          description: 'The search term',
          type: Discord.ApplicationCommandOptionType.String,
          required: true
        }
      ],
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (!interaction.isChatInputCommand()) {
          return;
        }

        /* c8 ignore next -- Required so fallback should not be necessary */
        const search = interaction.options.getString('search') ?? '';

        await interaction.reply(
          `[${search}](https://www.google.com/search?client=firefox-b-d&q=site%3Abahai-library.com+${
            encodeURIComponent(search)
          })`
        );
      }
    },
    randomWritings: {
      name: 'rand-writings',
      description: "A link to a random selection from the Bahá'í Writings",
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        await interaction.reply(
          `<[Random Bahá'í Writings](https://bahai-library.com/random)>`
        );
      }
    },
    quoteBook: {
      name: 'quote',
      description:
        "Provide a selection of the Bahá'í Writings by book and chapter",
      /**
       * @param {import('discord.js').AutocompleteInteraction<
       *   import('discord.js').CacheType
       * >} interaction
       * @returns {Promise<void>}
       */
      async autocomplete (interaction) {
        // Get the value the user is typing
        const focusedValue = interaction.options.getFocused();
        const choices = reader.getAvailableRandomOptions();

        const filtered = choices.filter(
          (choice) => choice.startsWith(focusedValue)
        );
        await interaction.respond(
          filtered.map((choice) => ({name: choice, value: choice}))
        );
      },
      options: [
        {
          name: 'book',
          description: 'The book to select',
          type: Discord.ApplicationCommandOptionType.String,
          autocomplete: true,
          required: true
        },
        {
          name: 'chapter',
          description: 'The chapter',
          type: Discord.ApplicationCommandOptionType.Integer,
          required: true
        }
      ],
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (!interaction.isChatInputCommand()) {
          return;
        }

        /* c8 ignore next 2 -- Required so fallback should not be necessary */
        const book = interaction.options.getString('book') ?? '';
        const chapter = interaction.options.getInteger('chapter') ?? '';
        await this.action?.({
          content: `!quote ${book} ${chapter}`,
          channel: {
            /**
             * @param {string} reply
             */
            // @ts-expect-error Just mocking what we need
            send (reply) {
              interaction.reply(reply);
            }
          }
        });
      },

      re: /\bquote (?<refName>\S.+) (?<index>[\-.\d]+)\b/iv,
      /**
       * Reads some scripture.
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.quoteBook(
          message, /** @type {import('discord.js').ClientUser} */ (
            client.user
          ).avatarURL(), Discord
        );
      }
    },
    quoteList: {
      re: /\bquote list$/iv,
      /**
       *
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.quoteList(message);
      }
    },
    readRandom: {
      name: 'quote-random',
      description: "Provide a random selection of the Bahá'í Writings",
      re: /\bquote random$/iv,
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (!interaction.inCachedGuild()) {
          return;
        }
        await this.action?.({
          channel: {
            /**
             * @param {string} reply
             */
            // @ts-expect-error Just mocking what we need
            send (reply) {
              interaction.reply(reply);
            }
          }
        });
      },
      /**
       *
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.readRandom(
          message,
          /** @type {import('discord.js').ClientUser} */ (
            client.user
          ).avatarURL(),
          Discord
        );
      }
    },
    quote: {
      re: /!quote\b/iv,
      // This is reused for the other commands
      helpInfo: {
        name: '!quote [list | random | *‹text›* *‹chapter›*]',
        value: 'Quotes from the Bahá\'í Writings. Displays an excerpt ' +
            'from given *chapter* of *text*. Available texts are ' +
            'displayed using `!quote list`; `!quote random` displays ' +
            'a random passage from available texts.'
      },
      /**
       * A fallback if the user fails to provide an argument.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        return reader.reader(message);
      }
    },
    writingsReferences
  });
};

export default getBahaiWritings;
