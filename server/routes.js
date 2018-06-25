const router = require('express').Router();
const path = require('path');
const staticFile = path.join(__dirname + '/../client/dist/index.html');
const db = require('../database/index.js');

const user_controller = require('./controllers/user-controller.js');
const company_controller = require('./controllers/company-controller.js');
// const offer_controller = require('./controllers/offer-controller.js');
const role_controller = require('./controllers/role-controller.js');
const milestone_controller = require('./controllers/milestone-controller.js');
// const application_controller = require('./controllers/application-controller.js');

router.route('/').get((req, res) => {
  res.status(200).sendFile(staticFile);
});

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

*/router.route('/companies')
.get((req, res) => {
  if(req.query.id) {
    let {id} = req.query;
    company_controller
      .getCompanyById({ id: id})
      .then(company => {
        res.send(company);
      });
  }
  company_controller
    .getCompanies()
    .then(companies => {
      res.send(companies);
    })
})
.post((req, res) => {
  res.send('post/companies');
})
.patch((req, res) => {
  res.send('patch/companies');
})
.delete((req, res) => {
  res.send('delete/companies');
})

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
  role_controller.getRoles().then(roles => {
    roles = roles.map(role => {
      return company_controller.getCompanyById({id: role.company_id}).then(company => {
        role.company = company[0];
        delete role.company_id;
        return role;
      });
      return role;
    });
    return roles;
  })
  .then(roles => {
    Promise.all(roles).then(roles => {
      // console.log('Promise.all', roles);
      // console.log(Object.keys(roles[0]))
      res.status(200).send(roles);
    });
  });
  // res.send('get/roles')
})
.post((req, res) => {
  res.send('post/roles');
})
.patch((req, res) => {
  res.send('post/roles');
})
.delete((req, res) => {
  res.send('post/roles');
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
router.route('/applications').get((req, res) => {
  res.send('get/applications');
})
.post((req, res) => {
  res.send('post/applications');
})
.patch((req, res) => {
  res.send('patch/applications');
})
.delete((req, res) => {
  res.send('delete/applications');
})

/*

88       88 ,adPPYba,  ,adPPYba, 8b,dPPYba, ,adPPYba,
88       88 I8[    "" a8P_____88 88P'   "Y8 I8[    ""
88       88  `"Y8ba,  8PP""""""" 88          `"Y8ba,
"8a,   ,a88 aa    ]8I "8b,   ,aa 88         aa    ]8I
 `"YbbdP'Y8 `"YbbdP"'  `"Ybbd8"' 88         `"YbbdP"'

*/
router.route('/user')
  .get( (req, res) => {
    user_controller.findAllUsers()
      .then(users => res.status(200).send(users))
      .catch(err => res.status(400).send(err));
  });

router.route('/signup')
.post( (req, res) => {

  if(!req.body.email) {
    res.status(404).send({ error: 'An account needs an email'});
  }
  if(!req.body.username) {
    res.status(404).send({ error: 'An account needs a username'});
  }
  if(!req.body.hash) {
    res.status(404).send({ error: 'An account needs a password'});
  }

  user_controller.signUpNewUser(req.body).then( newUser =>
    res.status(200).send('user created'))
    .catch(err => {
      res.status(404).send({error: err.sqlMessage});
    });
  })

router.route('/user/:username')
  .get((req, res) => {
    user_controller.findOneUser({username: req.params.username}).then(user => {
      if(!user.length) {
        res.status(400).send({ error:'No account by that name exists'});
      }
      res.status(200).send(user);
    })
    .catch(err => (res.status(404).send('cannot find user')));
  })
  .post((req, res) => {
    res.send('post/user');
  })
  .patch((req, res) => {
    res.send('patch/user');
  })
  .delete((req, res) => {
    res.send('delete/user');
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
    res.status(200).send(milestones);
  })
  .catch((err) => res.status(400).send(err));
})
.post((req, res) => {
  if(!req.body.user_id) {
    res.status(404).send({ error: 'An account needs a user_id'});
  }
  milestone_controller.insertMilestone(req.body)
  .then((milestones) => {
    res.status(200).send('milestone inserted');
  })
  .catch((err) => res.status(404).send({error: err.sqlMessage}));
})
.patch((req, res) => {
  milestone_controller.updateMilestone(req.body.id, req.body)
  .then((milestones) => {
    res.status(200).send('success!')
  })
  .catch((err) => {
    res.status(404).send(err);
  })
});

/*
              ad88    ad88
             d8"     d8"
             88      88
 ,adPPYba, MM88MMM MM88MMM ,adPPYba, 8b,dPPYba, ,adPPYba,
a8"     "8a  88      88   a8P_____88 88P'   "Y8 I8[    ""
8b       d8  88      88   8PP""""""" 88          `"Y8ba,
"8a,   ,a8"  88      88   "8b,   ,aa 88         aa    ]8I
 `"YbbdP"'   88      88    `"Ybbd8"' 88         `"YbbdP"'

*/

router.route('/offers').get((req, res) => {
  res.send('get/offers');
})
.post((req, res) => {
  res.send('post/offers');
})
.patch((req, res) => {
  res.send('patch/offers');
})
.delete((req, res) => {
  res.send('delete/offers');
})


// var findUsers = (obj, res) => {
//   return db.knex.select().from('users');
// }

// var findCatsForUser = ({id}) => {
//   return db.knex('cats').where({owner_id: id});
// };

module.exports = router;
