const db = require('../../database/index.js');

const company_controller = require('./company-controller.js');

module.exports = {
  getRoles: (query) => {
    if (!query) {
      return db.knex.select()
        .from('roles').then(roles => roles.map(role => company_controller
          .getCompanyById({ id: role.company_id })
          .then((company) => {
            role.company = company[0];
            return role;
          }))).then(roles => roles);
    }
    return db.knex.select()
      .from('roles')
      .where(query)
      .then((roles) => {
        roles = roles.map(role => company_controller
          .getCompanyById({ id: role.company_id })
          .then((company) => {
            role.company = company[0];
            return role;
          }));
        return roles;
      })
      .then(roles => roles);
  },
  getRolesForCompany: query => db.knex.select('name')
    .from('roles')
    .groupBy('name')
    .avg('salary as avg_salary')
    .where(query),
  saveNewRole: params => db.knex('roles').insert(params),
  updateRole: (query, role, companyName, salary) => {
    company_controller.getCompanyByName({ name: companyName })
      .then((company) => {
        if (!company.length) {
          return company_controller.saveNewCompany({ name: companyName })
            .then(id => Promise.all(id).then(id => id[0]));
        }
        return company[0].id;
      }).then(company => db.knex('roles').where(query).update({ name: role, company_id: company, salary })
        .then(updated => updated));
  },

};
