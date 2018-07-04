const db = require('../../database/index.js');

const companyController = require('./company');

module.exports = {
  getRoles: (query) => {
    if (!query) {
      return db.knex.select()
        .from('roles').then(roles => roles.map(role => companyController
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
        roles = roles.map(role => companyController
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
    companyController.getCompanyByName({ name: companyName })
      .then((company) => {
        if (!company.length) {
          return companyController.saveNewCompany({ name: companyName })
            .then(id => Promise.all(id).then(id => id[0]));
        }
        return company[0].id;
      })
      .then(company => db.knex('roles').where(query).update({ name: role, company_id: company, salary })
      .then(updated => updated));
  },
  getAppliedRoles: query => db.knex('applications').where({ user_id: query.user_id })
    .then(apps => apps.map(app => app.role_id))
    .then(roleIds => db.knex('roles').whereIn('id', roleIds))
    .then(roles => roles.map(role => companyController.getCompanyById({ id: role.company_id })
      .then((company) => {
        role.company = company[0];
        return role;
      })))
    .then(roles => Promise.all(roles).then(roles => roles))
    .then(roles => roles),
  updateRoleWithoutCompanyName: query => {
    const {id, name, salary, company_id} = query;
    return db.knex('roles').where({id}).update({name, salary, company_id}).then(updated => updated);
  }

};
