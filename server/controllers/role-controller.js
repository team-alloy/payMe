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
       console.warn('SOMETHING IS WRONG HERE AND I SHOULD COME BACK TO IT ');
       // new companys have a update bug
       if(!company.length) {
         return company_controller.saveNewCompany({name: companyName}).then(id => {
           console.log('between woot', id);
           return Promise.all(id).then(id => id[0]);
         })
       } else {
         return company[0].id;
       }
    }).then(company => {
      console.log('i got this ', company)
      return db.knex('roles').where(query).update({ name: role, company_id: company, salary: salary })
        .then(updated => updated);
    });
  },

}