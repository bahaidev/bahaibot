import {expect} from 'chai';
import areCommandsDifferent from '../src/utils/areCommandsDifferent.js';

describe('areCommandsDifferent', function () {
  it('returns false for identical commands (no options)', function () {
  const existing = /** @type {any} */ ({description: 'desc', options: []});
  const local = /** @type {any} */ ({description: 'desc', options: []});
    expect(areCommandsDifferent(existing, local)).to.be.false;
  });

  it('detects description change', function () {
  const existing = /** @type {any} */ ({description: 'old', options: []});
  const local = /** @type {any} */ ({description: 'new', options: []});
    expect(areCommandsDifferent(existing, local)).to.be.true;
  });

  it('detects differing choice values', function () {
    const existing = /** @type {any} */ ({
      description: 'd',
      options: [
        {
          name: 'opt',
          description: 'o',
          type: 3,
          choices: [{name: 'a', value: '1'}]
        }
      ]
  });

    const local = /** @type {any} */ ({
      description: 'd',
      options: [
        {
          name: 'opt',
          description: 'o',
          type: 3,
          choices: [{name: 'a', value: '2'}]
        }
      ]
  });

    expect(areCommandsDifferent(existing, local)).to.be.true;
  });

  it('detects missing nested options (subcommand) differences', function () {
    const existing = /** @type {any} */ ({
      description: 'd',
      options: [
        {
          name: 'group',
          description: 'g',
          type: 2,
          options: [
            {name: 'sub', description: 's', type: 3}
          ]
        }
      ]
  });

    const local = /** @type {any} */ ({
      description: 'd',
      options: [
        {
          name: 'group',
          description: 'g',
          type: 2,
          options: []
        }
      ]
  });

    expect(areCommandsDifferent(existing, local)).to.be.true;
  });
});
