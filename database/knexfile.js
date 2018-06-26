const config = require('../config.js');

module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || config.database.host,
    user: process.env.DB_USERNAME ||config.database.user,
    password: process.env.DB_PASSWORD ||config.database.password,
    database: process.env.DB_NAME ||config.database.database,
    useNullAsDefault: true
  }
};
