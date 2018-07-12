const app = require('./server');
const request = require('supertest');

const user = {};


beforeAll(() => {
  const parameters = {
    username: 'oldUser',
    email: 'real@user.com',
    pass: '123',
  };
  return request(app)
    .post('/api/signup')
    .send(parameters).then(() => request(app)
      .post('/api/login')
      .send({ email: parameters.email, password: parameters.pass }));
});

beforeEach((done) => {
  const parameters = {
    username: 'oldUser',
    email: 'real@user.com',
    pass: '123',
  };
  request(app).post('/api/login')
    .send({ email: parameters.email, password: parameters.pass })
    .then((response) => {
      done();
    });
});

describe('Users functionality', () => {
  const parameters = {
    username: 'oldUser',
    email: 'real@user.com',
    pass: '123',
  };

  test('Should be able to update the user accounts first name and last_name', () => request(app)
    .post('/api/login')
    .send({ email: parameters.email, password: parameters.pass })
    .then((response) => {
      const user = response.body.user;

      return request(app)
        .patch(`/api/user?id=${user.id}`)
        .send({ first_name: 'mark', last_name: 'zuckerberg' })
        .then((response) => {
          expect(response.statusCode).toBeGreaterThanOrEqual(200);
        });
    }));

  test('User must provide the correct \'old_password\' and a new \'pass\' in order to update password', () => request(app)
    .post('/api/login')
    .send({ email: parameters.email, password: parameters.pass })
    .then((response) => {
      const user = response.body.user;

      return request(app).patch(`/api/user?id=${user.id}`)
        .send({ newPassword: 1234, old_password: 1234111 })
        .then((response) => {
          const error = response.error.status;

          expect(error).toBeGreaterThan(399);
          // error message should appear in body telling the user that this is not allowed
        });
    }));

  test('User can update their password with the correct credentials', () => request(app)
    .post('/api/login')
    .send({ email: parameters.email, password: parameters.pass })
    .then((response) => {
      const user = response.body.user;
      return request(app).patch(`/api/user?id=${user.id}`)
        .send({ pass: 'test', old_password: parameters.pass })
        .then((response) => {
          expect(response.statusCode).toBeGreaterThanOrEqual(200);
          expect(response.body.message).toBeDefined();
          // error message should appear in body telling the user that this is not allowed
        });
    }));
});

describe('GET request', () => {
  describe('users', () => {
    const parameters = {
      username: 'oldUser',
      email: 'real@user.com',
      pass: '123',
    };

    test('It should connect to user GET', () => request(app).get('/api/user').expect(200));

    test('It should return a user record when queried with \'?id=<user_id>\'', () => request(app)
      .post('/api/login')
      .send({ email: parameters.email, password: parameters.pass })
      .then((response) => {
        const user = response.body.user;

        return request(app).get(`/api/user?id=${user.id}`).expect(200).then((res) => {
          expect(res.body.length).toBeGreaterThan(0);
        });
      }));

    test('It should return an empty array if the user_id does not exist', () => request(app).get('/api/user?id=1200').expect(200).then((res) => {
      expect(res.body.length).toEqual(0);
    }));


    test('It should return a user record when querying their email \'?email=<email>\'', () => request(app)
      .post('/api/login')
      .send({ email: parameters.email, password: parameters.pass })
      .then((response) => {
        const user = response.body.user;
        return request(app)
          .patch(`/api/user?id=${user.id}`)
          .send({ first_name: 'mark', last_name: 'zuckerberg' })
          .then((response) => {
            expect(response.statusCode).toBeGreaterThanOrEqual(200);
          })
          .then(() => request(app).get(`/api/user?email=${parameters.email}`).expect(200).then((res) => {
            expect(res.body[0].first_name).toEqual('Mark');
          }));
      }));
  }); // end GET

  test('It should connect to milestones GET', () => request(app).get('/api/milestones').expect(200));

  test('It should connect to applications GET', () => request(app).get('/api/applications').expect(200));

  test('It should connect to offers GET', () => request(app).get('/api/offers').expect(200));

  test('It should connect to roles GET', () => request(app).get('/api/roles').expect(200));

  test('It should connect to companies GET', () => request(app).get('/api/companies').expect(200));
});

describe('Application functionality', () => {

});


afterAll(() => request(app)
  .delete('/api/user?email=real@user.com')
  .then((response) => {
    expect(response.body.message).toEqual('user was deleted from database');
  }));
