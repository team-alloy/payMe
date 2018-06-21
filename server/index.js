const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const Test = require('../database/index.js');

const app = express();

// static file serving
app.use(express.static(__dirname+ '/../client/dist/'));

/*
  MIDDLEWARE
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(session({
  secret: "41hd35Y5tXo68w1",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true, maxAge: 60000}
}));

/*
  routes
 */
app.get('/', (req, res) => {
  new Test({name: 'testing', about_me:'magic ponies in the skys'})
  .save()
  .then(function(saved) {
    res.end();
  })
  .catch(function(err) {
    err ? console.error(err): undefined;
  })
});

/*
  PORT
*/
app.listen(process.env.PORT || 1337, () => {
  console.log(new Date());
  console.log('Listening on http://localhost:1337');
})