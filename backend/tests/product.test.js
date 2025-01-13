const request = require('supertest');
const app = require('../server');
let authToken;

describe('Product API Tests', () => {
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'producttester',
        email: 'product@test.com',
        password: 'password123'
      });
    authToken = res.body.token;
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Test Product',
        price: 99.99,
        stock: 10
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test Product');
  });

  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
