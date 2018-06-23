const bookshelf = require('../index.js');

const Cat = require('./cats.js');

module.exports = bookshelf.Model.extend({
  tableName: 'users',
  cats: function() {
    return this.hasMany('Cat');
  }
});

