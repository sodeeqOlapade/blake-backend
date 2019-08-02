import request from 'supertest';
import app from '../../../src/app';

/**
 * Testing post user endpoint
 */
describe('POST /users', function() {
  let data = {
    // no name
    // "name": "dummy dummy",
    email: 'dummy@gmail.com',
    password: 'password',
  };
  it('respond with 401 name is required', function (done) {
      request(app)
          .post('/api/users')
          .send(data)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(401)
          .expect('"name is required"')
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });

});
