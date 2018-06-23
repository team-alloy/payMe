const bookshelf = require('../index.js');

var User = bookshelf.Model.extend({
  tableName: 'users',
});

module.exports = User;