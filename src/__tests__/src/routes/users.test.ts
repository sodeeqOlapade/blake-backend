import request from 'supertest';
import app from '../../../app';

/**
 * Testing post user endpoint
 */
describe('POST /api/users', function() {
  let data = {
    // no name
    // "name": "dummy dummy",
    email: 'dummy@gmail.com',
    password: 'password',
  };
  it('respond with 400 name is required', function (done) {
      request(app)
          .post('/api/users')
          .send(data)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect("name is required")
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });

});


/**
 * Testing get all user endpoint
 */
describe('GET /users', function () {
  it('respond with json containing a list of all users', function (done) {
      request(app)
          .get('/api/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});