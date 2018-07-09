const utils = require('./utils');

describe("isLoggedIn", () => {
  const currentSession = {
    user : true
  }

  test("should return true if user is present in session", (done) => {
    expect(utils.isLoggedIn(currentSession)).toBe(true);
    done();
  })
});