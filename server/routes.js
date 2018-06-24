const router = require('express').Router();
const path = require('path');
const staticFile = path.join(__dirname + '/../client/dist/index.html');
const db = require('../database/index.js');

const user_controller = require('./controllers/user-controller.js');

router.route('/').get((req, res) => {
  res.status(200).sendFile(staticFile);
});

router.route('/test')
.get((req, res) => {
  let result;

  findUsers().then(users => {
    return users.map((user) => {
      return findCatsForUser(user).then(cats => {
        // console.log(user, '#17');
        // console.log(cats, '#18');
        user.cats = cats;
        // console.log(user, '#19');
        return user;
      })
    });
  }).then(users => {
      Promise.all(users).then((users) => {
        // console.log(users);
        // console.log(Object.keys(users[0]));
        res.send(users);
      })
  });

})

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
  console.log('IM HERE');
  res.send('get/companies');
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
  res.send('get/roles')
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
    user_controller.signUpNewUser(req.body).then( newUser =>
    res.status(200).send('user created'))
    .catch(err => {
      res.status(404).send({error: err.sqlMessage});
    });
  })

router.route('/user/:username')
  .get((req, res) => {
    console.log(req.params)
    user_controller.findOneUser({username: req.params.username}).then(user => {
      if(!user.length) {
        res.status(400).send({ error:'No account by that name exists'});
      }
      res.status(200).send(user);
    })
    .catch(err => (res.status(404).send('cannot find user')));
    // res.send('get/user');
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
router.route('/milestones').get((req, res) => {
  res.send('get/milestones');
})
.post((req, res) => {
  res.send('post/milestones');
})
.patch((req, res) => {
  res.send('patch/milestones');
})
.delete((req, res) => {
  res.send('delete/milestones');
})

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


var findUsers = (obj, res) => {
  return db.knex.select().from('users');
}

var findCatsForUser = ({id}) => {
  return db.knex('cats').where({owner_id: id});
};

module.exports = router;