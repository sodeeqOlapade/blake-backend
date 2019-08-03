import request from 'supertest';
import app from '../../../src/app';

/**
 * Testing post user endpoint
 */
describe('test /api/users endpoint', function() {

  it('respond with json', function(done) {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('"respond with a resource"')
      .expect(200, done);
  });

  it('POST to /api/users respond with 400 name is required', async function(done) {
    let data = {
      // no name
      // "name": "dummy dummy",
      "email": 'dummy@gmail.com',
      "password": 'password',
    };
    request(app)
      .post('/api/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect('"name is required"')
      .end(err => {
        if (err) return done(err);
        done();
      });
  });

  it('POST to /api/users respond with 200', async function(done) {
    let data = {
      // name supplied
      "name": 'dummy dummy',
      "email": 'dummy@gmail.com',
      "password": 'password',
    };
    request(app)
      .post('/api/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });

  it('POST to /api/users respond with 400 ', async function(done) {
    let data = {
      // name supplied
      name: 'dummy dummy',
      email: 'dummy@gmail.com',
      password: 'password',
    };
    request(app)
      .post('/api/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('{"errors":[{"msg":"user already exist"}]}')
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
