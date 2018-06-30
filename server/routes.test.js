const {app, server} = require('./index');
const request = require('supertest');
let user = {};


beforeAll(() => {
  const parameters = {
    username: 'oldUser',
    email: 'real@user.com',
    pass: '123'
  };
 request(app)
    .post('/api/signup')
    .send(parameters).then(response => {
      request(app)
        .post('/api/login')
        .send({ email: parameters.email, password: parameters.pass })
        .then(response => response.body.user)
    });
});

beforeEach((done) => {
    request(app).post('/api/login')
    .send({email: 'sarah@silverman.com', password: '123'})
    .then(response => {
    done();
  })
});

describe('Users functionality', () => {

  const parameters = {
    username: 'newUser',
    email: 'fake@user.com',
    pass: 'test'
  };

  test('Should be able to update the user accounts first name and last_name', () => {
    return request(app)
    .post('/api/login')
    .send({email: parameters.email, password: parameters.pass})
    .then(response => {
      let user = response.body.user;

      return request(app)
      .patch(`/api/user?id=${user.id}`)
      .send({first_name: 'mark', last_name: 'zuckerberg'})
      .then(response => {
        expect(response.statusCode).toBeGreaterThanOrEqual(200);
      });
    });
  });

  test('Should not be able to update current salary without a role_id', () => {
    return request(app)
    .post('/api/login')
    .send({ email: parameters.email, password: parameters.pass })
    .then(response => {
      let user = response.body.user;

      return request(app)
      .patch(`/api/user?id=${user.id}`)
      .send({ current_salary: 250000 })
      .then(response => {
        expect(response.body.error).toBeDefined();
        // error message should appear in body telling the user that this is not allowed
      });
    });
  });

  test('Should be able to update current salary with a role_id', () => {
    return request(app)
    .post('/api/login')
    .send({ email: parameters.email, password: parameters.pass })
    .then(response => {
      let user = response.body.user;

      return request(app).patch(`/api/user?id=${user.id}`)
      .send({ current_salary: 250000, active_role: 1 })
      .then(response => {
        expect(response.body.message).toBeDefined();
        // error message should appear in body telling the user that this is not allowed
      });
    });
  });

  test('User must provide the correct \'old_password\' and a new \'pass\' in order to update password', () => {
    return request(app)
    .post('/api/login')
    .send({ email: parameters.email, password: parameters.pass })
    .then(response => {
      let user = response.body.user;

      return request(app).patch(`/api/user?id=${user.id}`)
        .send({ pass: 1234, old_password: 1234 })
        .then(response => {
          let error = JSON.parse(response.error.text);
          expect(response.statusCode).toBeGreaterThan(399);
          expect(error.error).toEqual('wrong password');
          // error message should appear in body telling the user that this is not allowed
        });
    });
  });

  test('User can update their password with the correct credentials', () => {
    console.log(parameters)
    return request(app)
      .post('/api/login')
      .send({ email: parameters.email, password: parameters.pass })
      .then(response => {
        let user = response.body.user;
        return request(app).patch(`/api/user?id=${user.id}`)
          .send({ pass: 'test', old_password: parameters.pass })
          .then(response => {
            expect(response.statusCode).toBeGreaterThanOrEqual(200);
            expect(response.body.message).toBeDefined();
            // error message should appear in body telling the user that this is not allowed
          });
      });
  });
});

describe('GET request', () => {
  describe('users', () => {
    test('It should connect to user GET', () => {
      return request(app).get('/api/user').expect(200);
    });

    test('It should return a user record when queried with \'?id=<user_id>\'', () => {
      return request(app).get('/api/user?id=2').expect(200).then(res => {
        expect(res.body.length).toBeGreaterThan(0);
      });
    })

    test('It should return an empty array if the user_id does not exist', () => {
      return request(app).get('/api/user?id=1200').expect(200).then(res => {
        expect(res.body.length).toEqual(0);
      });
    })

    test('It should return a user record when querying their username \'?username=<username>\'', () => {
      return request(app).get('/api/user?username=romcar').expect(200).then(res => {
        expect(res.body[0].username).toEqual('romcar');
      });
    })

    test('It should return a user record when querying their email \'?email=<email>\'', () => {
      return request(app).get('/api/user?email=sarah@silverman.com').expect(200).then(res => {
        expect(res.body[0].username).toEqual('sarahRocks');
      });
    });
  }); //end GET

  test('It should connect to milestones GET', () => {
    return request(app).get('/api/milestones').expect(200);
  });

  test('It should connect to applications GET', () => {
    return request(app).get('/api/applications').expect(200);
  });

  test('It should connect to offers GET', () => {
    return request(app).get('/api/offers').expect(200);
  });

  test('It should connect to roles GET', () => {
    return request(app).get('/api/roles').expect(200);
  });

  test('It should connect to companies GET', () => {
    console.log(user)
    return request(app).get('/api/companies').expect(200);
  });
});

describe('Application functionality', () => {

});


afterAll( () => {
    return request(app)
    .delete('/api/user?username=oldUser')
    .then(response => {
      expect(response.body.message).toEqual('user was deleted from database');
      server.close();
    });
});