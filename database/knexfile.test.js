const knex = require('./knexfile');

test('knexfile has the correct client type', () => {
  expect( knex.client).toBe('mysql');
});

test('knexfile requires you to have at lease these four keys in it\'s export: host, user, password, database', () => {
  expect(knex.connection.host).toBeDefined();
  expect(knex.connection.user).toBeDefined();
  expect(knex.connection.password).toBeDefined();
  expect(knex.connection.database).toBeDefined();
});
