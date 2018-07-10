const db = require('../../database/index.js');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const roleController = require('./role');

const capitalizeWords = (words) => {
  words = words.toLowerCase().split(' ');
  words = words.map(word => word[0].toUpperCase().concat(word.substr(1))).join(' ');
  return words;
};

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

module.exports = {
  findAllUsers: () => db.knex.select().from('users'),
  findOneUser: query => db.knex.select().from('users').where(query),
  signUpNewUser: (userInfo) => {
    let {
      first_name, last_name, email, pass,
    } = userInfo;

    first_name = first_name ? capitalizeWords(first_name) : null;
    last_name = last_name ? capitalizeWords(last_name) : null;

    return bcrypt.hash(pass, saltRounds).then((hash) => {
      pass = hash;
      console.log('pass is ', pass);
      return pass;
    })
      .then(() => db.knex('users').where({ email }))
      .then((user) => {
        if (user.length) {
          throw new Error('Email is in use');
        }
        return db.knex('users')
          .insert({
            first_name, last_name, email, hash: pass,
          });
      })
      .catch((err) => {
        throw err;
      });

    /* db.knex('users')
      .insert({
        first_name, last_name, email, hash: pass,
      }) */
  },
  getFullNameById: query => db.knex.select('first_name', 'last_name').from('users').where(query),
  updateAccountInformation: (id, query, currentPassword) => {
    const {
      first_name, last_name, newPassword, email, current_salary, active_role, old_password, profile_pic,
    } = query;
    let updatedUser = {};

    return db.knex('users').where({ id })
      // first let's do something with the password and email
      // we do the email because it's what identifies the user in the real world.
      // to change either of these fields we need a password
      .then((user) => {
        updatedUser = user[0];
        if (old_password) {
          return bcrypt.compare(old_password.toString(), currentPassword.toString()).catch((err) => {
            throw err;
          });
        }
        return false;
      }).then((correctPassword) => {
        // the password is correct and the user wants to update their password
        if (!correctPassword && (email || newPassword)) {
          throw new Error('Wrong password');
        }
        if (correctPassword && newPassword) {
          if (email) {
            return hashPassword(newPassword).then((hash) => {
              updatedUser.hash = hash;
              updatedUser.email = email;
              return updatedUser;
            });
          }
          return hashPassword(newPassword).then((hash) => {
            updatedUser.hash = hash;
            return updatedUser;
          });
        } else if (correctPassword && email) {
          updatedUser.email = email;
          return updatedUser;
        }
        return updatedUser;
      })
      .then((user) => {
        // first_name, last_name, active_role are left at this point
        // these variables do not require a password
        if (first_name) {
          updatedUser.first_name = capitalizeWords(first_name);
        }
        if (last_name) {
          updatedUser.last_name = capitalizeWords(last_name);
        }
        if (profile_pic !== updatedUser.profile_pic && profile_pic !== '') {
          updatedUser.profile_pic = profile_pic;
        }
        return updatedUser;
      })
      .then((user) => {
        // these varaibles are realated to the active role and current salary
        if (active_role) {
          return roleController.getRoles({ id: active_role }).then(role => Promise.all(role).then((role) => {
            if (role.length < 1) {
              throw new Error('No roles selected');
            }
            const [queriedRole] = role;

            // if (isNaN(current_salary) || current_salary === '') {
            //   current_salary = queriedRole.salary;
            // }
            updatedUser.active_role = queriedRole.id;
            // queriedRole.salary = current_salary;
            updatedUser.current_salary = queriedRole.salary;
          }).catch(err => err)).catch(err => err);
        }
        return updatedUser;
      })
      .then((updatedRolesCount) => {
        if (updatedRolesCount < 1) {
          throw new Error('Something happend to the role nothing was updated according to our logic');
        }
        // finally after all the check and updates of other document we can update the user stuf f
        delete updatedUser.id;
        return db.knex('users').where({ id }).update(updatedUser).then(updated => updated);
      })
      .catch(err => err);
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
        }).catch(err => err);
      }).catch(err => err);
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
      }).catch(err => err);
    }
    throw ('username or email is required');
  },
  deleteUser: query => db.knex('users').where(query).del(),
}; // end exports
