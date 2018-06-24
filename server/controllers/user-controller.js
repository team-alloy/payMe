const db = require('../../database/index.js');

module.exports = {
  findAllUsers: () => {
    return db.knex.select().from('users');
  },
  findOneUser: (query) => {
    return db.knex.select().from('users').where(query);
  },
  signUpNewUser: (userInfo) => {
    console.log(userInfo, 'woot');
    let query = {};

    // make a query object with what values are passed in.
    userInfo.first_name ? query.first_name = userInfo.first_name : undefined;
    userInfo.last_name ? query.last_name = userInfo.last_name : undefined;
    userInfo.email ? query.email = userInfo.email : undefined;
    userInfo.username ? query.username = userInfo.username : undefined;
    // bcrypt this hash
    userInfo.hash ? query.hash = userInfo.hash : undefined;
    userInfo.current_salary ? query.current_salary = userInfo.current_salary : undefined;

    console.log(query);
    return db.knex('users')
      .insert(query).catch(err => {
          throw err;
      });
  }
}; //end exports