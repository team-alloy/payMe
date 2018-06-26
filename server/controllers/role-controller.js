const db = require('../../database/index.js');

const company_controller = require('./company-controller.js');

module.exports = {
  getRoles: (query) => {
    if(!query) {
      return db.knex.select()
      .from('roles').then(roles => {
        roles = roles.map(role => {
          return company_controller
            .getCompanyById({ id: role.company_id })
            .then(company => {
              role.company = company[0];
              return role;
            });
        });
        return roles;
      }).then(roles => roles);
    } else {
      return db.knex.select()
      .from('roles')
      .where(query)
      .then(roles => {
        roles = roles.map(role => {
          return company_controller
            .getCompanyById({ id: role.company_id })
            .then(company => {
              role.company = company[0];
              return role;
            });
        });
        return roles;
      }).then(roles => roles);
    }
  },
  getRolesForCompany: (query) => {
    console.log('getRolesForCompany', query)
    return db.knex.select('name')
    .from('roles')
    .groupBy('name')
    .avg('salary as avg_salary')
    .where(query);
  },
  saveNewRole: (params) => {
    return db.knex('roles').insert(params);
  },
  updateRole: (query, role, companyName, salary) => {
     company_controller.getCompanyByName({ name: companyName})
     .then(company => {
       if(!company.length) {
         company[0] = company_controller.saveNewCompany({name: companyName}).then(id => {
           return Promise.all(id).then(id => id[0]);
         })
       }
      return db.knex('roles').where(query).update({name: role, company_id: company[0].id, salary: salary})
      .then(updated => updated);
    });
  },

}