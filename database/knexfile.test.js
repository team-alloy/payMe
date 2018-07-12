/* eslint no-undef: 0, no-unused-vars: 0 */

const config = require('./knexfile');

const knex = require('knex')(require('./knexfile.js'));

describe('Test on knexfile.js', () => {
  test('config has the correct client type', () => {
    expect(config.client).toBe('mysql');
  });

  test('knexfile requires you to have at lease these four keys in it\'s export: host, user, password, database', () => {
    expect(config.connection.host).toBeDefined();
    expect(config.connection.user).toBeDefined();
    expect(config.connection.password).toBeDefined();
    expect(config.connection.database).toBeDefined();
  });
});
