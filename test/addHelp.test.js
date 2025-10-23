import {expect} from 'chai';
import addHelp from '../src/commands/addHelp.js';

describe('addHelp', function () {
  it(
    'adds help commands and message action sends embeds with fields',
    function () {
      const commands = addHelp({commands: {
        foo: {
          helpInfo: {name: '!foo', value: 'foo help'},
          helpExtra: {name: '!fooextra', value: 'foo extra'},
          helpAdmin: {name: '!fooadmin', value: 'foo admin'}
        }
      }});

      /** @type {import('discord.js').MessageCreateOptions} */
      let sentObj;
      const message = {
        author: {username: 'TestUser'},
        channel: {
          /**
           * @param {import('discord.js').MessageCreateOptions} payload
           */
          send (payload) {
            sentObj = payload;
          }
        }
      };

      // call the help action which should send with fields
      // @ts-expect-error We only add the properties we need
      commands.help.action(message);

      // @ts-expect-error Ok
      const sent = sentObj;
      expect(sent).to.be.an('object');
      expect(sent.embeds).to.be.an('array');
      const embed = sent.embeds?.[0];
      const fields =
        /** @type {import('../src/commands/addHelp.js').BotHelpField[]} */ (
          /** @type {import('discord.js').APIEmbed} */
          (embed)?.fields
        );
      expect(fields).to.be.an('array');
      // Should include the foo helpInfo we supplied
      const names = fields.map((f) => f.name);
      expect(names.some((n) => String(n).includes('!foo'))).to.equal(true);
    }
  );

  it('helpextras slashCommand replies when in cached guild', async function () {
    const commands = addHelp({commands: {}});

    let replied;

    /**
     * @type {import('../src/commands/getCommands.js').
     * InputCommandOrSelectMenu
     * }
     */
    const interaction = {
      /**
       * @returns {this is import('discord.js').
       *   StringSelectMenuInteraction<"cached">}
       */
      inCachedGuild () {
        return true;
      },
      // @ts-expect-error Just mock what we need
      user: {id: 'u'},
      /**
       * @param {import('discord.js').InteractionReplyOptions} arg
       */
      // @ts-expect-error Just mock what we need
      reply (arg) {
        replied = arg;
      }
    };

    await commands.helpextras.slashCommand?.(interaction);
    expect(replied).to.exist;
  });

  it(
    'helpadmin slashCommand does not reply when not in cached guild',
    async function () {
      const commands = addHelp({commands: {}});

      let replied = false;

      /**
       * @type {import('../src/commands/getCommands.js').
       * InputCommandOrSelectMenu
       * }
       */
      const interaction = {
        /**
         * @returns {this is import('discord.js').
         *   StringSelectMenuInteraction<"cached">}
         */
        inCachedGuild () {
          return false;
        },
        // @ts-expect-error Just mock what we need
        user: {id: 'u'},
        /**
         *
         */
        // @ts-expect-error Just mock what we need
        reply () {
          replied = true;
        }
      };

      await commands.helpadmin.slashCommand?.(interaction);
      expect(replied).to.equal(false);
    }
  );
});
