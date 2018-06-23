const bookshelf = require('../index.js');

const User = require('./users.js');

var Cat = bookshelf.Model.extend({
  tableName: 'cats',
  owner: function() {
    return this.belongsTo('User');
  }
});

module.exports = Cat;