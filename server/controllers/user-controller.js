const db = require('../../database/index.js');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const role_controller = require('./role-controller.js');

const capitalizeWords = (words) => {
  words = words.toLowerCase().split(' ');
  words = words.map(word => word[0].toUpperCase().concat(word.substr(1))).join(' ');
  return words;
};

module.exports = {
  findAllUsers: () => db.knex.select().from('users'),
  findOneUser: query =>
    // update this to return forms and previous applications as arrays
    // or take care of it on the front end with GET request
    db.knex.select().from('users').where(query),
  signUpNewUser: (userInfo) => {
    let {
      first_name, last_name, email, pass, username,
    } = userInfo;


    first_name = first_name ? capitalizeWords(first_name) : null;
    last_name = last_name ? capitalizeWords(last_name) : null;
    return bcrypt.hash(pass, saltRounds).then(pass => db.knex('users')
      .insert({
        first_name, last_name, email, hash: pass, username,
      }));
  },
  getFullNameById: query => db.knex.select('first_name', 'last_name').from('users').where(query),
  updateAccountInformation: (id, query, password) => {
    let {
      first_name, last_name, pass, email, current_salary, active_role, old_password,
    } = query;
    return db.knex('users').where({ id })
      .then(() => { // user is available here
        if (pass) {
          return bcrypt.compare(old_password, password)
            .then((res) => {
              if (res) {
                // console.log('correct pass');
                // make new hash
                return bcrypt.hash(pass, saltRounds).then((pass) => {
                  active_role = Number.isNaN(active_role) ? null : active_role;
                  if (active_role) {
                    // console.log(active_role, 'active');
                    return role_controller.getRoles({ id: active_role })
                      .then((roles) => {
                        // console.log('roles recieved', roles);
                        if (roles[0]) {
                          return Promise.all(roles).then((roles) => {
                            current_salary = Number.isNaN(current_salary) ? null
                              : current_salary === roles[0].salary ? roles[0].salary
                                : current_salary;
                            // console.log('$$$$', current_salary);
                            return db.knex('roles').where({ id: roles[0].id })
                              .update({ name: roles[0].name, salary: current_salary })
                              .then(() => roles[0].id);
                          }).then((roleIndex) => {
                            // console.log('role updated, about to update user');
                            first_name = first_name ? capitalizeWords(first_name) : null;
                            last_name = last_name ? capitalizeWords(last_name) : null;
                            return db.knex('users').where({ id }).update({
                              first_name,
                              last_name,
                              hash: pass,
                              current_salary,
                              active_role: roleIndex,
                              email,
                            });
                          });
                        }
                        throw new Error('You need to make an application first');
                      });
                  }
                  // console.log('no active_role');
                  const message = {};
                  if (current_salary !== null && current_salary !== undefined) {
                    message.error = 'Current salary was not update. You must make an application for that role before you claim that you make that much.';
                  }
                  message.message = 'Account updated succesfully. Check to see if there are errors in this object';
                  first_name = first_name ? capitalizeWords(first_name) : null;
                  last_name = last_name ? capitalizeWords(last_name) : null;

                  return db.knex('users').where({ id }).update({
                    first_name,
                    last_name,
                    hash: pass,
                    email,
                  }).then(() => message);
                });
              }
              throw ('wrong password');
            }).catch((err) => {
              throw ('wrong password');
            });
        }
        // console.log('no pass');

        active_role = Number.isNaN(active_role) ? null : active_role;
        if (active_role) {
          // console.log(active_role, 'active', 'no pass');

          return role_controller.getRoles({ id: active_role })
            .then((roles) => {
              // console.log('roles recieved', 'no pass', roles);

              if (roles[0]) {
                return Promise.all(roles).then((roles) => {
                  current_salary = Number.isNaN(current_salary) ? roles[0].salary
                    : current_salary;
                  // console.log('$$$$', 'no pass', current_salary);

                  return db.knex('roles').where({ id: roles[0].id })
                    .update({ name: roles[0].name, salary: current_salary })
                    .then(() => roles[0].id);
                }).then((roleIndex) => {
                  // console.log('role updated, about to update user', 'no pass');
                  first_name = first_name ? capitalizeWords(first_name) : null;
                  last_name = last_name ? capitalizeWords(last_name) : null;
                  return db.knex('users').where({ id }).update({
                    first_name,
                    last_name,
                    current_salary,
                    active_role: roleIndex,
                    email,
                  });
                });
              }
              throw ('You need to make an application first');
            });
        }
        // console.log('no role, no pass');
        const message = {};
        if (current_salary !== null && current_salary !== undefined) {
          message.error = 'Current salary was not update. You must make an application for that role before you claim that you make that much.';
        }
        message.message = 'Account updated succesfully. Check to see if there are errors in this object';
        first_name = first_name ? capitalizeWords(first_name) : null;
        last_name = last_name ? capitalizeWords(last_name) : null;

        return db.knex('users').where({ id }).update({
          first_name,
          last_name,
          email,
        }).then(() => message);
      }).catch(() => {
        throw ('wrong password');
      });
  },
  checkCredentials: (query) => {
    if (query.body.email) {
      return db.knex('users').where({ email: query.body.email }).then((user) => {
        if (!user.length) {
          throw ('email does not exist');
        }
        return bcrypt.compare(query.body.password, user[0].hash).then((res) => {
          if (res) {
            const session = query.session.regenerate(() => {
              session.user = user[0];
              return session;
            });
            return session;
            // create session and return it.
          }
          throw ('wrong password');
        });
      });
    } else if (query.body.username) {
      return db.knex('users').where({ username: query.body.username }).then((user) => {
        if (!user.length) {
          throw ('username does not exist');
        }
        return bcrypt.compare(query.body.password, user[0].hash).then((res) => {
          if (res) {
            const session = query.session.regenerate(() => {

            });
            session.user = user[0];
            return session;
            // create session and return it.
          }
          throw ('wrong password');
        });
      });
    }
    throw ('username or email is required');
  },
  deleteUser: query => db.knex('users').where(query).del(),
}; // end exports