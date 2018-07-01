const db = require('../../database/index');

module.exports = {
  getCities: () => {
    return db.knex('applications').distinct('city', 'state').groupBy('state', 'city').select();
  },
  getStates: () => {
    return db.knex('applications').distinct('state').select();
  },
  getRoles: () => {
    return db.knex('roles').distinct('name').select();
  }
};