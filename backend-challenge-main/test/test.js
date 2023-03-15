const request = require('supertest');
const app = require('../index');

describe('POST /users/create', () => {
  test('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        birthdate: '1990-01-01',
        zipCode: '12345',
        phoneNumber: '555-555-5555'
      })
      .expect(201);

    expect(response.body).toMatchObject({
      name: 'John Doe',
      birthdate: '1990-01-01',
      zipCode: '12345',
      phoneNumber: '555-555-5555'
    });
  });

  test('should return 400 if name is missing', async () => {
    await request(app)
      .post('/users')
      .send({
        birthdate: '1990-01-01',
        zipCode: '12345',
        phoneNumber: '555-555-5555'
      })
      .expect(400);
  });

  test('should return 400 if birthdate is missing', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        zipCode: '12345',
        phoneNumber: '555-555-5555'
      })
      .expect(400);
  });

  test('should return 400 if zip code is missing', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        birthdate: '1990-01-01',
        phoneNumber: '555-555-5555'
      })
      .expect(400);
  });

  test('should return 400 if phone number is missing', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        birthdate: '1990-01-01',
        zipCode: '12345'
      })
      .expect(400);
  });
});
