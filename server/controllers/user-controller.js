const db = require('../../database/index.js');

module.exports = {
  findAllUsers: () => {
    return db.knex.select().from('users');
  },
  findOneUser: (query) => {
    return db.knex.select().from('users').where(query);
  },
  signUpNewUser: (userInfo) => {
    return db.knex('users')
      .insert(userInfo);
  },
  getFullNameById: (query) => {
    return db.knex.select('first_name', 'last_name').from('users').where(query);
  }
}; //end exports

