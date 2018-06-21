const config = require('../config.js');

// database connection
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    debug: true
  }
});

// Model support
const bookshelf = require('bookshelf')(knex);

//Schemas
knex.schema.hasTable('tests').then(function(exists){
  if(!exists) {
    return knex.schema.createTable('tests', function(t){
      t.increments('id').primary();
      t.string('name', 100);
      t.string('about_me', 300);

    })
  }
});

var Test = bookshelf.Model.extend({
  tableName: 'tests'
});

module.exports = Test;