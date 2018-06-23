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
  // findUsers((users, code, res) => {
  //   users = users.map((user) => {
  //     findCatsForUser((cats) => {
  //       user.cats = cats;
  //     }, user);
  //     // console.log('hey there', user);
  //     return user;
  //   });
  //   // console.log(users, '---------------------------')
  //   return users;
  // }).then(users => {
  //   console.log(users[0])
  //   let temp = users[0];
  //   console.log(temp)
  //   res.send(temp)
  // });
})
// .post((req, res) => {
//   new User({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     username: req.body.username,
//     hash: req.body.hash
//   })
//   .save()
//   .then(saved => res.json({ saved }))
//   .catch(err => {
//     console.error(err);
//     // if the username already exists
//   });
// });

var findUsers = (obj, res) => {
  return db.knex.select().from('users');
}

var findCatsForUser = ({id}) => {
  return db.knex('cats').where({owner_id: id});
};

module.exports = router;