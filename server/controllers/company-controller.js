const db = require('../../database/index.js');

module.exports = {
  getCompanies: () => db.knex.select().from('companies'),
  getCompanyById: query => db.knex.select().from('companies').where(query),
  getCompanyByName: query => db.knex.select().from('companies').where(query),
  saveNewCompany: params => db.knex('companies').insert(params),
}; // end export
