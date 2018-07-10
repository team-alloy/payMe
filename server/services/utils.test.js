const utils = require('./utils');

describe('isLoggedIn', () => {
  test('should return true if user is present in session', (done) => {
    expect(utils.isLoggedIn({ user: true })).toBe(true);
    done();
  });

  test('should return an error if user is not present in session', (done) => {
    expect(() => {
      utils.isLoggedIn();
    }).toThrowError();
    done();
  });
});
