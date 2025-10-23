import {expect} from 'chai';
import areCommandsDifferent from '../src/utils/areCommandsDifferent.js';

describe('areCommandsDifferent extra cases', function () {
  it('detects when existing has options but local does not', function () {
    const existing = {
      description: 'd', options: [{name: 'a', description: 'x', type: 3}]
    };
    const local = {description: 'd', options: []};
    expect(areCommandsDifferent(
      // @ts-expect-error Just mock what we need
      existing,
      local
    )).to.be.true;
  });

  it('detects when existing has no matching option', function () {
    const existing = {
      description: 'd', options: [{name: 'a', description: 'd', type: 3}]
    };
    const local = {description: 'd', options: [
      {
        name: 'b', description: 'd', type: 3
      }
    ]};
    expect(areCommandsDifferent(
      // @ts-expect-error Just mock what we need
      existing,
      local
    )).to.be.true;
  });

  it('returns false when choices are identical', function () {
    const existing = {
      description: 'd',
      options: [
        {
          name: 'opt', description: 'o', type: 3,
          choices: [{name: 'a', value: '1'}]
        }
      ]
    };
    const local = {
      description: 'd',
      options: [
        {
          name: 'opt', description: 'o', type: 3,
          choices: [{name: 'a', value: '1'}]
        }
      ]
    };
    expect(areCommandsDifferent(
      // @ts-expect-error Just mock what we need
      existing,
      local
    )).to.be.false;
  });

  it(
    'detects when a local choice name is missing from existing choices',
    function () {
      const existing = {
        description: 'd',
        options: [
          {
            name: 'opt', description: 'o', type: 3,
            choices: [{name: 'a', value: '1'}]
          }
        ]
      };
      const local = {
        description: 'd',
        options: [
          {
            name: 'opt', description: 'o', type: 3,
            choices: [{name: 'b', value: '1'}]
          }
        ]
      };
      expect(areCommandsDifferent(
        // @ts-expect-error Just mock what we need
        existing,
        local
      )).to.be.true;
    }
  );
});
