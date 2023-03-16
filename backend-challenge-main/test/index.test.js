const supertest = require('supertest');
const chai = require('chai');
const app = require('../index');

var expect = chai.expect;


let request = null
let server = null

before(function(done){
  server = app.listen(done)
  request = supertest.agent(server)
})

after(function(done){
  server.close(done)
})


describe('POST /users/create', () => {
  it('should create a new user', async () => {
    await request.post('/users/create')
      .send({
        name: 'John Doe',
        birthdate: '1990-01-01',
        zipCode: '12345',
        phoneNumber: '555-555-5555'
      })
      .expect(200);
  });

  it('should return 400 if name is missing', async () => {
    await request
      .post('/users/create')
      .send({
        birthdate: '1990-01-01',
        zipCode: '12345',
        phoneNumber: '555-555-5555'
      })
      .expect(400);
  });

  it('should return 400 if birthdate is missing', async () => {
    await request
      .post('/users/create')
      .send({
        name: 'John Doe',
        zipCode: '12345',
        phoneNumber: '555-555-5555'
      })
      .expect(400);
  });

  it('should return 400 if zip code is missing', async () => {
    await request
      .post('/users/create')
      .send({
        name: 'John Doe',
        birthdate: '1990-01-01',
        phoneNumber: '555-555-5555'
      })
      .expect(400);
  });

  it('should return 400 if phone number is missing', async () => {
    await request
      .post('/users/create')
      .send({
        name: 'John Doe',
        birthdate: '1990-01-01',
        zipCode: '12345'
      })
      .expect(400);
  });
});
