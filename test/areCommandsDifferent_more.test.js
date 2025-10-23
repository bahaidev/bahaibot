import {expect} from 'chai';
import areCommandsDifferent from '../src/utils/areCommandsDifferent.js';

describe('areCommandsDifferent additional branches', function () {
  it('detects when choice count differs', function () {
    const existing = /** @type {any} */ ({
      description: 'd',
      options: [
        {name: 'opt', description: 'o', type: 3, choices: [{name: 'a', value: '1'}]}
      ]
    });
    const local = /** @type {any} */ ({
      description: 'd',
      options: [
        {name: 'opt', description: 'o', type: 3, choices: []}
      ]
    });
    expect(areCommandsDifferent(existing, local)).to.be.true;
  });

  it('detects when required flag differs', function () {
    const existing = /** @type {any} */ ({
      description: 'd',
      options: [
        {name: 'opt', description: 'o', type: 3, required: false}
      ]
    });
    const local = /** @type {any} */ ({
      description: 'd',
      options: [
        {name: 'opt', description: 'o', type: 3, required: true}
      ]
    });
    expect(areCommandsDifferent(existing, local)).to.be.true;
  });

  it('returns false when nested options equal', function () {
    const existing = /** @type {any} */ ({
      description: 'd',
      options: [
        {name: 'group', description: 'g', type: 2, options: [{name: 'sub', description: 's', type: 3}]}
      ]
    });
    const local = /** @type {any} */ ({
      description: 'd',
      options: [
        {name: 'group', description: 'g', type: 2, options: [{name: 'sub', description: 's', type: 3}]}
      ]
    });
    expect(areCommandsDifferent(existing, local)).to.be.false;
  });
});
