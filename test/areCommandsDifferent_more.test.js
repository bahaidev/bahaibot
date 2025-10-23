import {expect} from 'chai';
import areCommandsDifferent from '../src/utils/areCommandsDifferent.js';

describe('areCommandsDifferent additional branches', function () {
  it('detects when choice count differs', function () {
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
        {name: 'opt', description: 'o', type: 3, choices: []}
      ]
    };
    expect(areCommandsDifferent(
      // @ts-expect-error Just mock what we need
      existing,
      local
    )).to.be.true;
  });

  it('detects when required flag differs', function () {
    const existing = {
      description: 'd',
      options: [
        {name: 'opt', description: 'o', type: 3, required: false}
      ]
    };
    const local = {
      description: 'd',
      options: [
        {name: 'opt', description: 'o', type: 3, required: true}
      ]
    };
    expect(areCommandsDifferent(
      // @ts-expect-error Just mock what we need
      existing,
      local
    )).to.be.true;
  });

  it('returns false when nested options equal', function () {
    const existing = {
      description: 'd',
      options: [
        {
          name: 'group', description: 'g', type: 2,
          options: [{name: 'sub', description: 's', type: 3}]
        }
      ]
    };
    const local = {
      description: 'd',
      options: [
        {
          name: 'group', description: 'g', type: 2,
          options: [{name: 'sub', description: 's', type: 3}]
        }
      ]
    };
    expect(areCommandsDifferent(
      // @ts-expect-error Just mock what we need
      existing,
      local
    )).to.be.false;
  });
});
