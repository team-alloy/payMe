const db = require('../../database/index.js');

const role_controller = require('./role-controller.js');
const user_controller = require('./user-controller.js');
const company_controller = require('./company-controller.js');

module.exports = {
  getAllApplications: (query) => {
    if(query) {
      return db.knex('applications').where(query)
      .then(applications => {
        return fillUsersName(applications);
      }).then(applications => {
        return fillRole(applications);
      }).then(applications => {
        return applications;
      });
    } else {
      return db.knex('applications')
      .then(applications => {
        return fillUsersName(applications);
      }).then(applications => {
        return fillRole(applications);
      }).then(applications => {
        return applications;
      });
    }
  },
  saveNewApplication: (values) => {
    // making sure grammar is correct.
    let name = capitalizeWords(values.company);
    let role = capitalizeWords(values.role);
    let loc = capitalizeWords(values.location);

    return company_controller.getCompanyByName({ name: name})
    .then(company => {
      if(!company.length) {
        //create new company if one does not exist
        company[0] = company_controller.saveNewCompany({ name: name }).then(id => {
          return Promise.all(id).then(id => id[0]);
        });
      }
       return role_controller.saveNewRole({name: role, company_id: company[0].id})
       .then(roleIndex => {
        return db.knex('applications')
        .insert({user_id: values.user_id, role_id: roleIndex[0], location: loc});
      })
    })
    .then(application => {
      return db.knex('applications').select().where({id: application[0]})
      .then(application => {
        return fillUsersName(application);
      })
      .then(application => {
        return fillRole(application);
      });
    }).then(application => application);
  },
  updateApplication: (params) => {
    console.warn(params)
    let {id, location, company, salary, role, role_id} = params;

    location = capitalizeWords(location);
    company = capitalizeWords(company);
    role = capitalizeWords(role);

    return db.knex('applications').where({id: id}).then(application => {
      console.log(application, location);

      application[0].location !== location ? updateLocation({id: application[0].id}, location, company) : undefined;
      role_id ? updateRole({id: role_id}, role) : undefined;
      return application;
    }).then(application => {
      console.log('final', application)
    });
  }
}

// let query = {};
// query.user_id = values.user_id;

var capitalizeWords = (words) => {
  words = words.toLowerCase().split(' ');
  words = words.map(word => {
    return word[0].toUpperCase().concat(word.substr(1));
  }).join(' ');
  return words;
}

const fillUsersName = (applications) => {
  return applications.map(app => {
    return user_controller.getFullNameById({ id: app.user_id }).then(user => {
      app.user = user[0].first_name + ' ' + user[0].last_name;
      delete app.user_id;
      // console.log(app, 'changing user name ')
      return app;
    });
  });
}

const fillRole = (applications) => {
  return Promise.all(applications).then(applications => {
    return applications.map(app => {
      return role_controller.getRoles({ id: app.role_id }).then(role => {
        return Promise.all(role).then(role => {
          app.role = role[0];
          return app;
        });
      });
    });
  });
}

const updateRole = (query, role) => {
  return role_controller.updateRole(query, role);
};

const updateLocation = (query, location) => {
  return db.knex('applications').where(query).update({location: location}).then(updated => updated);
}