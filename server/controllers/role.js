const db = require('../../database/index.js');

const companyController = require('./company');

module.exports = {
  getRoles: (query) => {
    if (!query) {
      // get all roles in the database then find the company by id
      // and insert it's information into the record before returning it
      return db.knex.select()
        .from('roles').then(roles => roles.map(role => companyController
          .getCompanyById({ id: role.company_id })
          .then((company) => {
            role.company = company[0];
            return role;
          }))).then(roles => roles);
    }
    // get specific roles and populate company information into record object
    // before returning
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

  // gets all the roles a company has in our database
  getRolesForCompany: query => db.knex.select('name')
    .from('roles')
    .groupBy('name')
    .avg('salary as avg_salary')
    .where(query),
  saveNewRole: params => db.knex('roles').insert(params),
  updateRole: (query, role, companyName, salary) => {
    // to update a role we need to make sure that the user did not change the company on us
    // if they did then we should also change the company on the role
    companyController.getCompanyByName({ name: companyName })
      .then((company) => {
        if (!company.length) {
          // if the company does not exist, make a record for a new one
          return companyController.saveNewCompany({ name: companyName })
            .then(id => Promise.all(id).then(id => id[0]));
        }
        // return the company id, this is really all we care about.
        return company[0].id;
      })
      // then we can finally update the role
      .then(company => db.knex('roles').where(query).update({ name: role, company_id: company, salary })
      // and return the number or records updated (should always be 1 unless we are doing a mass change.)
        .then(updated => updated));
  },
  // get all the roles that a user has applied for
  getAppliedRoles: query => db.knex('applications').where({ user_id: query.user_id })
    // first find the applications with the appropriate user_id
    // then map over them extracting the role_id
    .then(apps => apps.map(app => app.role_id))
    // then search for each of those roles
    .then(roleIds => db.knex('roles').whereIn('id', roleIds))
    // and populate the company information into the record object
    .then(roles => roles.map(role => companyController.getCompanyById({ id: role.company_id })
      .then((company) => {
        role.company = company[0];
        return role;
      })))
      // for some reason, we get an array of promises, so we use Promise.all to resolve all of them
    .then(roles => Promise.all(roles).then(roles => roles))
    .then(roles => roles),
  updateRoleWithoutCompanyName: (query) => {
    const {
      id, name, salary, company_id,
    } = query;
    return db.knex('roles').where({ id }).update({ name, salary, company_id }).then(updated => updated);
  },

};
