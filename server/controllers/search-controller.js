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
  },
  calculateAvgSalary: (query) => {

    if(query.city || query.state){
      console.log(query.city, query.state);
      // find the company id from the company name
      if(query.company) {
        return db.knex('companies').where({ name: query.company })
          .then(company => Object.assign({}, { query: query, company: company[0], }))
          .then(source => {
            return db.knex('roles').select().where({ name: source.query.role, company_id: source.company.id })
              .then(roles => Object.assign({}, source, {
                roles: roles.map(role => {
                  return { id: role.id, salary: role.salary, name: role.name };
                })
              }))
          })
          .then(source => {
            let roleIds = source.roles.map(role => role.id);
            return db.knex('applications').where({ state: source.query.state, city: source.query.city }).whereIn('role_id', roleIds).then(apps => {
              const findSalary = (id) => {
                for (var i = 0; i < source.roles.length; i++) {
                  if (source.roles[i].id === id) {
                    return source.roles[i].salary;
                  }
                }
              };
              return apps.map(app => {
                return Object.assign({}, app, {
                  salary: findSalary(app.role_id),
                  company: source.company.name,
                  role: source.roles[0].name
                });
              })
            })
          })
          .then(source => {
            console.log(source);
            let avgSalary = source.reduce((accumulator, app) => {
              return accumulator + app.salary;
            }, 0) / source.length;
            return Object.assign({}, {
              avgSalary: Number(avgSalary).toFixed(2),
              numberOfApplications: source.length,
              city: source[0].city,
              state: source[0].state,
              company: source[0].company,
              role: source[0].role
            });
          })
      } else {
        return db.knex('roles').select().where({ name: query.role})
        .then(roles => Object.assign({}, query, {
          roles: roles
        }))

        .then(source => {
          console.log(source, 'woooooo');

          let companyIds = [];

          source.roles.forEach(role => {
            if(!companyIds.includes(role.company_id)) {
              companyIds.push(role.company_id);
            }
          });
          companyIds.forEach((id, index) => {
            return db.knex('companies').where({ id }).then(company => companyIds[index] = company[0].name);
          })
          let roleIds = source.roles.map( role => {
            return role.id;
          })
          console.log(companyIds, roleIds);
          return Object.assign({}, source, {roleIds : roleIds},  {
            companies:  companyIds
          })
        })
        .then(source => {
          console.log(source, 'salary')
          return db.knex('applications').where({ state: source.state, city: source.city}).whereIn('role_id', source.roleIds).then(apps => {
            const findSalary = (id) => {
              for (var i = 0; i < source.roles.length; i++) {
                if (source.roles[i].id === id) {
                  console.log(source.roles[i].salary, source.roles[i]);

                  return source.roles[i].salary;
                }
              }
            };

            return Object.assign({}, {
              apps: apps.map(app => {
                return Object.assign({}, app, {
                  salary: findSalary(app.role_id),
                  role: source.roles[0].name
                })})},{companies: source.companies});
          })
        })
        .then(source => {
          console.log(source);
          let avgSalary = source.apps.reduce((accumulator, app) => {
            return accumulator + app.salary;
          }, 0) / source.apps.length;
          return Object.assign({}, {
            avgSalary: Number(avgSalary).toFixed(2),
            numberOfApplications: source.apps.length,
            city: source.apps[0].city,
            state: source.apps[0].state,
            companies: source.companies,
            role: source.apps[0].role
          });
        })
      }
    } else if(query.company || query.role) {
      console.log(query, 'ᕙ(⇀‸↼‶)ᕗ');
      if(query.company) {

      } else {

      }
    } else {
      throw new Error('You need to pass in a city, state, role,, or company');
    }
  }
};
