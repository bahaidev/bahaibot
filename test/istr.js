import istr from '../src/utils/istr.js';

describe('istr utility', function () {
  it('Zero seconds', function () {
    expect(istr(0)).to.equal('0s');
  });

  it('One second', function () {
    expect(istr(1)).to.equal('1s');
  });

  it('One minute', function () {
    expect(istr(60)).to.equal('1m');
  });

  it('One hour', function () {
    expect(istr(3600)).to.equal('1h');
  });

  it('One day', function () {
    expect(istr(86400)).to.equal('1d');
  });

  it('One day, one hour, one minute, one second', function () {
    expect(istr(86400 + 3600 + 60 + 1)).to.equal('1d, 1h, 1m, 1s');
  });
});
