import request from 'supertest';
import app from '../../../src/app';

/**
 * Testing post user endpoint
 */
describe('test /api/businesses endpoint', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/api/businesses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('"respond with a resource"')
      .expect(200, done);
  });

  it('POST to /api/businesses respond with 400 phone is required', async function(done) {
    let data = {
      // no phone number
      name: 'dummy dummy',
      email: 'dummy@gmail.com',
      password: 'password',
      address: "Lagos, Nigeria"
      //   phone:'09024784735'
    };
    request(app)
      .post('/api/businesses')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect('"phone number is required"')
      .end(err => {
        if (err) return done(err);
        done();
      });
  });

  it('POST to /api/businesses respond with 200', async function(done) {
    let data = {
      // no phone number
      name: 'dummy dummy',
      email: 'dummy@gmail.com',
      password: 'password',
      phone: '09024784735',
      address: "Lagos, Nigeria"
    };
    request(app)
      .post('/api/businesses')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });

  it('POST to /api/businesses respond with 400 ', async function(done) {
    let data = {
      // no phone number
      name: 'dummy dummy',
      email: 'dummy@gmail.com',
      password: 'password',
      phone: '09024784735',
      address: "Lagos, Nigeria"
    };
    request(app)
      .post('/api/businesses')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect('{"errors":[{"msg":"business already exist"}]}')
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
