const db = require('../../database/index.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const role_controller = require('./role-controller.js');
module.exports = {
  findAllUsers: () => {
    return db.knex.select().from('users');
  },
  findOneUser: (query) => {
    // update this to return forms and previous applications as arrays
    // or take care of it on the front end with GET request
    return db.knex.select().from('users').where(query);
  },
  signUpNewUser: (userInfo) => {
    let {first_name, last_name, email, hash, username} = userInfo;

    first_name = capitalizeWords(first_name);
    last_name = capitalizeWords(last_name);
    return bcrypt.hash(hash, saltRounds).then(hash => {
      console.log('secret ', hash)
      return db.knex('users')
        .insert({first_name: first_name, last_name: last_name, email: email, hash:hash, username: username});
    });
  },
  getFullNameById: (query) => {
    return db.knex.select('first_name', 'last_name').from('users').where(query);
  },
  updateAccountInformation: (id, query, password) => {
    let { first_name, last_name, hash, current_salary, active_role, old_password} = query;

    active_role = isNaN(active_role) ? null : active_role;

    return role_controller.getRoles({id: active_role})
    .then(roles => {
      return Promise.all(roles).then(roles => {
        if(!roles.length) {
          throw ('Please make an application for your current position, it helps our record be more accurate');
        } else {
          current_salary = isNaN(current_salary) ? roles[0].salary : current_salary;

          return db.knex('roles').where({ id: roles[0].id })
          .update({ salary: current_salary }).then(() => {
            return db.knex('roles').where({id: roles[0].id}).then((role) => {
              first_name =  capitalizeWords(first_name);
              last_name = capitalizeWords(last_name);
              return old_password !== '' ? bcrypt.compare(old_password, password).then(res => {
                if(res) {
                  return bcrypt.hash(hash, saltRounds).then( hash => {
                    return db.knex('users').where({ id: id })
                      .update({
                        first_name: first_name,
                        last_name: last_name,
                        hash: hash,
                        current_salary: role[0].salary,
                        active_role: role[0].id
                      })
                      .then(user => user);
                  });
                } else {
                  throw ('Nothing was updated because you provided the incorrect password');
                }
              }) : db.knex('users').where({ id: id })
                    .update({
                      first_name: first_name,
                      last_name: last_name,
                      current_salary: role[0].salary,
                      active_role: role[0].id
                    })
                    .then(user => user);;
            });
          });
        }
      })
    }).catch(err => console.error(err));
  },
  checkCredentials: (query) => {
    if(query.body.email) {
      return db.knex('users').where({email: query.body.email}).then( user => {
        if (!user.length) {
          throw ('email does not exist');
        }
        return bcrypt.compare(query.body.password, user[0].hash).then( res => {
          if(res) {
            let session = query.session.regenerate( () => {
              return;
            });
            session.user = user[0];
            console.log(session);
            return session;
            // create session and return it.
          } else {
            throw ('wrong password');
          }
        })
      });
    } else if(query.body.username) {
      return db.knex('users').where({username: query.body.username}).then( user => {
        if(!user.length) {
          throw ('username does not exist');
        }
        return bcrypt.compare(query.body.password, user[0].hash).then(res => {
          if (res) {
            let session = query.session.regenerate(() => {
              return;
            });
            session.user = user[0];
            console.log(session);
            return session;
            // create session and return it.
          } else {
            throw ('wrong password');
          }
        })
      })
    } else {
      throw ('username or email is required');
    }
  }
}; //end exports

var capitalizeWords = (words) => {
  words = words.toLowerCase().split(' ');
  words = words.map(word => {
    return word[0].toUpperCase().concat(word.substr(1));
  }).join(' ');
  return words;
}