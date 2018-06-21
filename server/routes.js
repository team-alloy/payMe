const router = require('express').Router();
const path = require('path');

const staticFile = path.join(__dirname + '/../client/dist/index.html');
const User = require('../database/models/users.js');

router.route('/').get((req, res) => {
  res.status(200).sendFile(staticFile);
});

router.route('/test')
.get((req, res) => {
  User
    .fetchAll()
    .then(users => res.json({users}))
    .catch(err => console.error(err));
})
.post((req, res) => {
  new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    hash: req.body.hash
  })
  .save()
  .then(saved => res.json({ saved }))
  .catch(err => {
    console.error(err);
    // if the username already exists
  });
});

module.exports = router;