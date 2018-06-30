require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require("path");
const routes = require('./routes.js');
const session = require('express-session');
const webpack = require("webpack");

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

// Twilio env
if(process.env.NODE_ENV === "DEV") { // Configuration for development environment
  var webpackDevMiddleware = require("webpack-dev-middleware");
  var webpackHotMiddleware = require("webpack-hot-middleware");
  var webpackConfig = require("../webpack.config.js");
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(webpackCompiler, {
    hot: true
  }));
  app.use(webpackHotMiddleware(webpackCompiler));
  app.use(express.static(path.join(__dirname, "app")));
} else if(process.env.NODE_ENV === "PROD") { // Configuration for production environment
  app.use(express.static(path.join(__dirname, "dist")));
}

app.use(function(req, res, next){
  console.log("Request from: ", req.url);
  next();
})

/*
  routes
 */
app.all('/*', routes);


/*
  PORT
*/
const server = app.listen(process.env.PORT || 1337, () => {
  console.log(new Date());
  console.log('Listening on http://localhost:1337');
});

module.exports = {server, app};