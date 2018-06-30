const router = require('express').Router();
const path = require('path');
const staticFile = path.join(__dirname + '/../client/dist/index.html');
const db = require('../database/index.js');

const utils = require('./services/utils.js');
const user_controller = require('./controllers/user-controller.js');
const company_controller = require('./controllers/company-controller.js');
const role_controller = require('./controllers/role-controller.js');
const milestone_controller = require('./controllers/milestone-controller.js');
const application_controller = require('./controllers/application-controller.js');
const offer_controller = require('./controllers/offer-controller.js');

let currentSession;

/*

                                                                             88
                                                                             ""

 ,adPPYba,  ,adPPYba,  88,dPYba,,adPYba,  8b,dPPYba,  ,adPPYYba, 8b,dPPYba,  88  ,adPPYba, ,adPPYba,
a8"     "" a8"     "8a 88P'   "88"    "8a 88P'    "8a ""     `Y8 88P'   `"8a 88 a8P_____88 I8[    ""
8b         8b       d8 88      88      88 88       d8 ,adPPPPP88 88       88 88 8PP"""""""  `"Y8ba,
"8a,   ,aa "8a,   ,a8" 88      88      88 88b,   ,a8" 88,    ,88 88       88 88 "8b,   ,aa aa    ]8I
 `"Ybbd8"'  `"YbbdP"'  88      88      88 88`YbbdP"'  `"8bbdP"Y8 88       88 88  `"Ybbd8"' `"YbbdP"'
                                          88
                                          88

*/router.route('/api/companies')
.get((req, res) => {
  // make it work with names too.
  if (req.query.id) {
    let { id } = req.query;
    company_controller
      .getCompanyById({ id: id })
      .then(company => {
        if (!company.length) {
          throw ('No records found for this company');
        }
        let { id } = company[0];
        return role_controller
          .getRolesForCompany({ company_id: id })
          .then(roles => {
            console.log('!!!!!!!!!!!1', roles)
            company[0].roles = roles;
            return company;
          });
      }).then(company => {
        res.json(company);
      }).catch(err => {
        res.status(404).json({ error: err });
      });
  } else if(req.query.name) {
    let { name } = req.query;

    name = name.toLowerCase().split(' ').map(word => {
      return word[0].toUpperCase().concat(word.substr(1));
    }).join(' ');
    company_controller
      .getCompanyByName({ name: name })
      .then(company => {
        if (!company.length) {
          throw ('No records found for this company');
        }
        let { id } = company[0];
        return role_controller
          .getRolesForCompany({ company_id: id })
          .then(roles => {
            console.log('!!!!!!!!!!!1', roles)
            company[0].roles = roles;
            return company;
          });
      }).then(company => {
        res.json(company);
      }).catch(err => {
        res.status(404).json({ error: err });
      });
  } else {
    company_controller
      .getCompanies()
      .then(companies => {
        res.json(companies);
      });
  }
});

/*
                       88
                       88
                       88
8b,dPPYba,  ,adPPYba,  88  ,adPPYba, ,adPPYba,
88P'   "Y8 a8"     "8a 88 a8P_____88 I8[    ""
88         8b       d8 88 8PP"""""""  `"Y8ba,
88         "8a,   ,a8" 88 "8b,   ,aa aa    ]8I
88          `"YbbdP"'  88  `"Ybbd8"' `"YbbdP"'

*/
router.route('/roles').get((req, res) => {
  role_controller.getRoles()
  .then(roles => {
    Promise.all(roles).then(roles => {
      res.status(200).json(roles);
    });
  });
});

/*
                                  88 88                               88
                                   88 ""                         ,d    ""
                                   88                            88
,adPPYYba, 8b,dPPYba,  8b,dPPYba,  88 88  ,adPPYba, ,adPPYYba, MM88MMM 88  ,adPPYba,  8b,dPPYba,  ,adPPYba,
""     `Y8 88P'    "8a 88P'    "8a 88 88 a8"     "" ""     `Y8   88    88 a8"     "8a 88P'   `"8a I8[    ""
,adPPPPP88 88       d8 88       d8 88 88 8b         ,adPPPPP88   88    88 8b       d8 88       88  `"Y8ba,
88,    ,88 88b,   ,a8" 88b,   ,a8" 88 88 "8a,   ,aa 88,    ,88   88,   88 "8a,   ,a8" 88       88 aa    ]8I
`"8bbdP"Y8 88`YbbdP"'  88`YbbdP"'  88 88  `"Ybbd8"' `"8bbdP"Y8   "Y888 88  `"YbbdP"'  88       88 `"YbbdP"'
           88          88
           88          88
*/


router.route('/api/applications')
.get((req, res) => {
  application_controller.getAllApplications(req.query).then(applications => {
    Promise.all(applications).then(applications => res.json(applications))
  });
})
.post((req, res) => {// req.body.offer
  application_controller.saveNewApplication(req.body).then(app => {
    Promise.all(app).then(app => {
      res.status(200).json(app);
    })
  })
})
.patch((req, res) => {
  application_controller.updateApplication(req).then(application => {
    return application_controller.getAllApplications({id: application[0].id}).then(app => {
      return Promise.all(app).then(app => res.status(201).json(app));
    });
  });
})
.delete((req, res) => {
  res.json('delete/applications');
})

