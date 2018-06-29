const {app, server} = require('./index');
const request = require('supertest');

beforeEach((done) => {
    request(app).post('/api/login').send({email: 'sarah@silverman.com', password: '123'}).then(response => {
    done();
  })
});

describe('POST', () => {
  describe('Creates a user account with a minimum of username, email, and pass', () => {
    const parameters = {
      username: 'newUser',
      email: 'fake@user.com',
      pass: '123'
    };
    return request(app).post('/api/signup').send(parameters).then(response => {
      expect(response.body.message).toEqual('user created');
      return request(app).delete('/api/user?username=newUser').then(response => {
        expect(response.body.message).toEqual('user was deleted from database');
      })
    })
  })
})

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
    })

  }) //end GET

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
    return request(app).get('/api/companies').expect(200);
  });
});

afterAll( () => {
  server.close();
})