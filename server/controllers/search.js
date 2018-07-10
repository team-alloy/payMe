const db = require('../../database/index');

const companyController = require('./company');
const roleController = require('./role');

const orderTechs = (unordered) => {
  const ordered = {};
  let count = 0;
  Object.keys(unordered).sort((a, b) => unordered[a] - unordered[b])
    .reverse().slice(0, 10)
    .forEach((tech) => {
      ordered[tech] = unordered[tech];
      count++;
    });
  return ordered;
};

module.exports = {
  getCities: () => db.knex('applications').distinct('city', 'state').groupBy('state', 'city').select(),
  getStates: () => db.knex('applications').distinct('state').select(),
  // consolidate the two above to one function
  getRoles: () => db.knex('roles').distinct('name').select(),
  calculateAvgSalary: (query) => {
    if (query.city || query.state) {
      // find the company id from the company name
      if (query.company) {
        return db.knex('companies').where({ name: query.company })
          .then(company => Object.assign({}, { query, company: company[0] }))
          .then(source => db.knex('roles').select().where({ name: source.query.role, company_id: source.company.id })
            .then(roles => Object.assign({}, source, {
              roles: roles.map(role => ({ id: role.id, salary: role.salary, name: role.name })),
            })))
          .then((source) => {
            const roleIds = source.roles.map(role => role.id);
            return db.knex('applications').where({ state: source.query.state, city: source.query.city }).whereIn('role_id', roleIds).then((apps) => {
              const findSalary = (id) => {
                for (let i = 0; i < source.roles.length; i++) {
                  if (source.roles[i].id === id) {
                    return source.roles[i].salary;
                  }
                }
              };

              return apps.map(app => Object.assign({}, app, {
                salary: findSalary(app.role_id),
                company: source.company.name,
                role: source.roles[0].name,
              }));
            });
          })
          .then((source) => {
            if (!source.length) {
              throw ('No results found  because we currently do not have enough data. Either add an application to start off this company at this location or come back later.');
            }
            const avgSalary = source.reduce((accumulator, app) => accumulator + app.salary, 0) / source.length;
            return Object.assign({}, {
              avgSalary: Number(avgSalary).toFixed(2),
              numberOfApplications: source.length,
              city: source[0].city,
              state: source[0].state,
              company: source[0].company,
              role: source[0].role,
            });
          })
          .catch(err => err);
      }
      return db.knex('roles').select().where({ name: query.role })
        .then(roles => Object.assign({}, query, {
          roles,
        }))

        .then((source) => {
          const companyIds = [];

          source.roles.forEach((role) => {
            if (!companyIds.includes(role.company_id)) {
              companyIds.push(role.company_id);
            }
          });
          companyIds.forEach((id, index) => db.knex('companies').where({ id }).then(company => companyIds[index] = company[0].name));
          const roleIds = source.roles.map(role => role.id);
          return Object.assign({}, source, { roleIds }, {
            companies: companyIds,
          });
        })
        .then((source) => {
          console.log(source, 'salary');
          return db.knex('applications').where({ state: source.state, city: source.city }).whereIn('role_id', source.roleIds).then((apps) => {
            const findSalary = (id) => {
              for (let i = 0; i < source.roles.length; i++) {
                if (source.roles[i].id === id) {
                  return source.roles[i].salary;
                }
              }
            };

            return Object.assign({}, {
              apps: apps.map(app => Object.assign({}, app, {
                salary: findSalary(app.role_id),
                role: source.roles[0].name,
              })),
            }, { companies: source.companies });
          });
        })
        .then((source) => {
          const avgSalary = source.apps.reduce((accumulator, app) => accumulator + app.salary, 0) / source.apps.length;
          return Object.assign({}, {
            avgSalary: Number(avgSalary).toFixed(2),
            numberOfApplications: source.apps.length,
            city: source.apps[0].city,
            state: source.apps[0].state,
            companies: source.companies,
            role: source.apps[0].role,
          });
        });
    } else if (query.company || query.role) {
      console.log(query, 'ᕙ(⇀‸↼‶)ᕗ');
      if (query.company) {
        if (query.role) {
          return db.knex('companies').where({ name: query.company })
            .then(company => Object.assign({}, query, { company: company[0] }))
            .then(source => db.knex('roles').where({ name: source.role, company_id: source.company.id })
              .then((roles) => {
                const roleIds = roles.map(role => role.id);

                const avgSalary = roles.reduce((accumulator, role) => accumulator + role.salary, 0) / roles.length;
                return Object.assign({}, source, { roles, roleIds, avgSalary: Number(avgSalary).toFixed(2) });
              }))
            .then(source => Object.assign({}, source, {
              locations: db.knex('applications').whereIn('role_id', source.roleIds).distinct('city', 'state').then(apps => apps.map(app => [app.city, app.state])),
            }))
            .then(source => source);
        }
        return db.knex('companies').where({ name: query.company }).then((company) => {

        });
      }
    }
  },
  getAllTechStack: () => db.knex('milestones').then((milestones) => {
    let techs = milestones.map(milestone => milestone.tech_used.split(' ').map(x => (x.includes(',') ? x.substring(0, x.indexOf(',')) : x)));
    techs = techs.reduce((techCache, currentTech) => {
      currentTech.forEach((tech) => {
        if (tech === '') { return; }
        if (!techCache[tech]) {
          techCache[tech.trim()] = 1;
        } else {
          techCache[tech.trim()]++;
        }
      });
      return techCache;
    }, {});
    console.table(orderTechs(techs));
    return orderTechs(techs);
  })
    // .then(reccomendations => reccomendations)
    .catch(err => err),
  deduceBenefits: company => companyController.getCompanyByName({ name: company })
    .then((company) => {
      console.table(company);
      return company[0].id;
    })
    .then(companyId => roleController.getRoles({ company_id: companyId }))
    .then(roles => Promise.all(roles))
    .then((roles) => {
      const roleIds = roles.map(role => role.id);
      return db.knex('applications').whereIn('role_id', roleIds);
    })
    .then((apps) => {
      const appIds = apps.map(app => app.id);
      return db.knex('offers').whereIn('application_id', appIds);
    })
    .then((offers) => {
      console.log(offers);
      return offers.reduce((packageOptions, currentOffer) => {
        console.log(currentOffer);
        if (currentOffer.hasPTO) {
          packageOptions.hasPTO = 'This company offers paid time off, negotiating this could give you longer paid vacations.';
        }
        if (currentOffer.hasRetirement) {
          packageOptions.hasRetirement = "This company has offered it's employees in the past a retirement package. If you are towards the end of your career, negotiating this could help you get better benefits for your retirement needs.";
        }
        if (currentOffer.coversRelocation) {
          packageOptions.coversRelocation = "This company has covered relocation for it's employees in the past. Any money helps, getting hired sometimes means a big move. Negotiate these cost with your company to see if they can be given to you.";
        }
        if (currentOffer.hasHealthBenefits) {
          packageOptions.hasHealthBenefits = 'This company offers health benefits, ask about the different options available.';
        }
        return packageOptions;
      }, {});
    })
    .then(results => results)
    .catch(err => err),
};
