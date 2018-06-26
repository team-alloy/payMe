const db = require('../../database/index.js');

module.exports = {
  getCompanies: () => {
    return db.knex.select().from('companies');
  },
  getCompanyById: (query) => {
    return db.knex.select().from('companies').where(query);
  },
  getCompanyByName: (query) => {
    return db.knex.select().from('companies').where(query);
  },
  saveNewCompany: (params) => {
    return db.knex('companies').insert(params);
  }
}; //end export
