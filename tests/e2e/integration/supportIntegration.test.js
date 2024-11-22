const request = require('supertest');
const app = require('../support-system/app'); // Make sure to export your Support express app

describe('Support System Integration Tests', () => {
  it('should get all support tickets', async () => {
    const res = await request(app).get('/tickets');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('tickets');
  });

  it('should create a new support ticket', async () => {
    const ticketData = {
      title: 'Issue with product',
      description: 'Product A is broken',
      status: 'open',
    };
    const res = await request(app).post('/tickets').send(ticketData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('ticket');
  });
});
