const db = require('../../database/index.js');

module.exports = {
  getRoles: () => {
    return db.knex.select().from('roles');
  }
}