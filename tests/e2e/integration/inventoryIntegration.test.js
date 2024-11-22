const request = require('supertest');
const app = require('../inventory-system/app'); // Make sure to export your Inventory express app

describe('Inventory System Integration Tests', () => {
  it('should get all products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('products');
  });

  it('should create a new product', async () => {
    const productData = {
      name: 'Product A',
      quantity: 10,
      price: 20.0,
    };
    const res = await request(app).post('/products').send(productData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('product');
  });
});
