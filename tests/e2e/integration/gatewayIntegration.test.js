const request = require('supertest');
const app = require('../api-gateway/server'); // Make sure to export your express app

describe('API Gateway Integration Tests', () => {
  it('should route to CRM service correctly', async () => {
    const res = await request(app).get('/api/crm/customers');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('customers');
  });

  it('should route to Inventory service correctly', async () => {
    const res = await request(app).get('/api/inventory/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('products');
  });

  it('should route to Support service correctly', async () => {
    const res = await request(app).get('/api/support/tickets');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('tickets');
  });
});
