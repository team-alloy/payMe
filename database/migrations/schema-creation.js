
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('companies', (table) => {
    table.increments('id').primary().notNullable();
    table.string('name', 100).notNullable().unique();
  }),
  knex.schema.createTable('roles', (table) => {
    table.increments('id').primary().notNullable();
    table.string('name', 100).notNullable();
    table.integer('salary');
    table.integer('company_id').unsigned().references('id').inTable('companies')
      .notNullable();
  }),
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary().notNullable();
    table.string('first_name', 100);
    table.string('last_name', 100);
    table.string('profile_pic', 1000);
    table.string('email', 200).unique('email').notNullable();
    table.string('username', 100).unique('username').notNullable();
    table.string('hash', 200).notNullable();
    table.integer('current_salary');
    table.integer('active_role');
    table.timestamp('created_at', true).notNullable();
  }),
  knex.schema.createTable('applications', (table) => {
    table.increments('id').primary().notNullable();
    table.integer('user_id').unsigned().references('id').inTable('users')
      .notNullable();
    table.integer('role_id').unsigned().references('id').inTable('roles')
      .notNullable();
    table.string('city', 100);
    table.string('state', 2);
    table.boolean('accepted');
    table.string('created_at', 100);
  }),
  knex.schema.createTable('offers', (table) => {
    table.increments('id').primary().notNullable();
    table.integer('application_id').unsigned().references('id').inTable('applications')
      .notNullable();
    table.integer('base_salary').notNullable();
    table.boolean('hasHealthBenefits');
    table.boolean('hasPTO');
    table.boolean('hasRetirement');
    table.boolean('coversRelocation');
    table.boolean('acceptedOffer');
  }),
  knex.schema.createTable('milestones', (table) => {
    table.increments('id').primary().notNullable();
    table.integer('user_id').unsigned().references('id').inTable('users')
      .notNullable();
    table.string('name', 100).notNullable();
    table.string('description', 1000).notNullable();
    table.string('repo_link', 200);
    table.string('goals', 1000)
    table.string('tech_used', 300);
    table.string('created_at', 100);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('milestones'),
  knex.schema.dropTable('offers'),
  knex.schema.dropTable('applications'),
  knex.schema.dropTable('users'),
  knex.schema.dropTable('roles'),
  knex.schema.dropTable('companies'),
]);
