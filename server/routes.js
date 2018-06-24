const router = require('express').Router();
const path = require('path');
const staticFile = path.join(__dirname + '/../client/dist/index.html');
const db = require('../database/index.js');

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
// companies
router.route('/companies')
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
// roles
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
// applications
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
// user
router.route('/user').get((req, res) => {
  res.send('get/user');
})
.post((req, res) => {
  res.send('post/user');
})
.patch((req, res) => {
  res.send('patch/user');
})
.delete((req, res) => {
  res.send('delete/user');
})
// milestones
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
// offers
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