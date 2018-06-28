const bookshelf = require('../index.js');

module.exports = bookshelf.Model.extend({
  tableName: 'users',
});
