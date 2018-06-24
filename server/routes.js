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

});

var findUsers = (obj, res) => {
  return db.knex.select().from('users');
}

var findCatsForUser = ({id}) => {
  return db.knex('cats').where({owner_id: id});
};

module.exports = router;