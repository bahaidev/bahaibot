import {expect} from 'chai';
import areCommandsDifferent from '../src/utils/areCommandsDifferent.js';

describe('areCommandsDifferent', function () {
  it('returns false for identical commands (no options)', function () {
    const existing = {description: 'desc', options: []};
    const local = {description: 'desc', options: []};
    expect(areCommandsDifferent(
      // @ts-expect-error Just mock what we need
      existing,
      local
    )).to.be.false;
  });

  it('detects description change', function () {
    const existing = {description: 'old', options: []};
    const local = {description: 'new', options: []};
    expect(areCommandsDifferent(
      // @ts-expect-error Just mock what we need
      existing,
      local
    )).to.be.true;
  });

  it('detects differing choice values', function () {
    const existing = {
      description: 'd',
      options: [
        {
          name: 'opt',
          description: 'o',
          type: 3,
          choices: [{name: 'a', value: '1'}]
        }
      ]
    };

    const local = {
      description: 'd',
      options: [
        {
          name: 'opt',
          description: 'o',
          type: 3,
          choices: [{name: 'a', value: '2'}]
        }
      ]
    };

    expect(areCommandsDifferent(
      // @ts-expect-error Just mock what we need
      existing,
      local
    )).to.be.true;
  });

  it('detects missing nested options (subcommand) differences', function () {
    const existing = {
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
    };

    const local = {
      description: 'd',
      options: [
        {
          name: 'group',
          description: 'g',
          type: 2,
          options: []
        }
      ]
    };

    expect(areCommandsDifferent(
      // @ts-expect-error Just mock what we need
      existing,
      local
    )).to.be.true;
  });
});
