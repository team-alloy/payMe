require('dotenv').config();
const router = require('express').Router();
const path = require('path');

const staticFile = path.join(`${__dirname}/../client/dist/index.html`);
const faker = require('faker');
const db = require('../database/index.js');

const utils = require('./services/utils.js');
const user_controller = require('./controllers/user-controller.js');
const company_controller = require('./controllers/company-controller.js');
const role_controller = require('./controllers/role-controller.js');
const milestone_controller = require('./controllers/milestone-controller.js');
const application_controller = require('./controllers/application-controller.js');
const offer_controller = require('./controllers/offer-controller.js');
const search_controller = require('./controllers/search-controller.js');

const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

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

*/

router.route('/api/companies')
  .get((req, res) => {
  // make it work with names too.
    if (req.query.id) {
      const { id } = req.query;
      company_controller
        .getCompanyById({ id })
        .then((company) => {
          if (!company.length) {
            throw ('No records found for this company');
          }
          const { id } = company[0];
          return role_controller
            .getRolesForCompany({ company_id: id })
            .then((roles) => {
              console.log('!!!!!!!!!!!1', roles);
              company[0].roles = roles;
              return company;
            });
        }).then((company) => {
          res.json(company);
        }).catch((err) => {
          res.status(404).json({ error: err });
        });
    } else if (req.query.name) {
      let { name } = req.query;

      name = name.toLowerCase().split(' ').map(word => word[0].toUpperCase().concat(word.substr(1))).join(' ');
      company_controller
        .getCompanyByName({ name })
        .then((company) => {
          if (!company.length) {
            throw ('No records found for this company');
          }
          const { id } = company[0];
          return role_controller
            .getRolesForCompany({ company_id: id })
            .then((roles) => {
              console.log('!!!!!!!!!!!1', roles);
              company[0].roles = roles;
              return company;
            });
        }).then((company) => {
          res.json(company);
        }).catch((err) => {
          res.status(404).json({ error: err });
        });
    } else {
      company_controller
        .getCompanies()
        .then((companies) => {
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
router.route('/api/roles').get((req, res) => {
  if(!req.query){
    role_controller.getRoles()
    .then((roles) => {
      Promise.all(roles).then((roles) => {
        res.status(200).json(roles);
      });
    });
  } else {
    role_controller.getAppliedRoles(req.query)
    .then(roles => {
      console.log(roles);

      res.status(200).json(roles)
    })
    .catch(err => res.status(400).json(err));
  }
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
  console.log(req.query,'query at route');
  application_controller.getAllApplications(req.query).then(applications => {
    Promise.all(applications).then(applications => {
      console.log(applications,'res at route');
      res.json(applications);
    });
  });
})
.post((req, res) => {// req.body.offer
  application_controller.saveNewApplication(req.body).then(app => {
    Promise.all(app).then(app => {
      res.status(200).json(app);
    });
  });
})
  .patch((req, res) => {
    application_controller.updateApplication(req).then(application => application_controller.getAllApplications({ id: application[0].id }).then(app => Promise.all(app).then(app => res.status(201).json(app))));
  })
  .delete((req, res) => {
    res.json('delete/applications');
  });

/*

88       88 ,adPPYba,  ,adPPYba, 8b,dPPYba,
88       88 I8[    "" a8P_____88 88P'   "Y8
88       88  `"Y8ba,  8PP""""""" 88
"8a,   ,a88 aa    ]8I "8b,   ,aa 88
 `"YbbdP'Y8 `"YbbdP"'  `"Ybbd8"' 88

*/
router.route('/api/user')
  .get((req, res) => {
    const check = utils.isLoggedIn(currentSession, res);
    if (check && !check.error) {
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
    const {
      first_name,
      last_name,
      hash,
      current_salary,
      active_role,
    } = req.body;

    const { id } = req.query;

    if (req.query.id) {
      user_controller.findOneUser({ id })
        .then(user => user_controller.updateAccountInformation(user[0].id, req.body, user[0].hash))
        .then((response) => {
          if (!isNaN(response)) {
            if (response > 0) {
              res.status(201).json({ message: 'Account updated' });
            } else {
              res.status(200).json({ message: 'Account was not updated' });
            }
          } else {
            res.status(201).json(response);
          }
        })
        .catch(err => res.status(404).json({ error: err }));
    } else {
      res.status(404).json({ error: 'User is needed' });
    }
  })
  .delete((req, res) => {
    if (!req.query) {
      res.status(400).json({ error: 'must provide username' });
    } else {
      user_controller.deleteUser(req.query).then((response) => {
        res.status(200).json({ message: 'user was deleted from database' });
      });
    }
  });

router.route('/api/signup')
  .post((req, res) => {
    if (!req.body.email) {
      console.log(res.body);
      res.status(404).json({ error: 'An account needs an email' });
    }
    if (!req.body.username) {
      res.status(404).json({ error: 'An account needs a username' });
    }
    if (!req.body.pass) {
      res.status(404).json({ error: 'An account needs a password' });
    }

    user_controller.signUpNewUser(req.body)
      .then((newUser) => {
        res.status(200).json({ message: 'user created' });
      })
      .catch((err) => {
        res.status(404).json({ error: err.sqlMessage });
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
      console.log(session);
      currentSession = session;
      role_controller.getRoles({id:currentSession.user.active_role}).then(role => {
        console.log(role);
        Promise.all(role).then(role => {
          currentSession.user.active_role = role;
          console.log(currentSession);
          res.status(200).json(currentSession);
        });
        // res.status(200).json(role);
      });
      // res.status(200).send(currentSession);
    })
      .catch(err => res.status(404).json({ error: err }));
  }
});

// router.route('/api/logout')
// .get((req, res) => {
//   console.log('hey', currentSession)
//   currentSession = req.session.destroy((err) => {
//     if(err) {
//       res.status(400).json(err);
//     } else {
//       user_controller.checkCredentials(req).then((session) => {
//         currentSession = session;
//         res.status(200).json(currentSession);
//       })
//       .catch(err => res.status(404).json({ error: err }));
//     }
//   });
// });

router.route('/api/logout')
  .get((req, res) => {
    console.log('hey', currentSession);
    currentSession = req.session.destroy((err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log(currentSession, '11111111');
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
      .catch(err => res.status(400).json(err));
  })
  .post((req, res) => {
    if (!req.body.user_id) {
      res.status(404).json({ error: 'An account needs a user_id' });
    }
    milestone_controller.insertMilestone(req.body)
      .then((milestones) => {
        res.status(200).json('milestone inserted');
      })
      .catch(err => res.status(404).json({ error: err.sqlMessage }));
  })
  .patch((req, res) => {
    milestone_controller.updateMilestone(req.body.id, req.body)
      .then((milestones) => {
        res.status(200).json('success!');
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

router.route('/api/offers').post((req, res) => {
  offer_controller.addOffer(req.body)
    .then((offers) => {
      res.status(200).json(offers);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
}).patch((req, res) => {
  offer_controller.updateOffer(req)
    .then((offers) => {
      res.status(200).json(offers);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
}).get((req, res) => {
  offer_controller.getOffers(req.query)
    .then((offers) => {
      res.status(200).json(offers);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

/*
                                                      88
                                                      88
                                                      88
,adPPYba,  ,adPPYba, ,adPPYYba, 8b,dPPYba,  ,adPPYba, 88,dPPYba,
I8[    "" a8P_____88 ""     `Y8 88P'   "Y8 a8"     "" 88P'    "8a
 `"Y8ba,  8PP""""""" ,adPPPPP88 88         8b         88       88
aa    ]8I "8b,   ,aa 88,    ,88 88         "8a,   ,aa 88       88
`"YbbdP"'  `"Ybbd8"' `"8bbdP"Y8 88          `"Ybbd8"' 88       88
*/

router.route('/api/search').get( (req, res) => {
  const l = Object.keys(req.query).length;
  console.log(req.query, l);
    if(req.query.cities && l <= 1) {
      console.log('ho');

      search_controller.getCities().then(cities => {
        res.status(200).json(cities);
      })
    } else if (req.query.states && l <= 1) {
       console.log('hey');

      search_controller.getStates().then(states => {
        res.status(200).json(states);
      })
    } else if (req.query.roles && l <= 1) {
      search_controller.getRoles().then(roles => {
        res.status(200).json(roles);
      })
    } else if(l >= 1 && !(req.query.cities || req.query.states || req.query.roles)) {
      let { state, city, role, company} = req.query;
      let params = {};
      state = state ? params.state = state: null;
      city = city ? params.city = city: null;
      role = role ? params.role = role: null;
      company = company ? params.company = company: null;
      console.log(params, 'is this correct??');

      search_controller.calculateAvgSalary(params).then(salary => {
        res.status(200).json(salary);
      });
    } else {
      throw new Error('Unable to make search happen, we are sorry.')
    }
});

/*

888888888888               88 88 88
     88                    "" 88 ""
     88                       88
     88 8b      db      d8 88 88 88  ,adPPYba,
     88 `8b    d88b    d8' 88 88 88 a8"     "8a
     88  `8b  d8'`8b  d8'  88 88 88 8b       d8
     88   `8bd8'  `8bd8'   88 88 88 "8a,   ,a8"
     88     YP      YP     88 88 88  `"YbbdP"'

*/

// Endpoint to generate access token for VIDEO
router.route('/token').get((req, res) => {
  // const identity = req.session.passport.user.profile.displayName;
  var identity = faker.name.findName();
  console.log('identity', identity)

  // Create access token, signed and returned to client containing grant
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID || require('../config').twilio.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY || require('../config').twilio.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET || require('../config').twilio.TWILIO_API_SECRET,
  );
  console.log('token', token)

  // Assign generated identity to token
  token.identity = identity;

  const grant = new VideoGrant();
  // Grant token access to the video API features
  token.addGrant(grant);

  // Serialize token to JWT string and include JSON response
  res.json({
    identity: identity,
    token: token.toJwt(),
  });
});

router.route('/*').get((req, res) => {
  res.status(200).sendFile(staticFile);
});

module.exports = router;
