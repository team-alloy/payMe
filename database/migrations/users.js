
exports.up = (knex, Promise) => {
  Promise.all([
     knex.schema.createTable('positions', (table) => {
      table.increments('id').primary();
      table.string('name', 100).unique('name');
     }),
     knex.schema.createTable('companies', (table) => {
      table.increments('id').primary();
      table.string('name', 100).unique('name');
     }),
     knex.schema.createTable('techs', (table) => {
      table.increments('id').primary();
      table.string('name', 100).unique('name');
     }),
     knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name', 100);
      table.string('last_name', 100);
      table.string('email', 200).unique('email');
      table.string('username', 100).unique('username');
      table.string('hash', 200);
      table.timestamps(true, true);
      table.float('current_salary', 2);
      table.integer('position_id').references('positions.id');
      table.integer('company_id').references('companies.id');
    }),

  ])
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};