/*

88       88 ,adPPYba,  ,adPPYba, 8b,dPPYba,
88       88 I8[    "" a8P_____88 88P'   "Y8
88       88  `"Y8ba,  8PP""""""" 88
"8a,   ,a88 aa    ]8I "8b,   ,aa 88
 `"YbbdP'Y8 `"YbbdP"'  `"Ybbd8"' 88

*/
router.route('/api/user')
  .get((req, res) => {

    let check = utils.isLoggedIn(currentSession, res);
    if(check && !check.error) {
      if (!req.query) {
        user_controller.findAllUsers()
          .then(users => res.status(200).json(users))
          .catch(err => res.status(400).json(err));
      } else {
        user_controller.findOneUser(req.query)
          .then(user => res.status(200).json(user))
          .catch(err => res.status(400).json(err));
      }
    } else {
      res.status(400).json(check);
    }
  })
  .patch((req, res) => {
    let {
      first_name,
      last_name,
      hash,
      current_salary,
      active_role
    } = req.body;

    let {id} = req.query;

    if(req.query.id) {
      user_controller.findOneUser({ id })
      .then(user => { // we have the user information
        return user_controller.updateAccountInformation(user[0].id, req.body, user[0].hash);
      })
      .then(response => {
        if(!isNaN(response)) {
          if (response > 0) {
            res.status(201).json({ message: 'Account updated' });
          } else {
            res.status(200).json({ message: 'Account was not updated' });
          }
        } else {
          res.status(201).json(response)
        }
      })
      .catch(err => res.status(404).json({ error: err }));
    } else {
      res.status(404).json({error: 'User is needed'});
    }
  })
  .delete((req, res) => {
    if (!req.query) {
      res.status(400).json({error: 'must provide username'});
    } else {
      user_controller.deleteUser(req.query).then(response => {
        res.status(200).json({message:'user was deleted from database'});
      })
    }
  });
;

router.route('/api/signup')
.post((req, res) => {
  if(!req.body.email) {
    console.log(res.body)
    res.status(404).json({ error: 'An account needs an email'});
  }
  if(!req.body.username) {
    res.status(404).json({ error: 'An account needs a username'});
  }
  if(!req.body.pass) {
    res.status(404).json({ error: 'An account needs a password'});
  }

  user_controller.signUpNewUser(req.body)
  .then(newUser => {
    res.status(200).json({message: 'user created'})})
  .catch(err => {
    res.status(404).json({error: err.sqlMessage});
  });
});

router.route('/api/login')
.post( (req, res) => {
  if (!req.body.email ) {
    res.status(400).json({ error: 'email must be provided' });
  } else if (!req.body.password) {
    res.status(400).json({ error: 'password must be provided' });
  } else {
    user_controller.checkCredentials(req).then(session => {
      currentSession = session;
      res.status(200).send(currentSession);
    })
      .catch(err => res.status(404).json({ error: err }))
  }
})

router.route('/api/logout')
.get((req, res) => {
  console.log('hey', currentSession)
  currentSession = req.session.destroy((err) => {
    if(err) {
      res.status(400).json(err);
    } else {
      console.log(currentSession, '11111111')
      res.status(200).json({ message: 'Good Bye!', path: '/login' });
    }
  });

});
/*
                   88 88
                   "" 88                        ,d
                      88                        88
88,dPYba,,adPYba,  88 88  ,adPPYba, ,adPPYba, MM88MMM ,adPPYba,  8b,dPPYba,   ,adPPYba, ,adPPYba,
88P'   "88"    "8a 88 88 a8P_____88 I8[    ""   88   a8"     "8a 88P'   `"8a a8P_____88 I8[    ""
88      88      88 88 88 8PP"""""""  `"Y8ba,    88   8b       d8 88       88 8PP"""""""  `"Y8ba,
88      88      88 88 88 "8b,   ,aa aa    ]8I   88,  "8a,   ,a8" 88       88 "8b,   ,aa aa    ]8I
88      88      88 88 88  `"Ybbd8"' `"YbbdP"'   "Y888 `"YbbdP"'  88       88  `"Ybbd8"' `"YbbdP"'

*/
router.route('/api/milestones')
.get((req, res) => {
  milestone_controller.findAllMilestones()
  .then((milestones) => {
    res.status(200).json(milestones);
  })
  .catch((err) => res.status(400).json(err));
})
.post((req, res) => {
  if(!req.body.user_id) {
    res.status(404).json({ error: 'An account needs a user_id'});
  }
  milestone_controller.insertMilestone(req.body)
  .then((milestones) => {
    res.status(200).json('milestone inserted');
  })
  .catch((err) => res.status(404).json({error: err.sqlMessage}));
})
.patch((req, res) => {
  milestone_controller.updateMilestone(req.body.id, req.body)
  .then((milestones) => {
    res.status(200).json('success!')
  })
  .catch((err) => {
    res.status(404).json(err);
  })
});

router.route('/api/offers').post((req, res) => {
  offer_controller.addOffer(req.body)
  .then((offers) => {
    res.status(200).json(offers);
  })
  .catch((err) => {
    res.status(404).json(err);
  })
}).patch((req, res) => {
  offer_controller.updateOffer(req)
  .then((offers) => {
    res.status(200).json(offers);
  })
  .catch((err) => {
    res.status(404).json(err);
  })
}).get((req, res) => {
    offer_controller.getOffers(req.query)
    .then((offers) => {
      res.status(200).json(offers)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
  })


router.route('/*').get((req, res) => {
  res.status(200).sendFile(staticFile);
});

module.exports = router;

