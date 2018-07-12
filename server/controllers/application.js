/* eslint  no-nested-ternary:0 camelcase:0 */
const db = require('../../database/index.js');

const roleController = require('./role');
const userControllerr = require('./user');
const companyController = require('./company');

/*
  Capitalizes the first letter in every word
*/
const capitalizeWords = (array) => {
  let words = array;
  words = words.toLowerCase().split(' ');
  words = words.map(word => word[0].toUpperCase().concat(word.substr(1))).join(' ');
  return words;
};

/*
  this function will use the user id to find their full name and add it on to an object with the key user
*/
const fillUsersName = applications => applications.map(app => userControllerr
  .getFullNameById({ id: app.user_id })
  .then(user => Object.assign({}, app, { user: `${user[0].first_name} ${user[0].last_name}` })));

  /*
  This function will fill in the role for any application based off it's role_id
  */
const fillRole = applications => Promise.all(applications)
  .then(apps => apps.map(app => roleController.getRoles({ id: app.role_id })
    .then(role => Promise.all(role).then((selectedRole) => {
      const [chosenRole] = selectedRole;
      return Object.assign({}, app, { role: chosenRole });
    }))));

/*
    The following two functions will update a role or location when the user changes
    either of them.
*/
const updateRole = (query, role, company, salary) => roleController
  .updateRole(query, role, company, salary);

const updateLocation = (query, city, state) => db.knex('applications').where(query)
  .update({ city, state }).then(updated => updated);

module.exports = {
  getAllApplications: (query) => {
    // gets all applications based off a query
    // ex) { id: 1}, {active_role: 1}, ... look at schema for possible queries
    if (query) {
      return db.knex('applications').where(query).orderBy('created_at', 'desc')
        .then(applications => fillUsersName(applications))
        .then(applications => fillRole(applications))
        .then(applications => applications);
    }

    // gets all applications in db
    return db.knex('applications')
      .then(applications => fillUsersName(applications))
      .then(applications => fillRole(applications))
      .then(applications => applications);
  },
  saveNewApplication: (values) => {
    // making sure grammar is correct.
    const name = capitalizeWords(values.company);
    const role = capitalizeWords(values.role);
    const city = capitalizeWords(values.city);

    // states have all caps, max two chars
    const state = values.state.toUpperCase();
    const salary = Number.isNaN(values.salary) ? 0 : values.salary;
    const accepted = values.accepted !== undefined ? values.accepted === 1 ? 1 : 0 : 0;

    // no date provided? default to now.
    const application_date = values.application_date || new Date().toLocaleDateString();
    let user_id;
    // checks to see if a user_id (essential for searching) was provided
    if (values.user_id) {
      user_id = values.user_id;
    } else {
      throw new Error('User_id is needed to make an application');
    }

    // get the company information
    return companyController.getCompanyByName({ name })
      .then((company) => {
      // if it does not exist
        if (!company.length) {
        // create new company
          return companyController.saveNewCompany({ name }).then(id =>
          // return index of company
            Promise.all(id).then(id => id[0]));
        }
        return company;
      })
      .then((company) => {
        // check to see if you got an object or an id. Either way, you want the company id
        const currentCompany = typeof company === 'object' ? company[0].id : company;
        // Creates a new role and places the appropriate company id the inserts
        // that information as a new application
        return roleController.saveNewRole({ name: role, company_id: currentCompany, salary })
          .then(roleIndex => db.knex('applications')
            .insert({
              user_id, role_id: roleIndex[0], city, state, accepted, application_date,
            }));
        // then below we are returning the actual application record
      })
      .then(application => db.knex('applications').select().where({ id: application[0] })
        .then(application => fillUsersName(application))
        .then(application => fillRole(application)))
      .then(application => application);
  },
  updateApplication: (params) => {
    // The function updates the applications in the database
    // it destructures the parameters so we we can correct the capitalization
    let {
      city, state, company, salary, role, accepted,
    } = params.body;
    const { id } = params.query;
    city = capitalizeWords(city);
    state = state.toUpperCase();
    company = capitalizeWords(company);
    role = capitalizeWords(role);

    // if they didn't provide a salary we default to 0
    salary = isNaN(salary) === true ? 0 : salary;

    if (!id) {
      // if no id was provided for the application, we cannot search for it,
      // so throw an error
      throw new Error('Application Id is needed as a query after the endpoints');
    }

    return db.knex('applications').where({ id }).then((application) => {
      // compare city and state, if they are not the same update the location
      (application[0].city !== city || application[0].state !== state) ?
        updateLocation({ id: application[0].id }, city, state) : undefined;
        // update the role regardless.
      updateRole({ id: application[0].role_id }, role, company, salary);

      if (!accepted) {
        accepted = application[0].accepted;
      }

      // send both the application and the accepted variables to the next then
      const result = { application, accepted };
      return result;
      // below: update the application accepted state then return that application
    }).then(results => db.knex('applications').where({ id: results.application[0].id }).update({ accepted: results.accepted })
      .then(() => db.knex('applications').where({ id: results.application[0].id })));
  },
  deleteApplication: (query) => {
    return db.knex('offers').where('application_id', query.id).del()
    .then(data => db.knex('applications').where('id', query.id).del())
  }
};

