const db = require('../../database/index');

module.exports = {
  getCities: () => {
    return db.knex('applications').distinct('city').select();
  },
  getStates: () => {
    return db.knex('applications').distinct('state').select();
  }
};