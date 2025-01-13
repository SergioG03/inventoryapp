const request = require('supertest');
const app = require('../server');

describe('Auth API Tests', () => {
  const testUser = {
    username: 'testuser',
    email: 'test@test.com',
    password: 'password123'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
