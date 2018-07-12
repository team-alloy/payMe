require('dotenv').config();
const router = require('express').Router();
const path = require('path');

const staticFile = path.join(`${__dirname}/../client/dist/index.html`);
const faker = require('faker');
const db = require('../database/index.js');

const utils = require('./services/utils.js');
const userController = require('./controllers/user');
const companyController = require('./controllers/company');
const roleController = require('./controllers/role');
const milestoneController = require('./controllers/milestone');
const applicationController = require('./controllers/application');
const offerController = require('./controllers/offer');
const searchController = require('./controllers/search');

const AccessToken = require('twilio').jwt.AccessToken;

const VideoGrant = AccessToken.VideoGrant;

let currentSession,
  techCache;

setInterval(() => {
  console.log(techCache, '109381029');
}, 5200);

setInterval(() => {
  console.log(techCache, '109381029');
  searchController.getAllTechStack().then((tech) => {
    techCache = tech;
  });
}, 5000);

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
      companyController
        .getCompanyById({ id })
        .then((company) => {
          if (!company.length) {
            throw ('No records found for this company');
          }
          const { id } = company[0];
          return roleController
            .getRolesForCompany({ company_id: id })
            .then((roles) => {
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
      companyController
        .getCompanyByName({ name })
        .then((company) => {
          if (!company.length) {
            throw ('No records found for this company');
          }
          const { id } = company[0];
          return roleController
            .getRolesForCompany({ company_id: id })
            .then((roles) => {
              company[0].roles = roles;
              return company;
            });
        }).then((company) => {
          res.json(company);
        }).catch((err) => {
          res.status(404).json({ error: err });
        });
    } else {
      companyController
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
  if (!Object.keys(req.query).length) {
    roleController.getRoles()
      .then((roles) => {
        Promise.all(roles).then((roles) => {
          res.status(200).json(roles);
        });
      });
  } else {
    roleController.getAppliedRoles(req.query)
      .then((roles) => {
        res.status(200).json(roles);
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
    applicationController.getAllApplications(req.query).then((applications) => {
      Promise.all(applications).then((applications) => {
        res.json(applications);
      });
    });
  })
  .post((req, res) => { // req.body.offer
    const {
      company, role, city, state,
    } = req.body;

    if (company === '' || role === '' || city === '' || state === '') {
      res.status(400).json(new Error('company, role, city, and state are required fields'));
    } else {
      applicationController.saveNewApplication(req.body).then((app) => {
        Promise.all(app).then((app) => {
          res.status(200).json(app);
        }).catch(err => res.status(400).json(err));
      });
    }
  })
  .patch((req, res) => {
    applicationController.updateApplication(req).then(application => applicationController.getAllApplications({ id: application[0].id }).then(app => Promise.all(app).then(app => res.status(201).json(app))));
  })
  .delete((req, res) => {
    applicationController.deleteApplication(req.query)
    .then((data) => {
      res.json(data);
    });
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
    const check = utils.isLoggedIn(currentSession);
    if (check && !check.error) {
      if (!req.query) {
        userController.findAllUsers()
          .then(users => res.status(200).json(users))
          .catch(err => res.status(400).json(err));
      } else {
        userController.findOneUser(req.query)
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
      userController.findOneUser({ id })
        .then(user => userController.updateAccountInformation(user[0].id, req.body, user[0].hash))
        .then((response) => {
          if (response instanceof Error) {
            throw response;
          }
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
        .catch(err => res.status(404).json(err));
    } else {
      res.status(404).json({ error: 'User is needed' });
    }
  })
  .delete((req, res) => {
    if (!req.query) {
      res.status(400).json({ error: 'must provide username' });
    } else {
      userController.deleteUser(req.query).then((response) => {
        res.status(200).json({ message: 'user was deleted from database' });
      });
    }
  });

router.route('/api/signup')
  .post((req, res) => {
    if (!req.body.email) {
      res.status(404).json({ error: 'An account needs an email' });
    } else if (!req.body.pass) {
      res.status(404).json({ error: 'An account needs a password' });
    } else {
      userController.signUpNewUser(req.body)
        .then((newUser) => {
          if (newUser instanceof Error) {
            throw newUser;
          }
          res.status(200).json({ message: 'user created' });
        })
        .catch((err) => {
          console.error(err);
          res.status(404).json(err);
        });
    }
  });

router.route('/api/login')
  .post((req, res) => {
    if (!req.body.email) {
      res.status(400).json({ error: 'email must be provided' });
    } else if (!req.body.password) {
      res.status(400).json({ error: 'password must be provided' });
    } else {
      userController.checkCredentials(req).then((session) => {
        currentSession = session;
        if (session.user.active_role) {
          roleController.getRoles({ id: currentSession.user.active_role }).then((role) => {
            Promise.all(role).then((role) => {
              currentSession.user.active_role = role;
              res.status(200).json(currentSession);
            });
          });
        } else {
          session.active_role === null ? session.active_role = [] : undefined;
          currentSession = session;
          res.status(200).json(currentSession);
        }
        // res.status(200).json(role);
      // res.status(200).send(currentSession);
      })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ error: err });
        });
    }
  });

router.route('/api/logout')
  .get((req, res) => {
    currentSession = req.session.destroy((err) => {
      if (err) {
        res.status(400).json(err);
      } else {
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
    if (req.query) { // for get request use ? after endpoint url
      milestoneController.findAllMilestones(req.query)
        .then((milestones) => {
          res.status(200).json(milestones);
        })
        .catch(err => res.status(400).json(err));
    } else {
      milestoneController.findAllMilestones()
        .then((milestones) => {
          res.status(200).json(milestones);
        })
        .catch(err => res.status(400).json(err));
    }
  })
  .post((req, res) => {
    const {
      name, description, tech_used, repo_link,
    } = req.body;
    if (!req.body.user_id) {
      res.status(404).json({ error: 'An account needs a user_id' });
    }
    if (name === '' || description === '' || tech_used === '' || repo_link === '') {
      res.status(400).json(new Error('name, description, tech_used, and repo_link cannot be empty!'))
    } else {
      milestoneController.insertMilestone(req.body)
        .then((milestones) => {
          res.status(200).json('milestone inserted');
        })
        .catch(err => res.status(404).json({ error: err.sqlMessage }));
    }
  })
  .patch((req, res) => {
    milestoneController.updateMilestone(req.body.id, req.body)
      .then((milestones) => {
        res.status(200).json('success!');
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  })
  .delete((req, res) => {
    milestoneController.deleteMilestone(req.query)
    .then((data) => {
      res.status(200).json('success!');
    })
    .catch((err) => {
      res.status(404).json(err);
    })
  })

router.route('/api/offers').post((req, res) => {
  console.log(req.body, 'inOffers');
  offerController.addOffer(req.body)
    .then((offers) => {
      res.status(200).json(offers);
    })
    .catch((err) => {
      console.log(err, 'ERROR');
      res.status(404).json(err);
    });
}).patch((req, res) => {
  offerController.updateOffer(req)
    .then((offers) => {
      res.status(200).json(offers);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
}).get((req, res) => {
  offerController.getOffers(req.query)
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

router.route('/api/search').get((req, res) => {
  const l = Object.keys(req.query).length;
  if (req.query.cities && l <= 1) {
    searchController.getCities().then((cities) => {
      res.status(200).json(cities);
    });
  } else if (req.query.states && l <= 1) {
    searchController.getStates().then((states) => {
      res.status(200).json(states);
    });
  } else if (req.query.roles && l <= 1) {
    searchController.getRoles().then((roles) => {
      res.status(200).json(roles);
    });
  } else if (l >= 1 && !(req.query.cities || req.query.states || req.query.roles)) {
    let {
      state, city, role, company,
    } = req.query;
    const params = {};
    state = state ? params.state = state : null;
    city = city ? params.city = city : null;
    role = role ? params.role = role : null;
    company = company ? params.company = company : null;

    searchController.calculateAvgSalary(params).then((salary) => {
      console.log(techCache);
      const response = salary;
      response.tech = techCache;
      if (params.company) {
        return response;
      }
      res.status(200).json(searchResults);
    })
      .then((searchResults) => {
        console.log(searchResults);
        searchController.deduceBenefits(params.company).then((results) => {
          searchResults.benefits = results;
          // Object.assign({}, salary, {techReccomendations: techCache});
          console.log(searchResults, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');
          res.status(200).json(searchResults);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } else {
    throw new Error('Unable to make search happen, we are sorry.');
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
  const identity = faker.name.findName();

  // Create access token, signed and returned to client containing grant
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID || require('../config').twilio.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY || require('../config').twilio.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET || require('../config').twilio.TWILIO_API_SECRET,
  );

  // Assign generated identity to token
  token.identity = identity;

  const grant = new VideoGrant();
  // Grant token access to the video API features
  token.addGrant(grant);

  // Serialize token to JWT string and include JSON response
  res.json({
    identity,
    token: token.toJwt(),
  });
});

router.route('/rooms').get((req, res) => {
  const accountSid = require('../config').twilio.TWILIO_ACCOUNT_SID;
  const authToken = require('../config').twilio.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const rooms = [];
  client.video.rooms.each({ status: 'in-progress' }, (room) => {
    rooms.push(room.uniqueName);
    // console.log('ROOMS HERE!! ', rooms);
  });
  setTimeout(() => {
    res.status(200).json(rooms);
  }, 500);
});

// End Twilio


router.route('/test').get((req, res) => {
  searchController.deduceBenefits(req.query);
});

router.route('/*').get((req, res) => {
  res.status(200).sendFile(staticFile);
});

module.exports = router;
