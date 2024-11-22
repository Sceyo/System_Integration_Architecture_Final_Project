const request = require('supertest');
const app = require('../crm-system/app'); // Make sure to export your CRM express app

describe('CRM System Integration Tests', () => {
  it('should get all customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('customers');
  });

  it('should create a new customer', async () => {
    const customerData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    const res = await request(app).post('/customers').send(customerData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('customer');
  });
});
