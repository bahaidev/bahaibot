import {expect} from 'chai';
import areCommandsDifferent from '../src/utils/areCommandsDifferent.js';

describe('areCommandsDifferent extra cases', function () {
  it('detects when existing has options but local does not', function () {
    const existing = /** @type {any} */ ({description: 'd', options: [{name: 'a', description: 'x', type: 3}]});
    const local = /** @type {any} */ ({description: 'd', options: []});
    expect(areCommandsDifferent(existing, local)).to.be.true;
  });

  it('returns false when choices are identical', function () {
    const existing = /** @type {any} */ ({
      description: 'd',
      options: [
        {name: 'opt', description: 'o', type: 3, choices: [{name: 'a', value: '1'}]}
      ]
    });
    const local = /** @type {any} */ ({
      description: 'd',
      options: [
        {name: 'opt', description: 'o', type: 3, choices: [{name: 'a', value: '1'}]}
      ]
    });
    expect(areCommandsDifferent(existing, local)).to.be.false;
  });

  it('detects when a local choice name is missing from existing choices', function () {
    const existing = /** @type {any} */ ({
      description: 'd',
      options: [
        {name: 'opt', description: 'o', type: 3, choices: [{name: 'a', value: '1'}]}
      ]
    });
    const local = /** @type {any} */ ({
      description: 'd',
      options: [
        {name: 'opt', description: 'o', type: 3, choices: [{name: 'b', value: '1'}]}
      ]
    });
    expect(areCommandsDifferent(existing, local)).to.be.true;
  });
});
