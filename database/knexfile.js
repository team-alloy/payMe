const config = {
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'gotohell12',
    database: process.env.DB_NAME || 'payme',
  },
};

module.exports = {
  client: 'mysql',
  connection: {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    useNullAsDefault: true,
  },
};
