
exports.up = (knex, Promise) => {
  return Promise.all([
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
    knex.schema.createTable('stages', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.integer('average_time');
    }),
    knex.schema.createTable('stage_times', (table) => {
      table.increments('id').primary();
      table.integer('stage_id')
      table.timestamp('start').defaultTo(knex.fn.now());
      table.timestamp('end').defaultTo(knex.fn.now());
      table.string('elapsed_time');
    }),
    knex.schema.createTable('stage_at_co', (table) => {
      table.increments('id').primary();
      table.integer('stage_id').unsigned().references('id').inTable('stages');
      table.integer('company_id').unsigned().references('id').inTable('companies');
    }),
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name', 100);
      table.string('last_name', 100);
      table.string('email', 200).unique('email').notNullable();
      table.string('username', 100).unique('username').notNullable();
      table.string('hash', 200).notNullable();
      table.timestamps(true, true);
      table.integer('current_salary');
      table.integer('company_id').unsigned().references('id').inTable('companies');
      table.integer('position_id').unsigned().references('id').inTable('positions');
    }),
    knex.schema.createTable('cats', (table) => {
      table.increments('id').primary();
      table.integer('owner_id').unsigned().references('id').inTable('users');
      table.string('name').notNullable();
    }),
    knex.schema.createTable('', (table) => {

    })


  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('techs'),
    knex.schema.dropTable('companies'),
    knex.schema.dropTable('positions'),


  ])
};