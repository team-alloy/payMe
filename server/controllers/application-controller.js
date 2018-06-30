const db = require('../../database/index.js');

const role_controller = require('./role-controller.js');
const user_controller = require('./user-controller.js');
const company_controller = require('./company-controller.js');


const capitalizeWords = (array) => {
  let words = array;
  words = words.toLowerCase().split(' ');
  words = words.map(word => word[0].toUpperCase().concat(word.substr(1))).join(' ');
  return words;
};

const fillUsersName = applications => applications.map(app => user_controller
  .getFullNameById({ id: app.user_id }).then((user) => {
  app.user = `${user[0].first_name} ${user[0].last_name}`;
  return app;
}));

const fillRole = applications => Promise.all(applications).then(applications => applications.map(app => role_controller.getRoles({ id: app.role_id }).then(role => Promise.all(role).then((role) => {
  app.role = role[0];
  return app;
}))));

const updateRole = (query, role, company, salary) => role_controller.updateRole(query, role, company, salary);

const updateLocation = (query, location) => db.knex('applications').where(query).update({ location }).then(updated => updated);

module.exports = {
  getAllApplications: (query) => {
    if (query) {
      return db.knex('applications').where(query)
        .then(applications => fillUsersName(applications)).then(applications => fillRole(applications))
        .then(applications => applications);
    }
    return db.knex('applications')
      .then(applications => fillUsersName(applications)).then(applications => fillRole(applications)).then(applications => applications);
  },
  saveNewApplication: (values) => {
    // making sure grammar is correct.
    const name = capitalizeWords(values.company);
    const role = capitalizeWords(values.role);
    const loc = capitalizeWords(values.location);
    const salary = Number(values.salary) === NaN ? 0 : values.salary;

    // get the company information
    return company_controller.getCompanyByName({ name })
      .then((company) => {
      // if it does not exist
        if (!company.length) {
        // create new company
          return company_controller.saveNewCompany({ name }).then(id =>
          // return index of company
            Promise.all(id).then(id => id[0]));
        }
        return company;
      })
      .then((company) => {
        company = typeof company === 'object' ? company[0].id : company;
        return role_controller.saveNewRole({ name: role, company_id: company, salary })
          .then(roleIndex => db.knex('applications')
            .insert({ user_id: values.user_id, role_id: roleIndex[0], location: loc }));
      })
      .then(application => db.knex('applications').select().where({ id: application[0] })
        .then(application => fillUsersName(application))
        .then(application => fillRole(application)))
      .then(application => application);
  },
  updateApplication: (params) => {
    console.warn(params);
    let {
      location, company, salary, role,
    } = params.body;
    const { id } = params.query;
    location = capitalizeWords(location);
    company = capitalizeWords(company);
    role = capitalizeWords(role);
    salary = isNaN(salary) === NaN ? 0 : salary;

    return db.knex('applications').where({ id }).then((application) => {
      application[0].location !== location ? updateLocation({ id: application[0].id }, location) : undefined;
      updateRole({ id: application[0].role_id }, role, company, salary);
      return application;
    }).then(application => application);
  },
};

