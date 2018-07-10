const app = require('./server');

/*
  PORT
*/
app.listen(process.env.PORT || 1337, () => {
  console.log(new Date());
  console.log('Listening on http://localhost:1337');
});

