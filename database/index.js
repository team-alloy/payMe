// database connection
const knex = require('knex')(require('./knexfile.js'));
// Model support
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;
