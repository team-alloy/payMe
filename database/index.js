// database connection
const knex = require('knex')(require('./knexfile.js'));
// Model support
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
