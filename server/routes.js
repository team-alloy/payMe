const router = require('express').Router();
const path = require('path');
const staticFile = path.join(__dirname + '/../client/dist/index.html');
const db = require('../database/index.js');

const user_controller = require('./controllers/user-controller.js');
const company_controller = require('./controllers/company-controller.js');
const role_controller = require('./controllers/role-controller.js');
const milestone_controller = require('./controllers/milestone-controller.js');
const application_controller = require('./controllers/application-controller.js');


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
  if(req.query.id) {
    let {id} = req.query;
    company_controller
      .getCompanyById({ id: id})
      .then(company => {
        if(!company.length) {
          throw ('No records found for this company');
        }
        let {id} = company[0];
        return role_controller
          .getRolesForCompany({company_id: id})
          .then(roles => {
            company[0].roles = roles;
            // console.log('roles added? ', company);
            return company;
          });
      }).then(company => {
        res.json(company);
      }).catch(err => {
        res.status(404).json({error: err});
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
      // console.log('Promise.all', roles);
      // console.log(Object.keys(roles[0]))
      res.status(200).json(roles);
    });
  });
  // res.json('get/roles')
})
.post((req, res) => {
  res.json('post/roles');
})
.patch((req, res) => {
  res.json('post/roles');
})
.delete((req, res) => {
  res.json('post/roles');
})

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
.post((req, res) => {
  application_controller.saveNewApplication(req.body).then(app => {
    Promise.all(app).then(app => {
      res.status(200).json(app);
    })
  })
})
.patch((req, res) => {
  application_controller.updateApplication(req.body).then(application => {
    return application_controller.getAllApplications({id: application[0].id}).then(app => {
      return Promise.all(app).then(app => res.status(201).json(app));
    });
  });
})
.delete((req, res) => {
  res.json('delete/applications');
})

/*

88       88 ,adPPYba,  ,adPPYba, 8b,dPPYba, ,adPPYba,
88       88 I8[    "" a8P_____88 88P'   "Y8 I8[    ""
88       88  `"Y8ba,  8PP""""""" 88          `"Y8ba,
"8a,   ,a88 aa    ]8I "8b,   ,aa 88         aa    ]8I
 `"YbbdP'Y8 `"YbbdP"'  `"Ybbd8"' 88         `"YbbdP"'

*/
router.route('/api/user')
  .get( (req, res) => {
    user_controller.findAllUsers()
      .then(users => res.status(200).json(users))
      .catch(err => res.status(400).json(err));
  });

router.route('/api/signup')
.post( (req, res) => {

  if(!req.body.email) {
    res.status(404).json({ error: 'An account needs an email'});
  }
  if(!req.body.username) {
    res.status(404).json({ error: 'An account needs a username'});
  }
  if(!req.body.hash) {
    res.status(404).json({ error: 'An account needs a password'});
  }

  user_controller.signUpNewUser(req.body).then( newUser =>
    res.status(200).json('user created'))
    .catch(err => {
      res.status(404).json({error: err.sqlMessage});
    });
  })

router.route('/api/user/:username')
  .get((req, res) => {
    user_controller.findOneUser({username: req.params.username}).then(user => {
      if(!user.length) {
        res.status(400).json({ error:'No account by that name exists'});
      }
      res.status(200).json(user);
    })
    .catch(err => (res.status(404).json('cannot find user')));
  })
  .post((req, res) => {
    res.json('post/user');
  })
  .patch((req, res) => {
    res.json('patch/user');
  })
  .delete((req, res) => {
    res.json('delete/user');
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


router.route('/*').get((req, res) => {
  res.status(200).sendFile(staticFile);
});

module.exports = router;

