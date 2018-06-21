
exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name', 100);
    table.string('last_name', 100);
    table.string('email', 200);
    table.string('username', 100);
    table.string('hash', 200);

    table.unique('username');
    table.unique('email');
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};