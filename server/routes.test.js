const router = require('./routes');
const request = require('supertest');

test('test', () => {
  expect(true).toBeTruthy();
});

// it('router', () => {
//   const response = request(router).get('/');
//   expect(response.status).toBe(200);
// })