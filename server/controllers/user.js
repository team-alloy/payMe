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
  updateAccountInformation: (id, query, currentPassword) => {
    let {
      first_name, last_name, newPassword, email, current_salary, active_role, old_password,
    } = query;
    let updatedUser = {};

    return db.knex('users').where({id})
      // first let's do something with the password and email
      // we do the email because it's what identifies the user in the real world.
      // to change either of these fields we need a password
      .then( user => {
        if(old_password) {
          [updatedUser] = user;
          return bcrypt.compare(old_password, currentPassword);
        }
        return false;
      }).then(correctPassword => {
        // the password is correct and the user wants to update their password
        if(correctPassword && newPassword) {
          console.log('password was correct', correctPassword);

          if(email) {
            return hashPassword(newPassword).then(hash => {
              updatedUser.hash = hash;
              updatedUser.email = email;
              return updatedUser;
            })
          } else {
            return hashPassword(newPassword).then(hash => {
              updatedUser.hash = hash;
              return updatedUser;
            });
          }
        } else if (correctPassword && email) {
          updatedUser.email = email;
          return updatedUser;
        }
        return updatedUser;
      })
      .then(user => {
        // first_name, last_name, active_role are left at this point
        // these variables do not require a password
        if(first_name) {
          updatedUser.first_name = capitalizeWords(first_name);
        }
        if(last_name) {
          updatedUser.last_name = capitalizeWords(last_name);
        }
        return updatedUser;
      })
      .then(user => {
        // these varaibles are realated to the active role and current salary
        if(active_role){
          return roleController.getRoles({ id : active_role}).then(role => {
            return Promise.all(role).then(role => {
              if(role.length < 1) {
                throw new Error('No roles selected')
              }
              let [queriedRole] = role;

              if (isNaN(current_salary) || current_salary === '') {
                current_salary = queriedRole.salary;
              }

              if(queriedRole.salary !== current_salary) {
                queriedRole.salary = current_salary;
                updatedUser.current_salary = current_salary;
                updatedUser.active_role = queriedRole.id;
                return roleController.updateRoleWithoutCompanyName(queriedRole);
              }
            }).catch(err => err);
          }).catch(err => err);
        }
        return updatedUser;
      })
      .then(updatedRolesCount => {
        if(updatedRolesCount < 1) {
          throw new Error('Something happend to the role nothing was updated according to our logic');
        }
        // finally after all the check and updates of other document we can update the user stuf f
        delete updatedUser.id;
        console.log(updatedUser, '123456');
        return db.knex('users').where({id}).update(updatedUser).then(updated => updated);
      })
      .catch(err => err)
    // return db.knex('users').where({ id })
    //   .then(() => { // user is available here
    //     if (pass) {
    //       return bcrypt.compare(old_password, password)
    //         .then((res) => {
    //           if (res) {
    //             console.log('correct pass');
    //             // make new hash
    //             return bcrypt.hash(pass, saltRounds).then((pass) => {
    //               active_role = Number.isNaN(active_role) ? null : active_role;
    //               if (active_role) {
    //                 console.log(active_role, 'active');
    //                 return roleController.getRoles({ id: active_role })
    //                   .then((roles) => {
    //                     console.log('roles recieved', roles);
    //                     if (roles[0]) {
    //                       return Promise.all(roles).then((roles) => {
    //                         current_salary = Number.isNaN(current_salary) ? null
    //                           : current_salary === roles[0].salary ? roles[0].salary
    //                             : current_salary;
    //                         console.log('$$$$', current_salary);
    //                         return db.knex('roles').where({ id: roles[0].id })
    //                           .update({ name: roles[0].name, salary: current_salary })
    //                           .then(() => roles[0].id);
    //                       }).then((roleIndex) => {
    //                         console.log('role updated, about to update user');
    //                         first_name = first_name ? capitalizeWords(first_name) : null;
    //                         last_name = last_name ? capitalizeWords(last_name) : null;
    //                         return db.knex('users').where({ id }).update({
    //                           first_name,
    //                           last_name,
    //                           hash: pass,
    //                           current_salary,
    //                           active_role: roleIndex,
    //                           email,
    //                         });
    //                       });
    //                     }
    //                     throw new Error('You need to make an application first');
    //                   });
    //               }
    //               console.log('no active_role');
    //               const message = {};
    //               if (current_salary !== null && current_salary !== undefined) {
    //                 message.error = 'Current salary was not update. You must make an application for that role before you claim that you make that much.';
    //               }
    //               message.message = 'Account updated succesfully. Check to see if there are errors in this object';
    //               first_name = first_name ? capitalizeWords(first_name) : null;
    //               last_name = last_name ? capitalizeWords(last_name) : null;

    //               return db.knex('users').where({ id }).update({
    //                 first_name,
    //                 last_name,
    //                 hash: pass,
    //                 email,
    //               }).then(() => message);
    //             });
    //           }
    //           throw ('wrong password');
    //         }).catch((err) => {
    //           throw ('wrong password');
    //         });
    //     }
    //     console.log('no pass');

    //     active_role = Number.isNaN(active_role) ? null : active_role;
    //     if (active_role) {
    //       console.log(active_role, 'active', 'no pass');

    //       return roleController.getRoles({ id: active_role })
    //         .then((roles) => {
    //           console.log('roles recieved', 'no pass', roles);

    //           if (roles[0]) {
    //             return Promise.all(roles).then((roles) => {
    //               if (isNaN(current_salary)) {
    //                 current_salary = roles[0].salary;
    //               }
    //               console.log('$$$$', 'no pass', current_salary);

    //               return db.knex('roles').where({ id: roles[0].id })
    //                 .update({ name: roles[0].name, salary: current_salary })
    //                 .then(() => roles[0].id);
    //             }).then((roleIndex) => {
    //               console.log('role updated, about to update user', 'no pass');
    //               first_name = first_name ? capitalizeWords(first_name) : null;
    //               last_name = last_name ? capitalizeWords(last_name) : null;
    //               return db.knex('users').where({ id }).update({
    //                 first_name,
    //                 last_name,
    //                 current_salary,
    //                 active_role: roleIndex,
    //                 email,
    //               });
    //             });
    //           }
    //           throw ('You need to make an application first');
    //         });
    //     }
    //     console.log('no role, no pass');
    //     const message = {};
    //     if (current_salary !== null && current_salary !== undefined) {
    //       message.error = 'Current salary was not update. You must make an application for that role before you claim that you make that much.';
    //     }
    //     message.message = 'Account updated succesfully. Check to see if there are errors in this object';
    //     first_name = first_name ? capitalizeWords(first_name) : null;
    //     last_name = last_name ? capitalizeWords(last_name) : null;

    //     return db.knex('users').where({ id }).update({
    //       first_name,
    //       last_name,
    //       email,
    //     }).then(() => message);
    //   }).catch(() => {
    //     throw ('wrong password');
    //   });
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
