const request = require('supertest');
const app = require('../api-gateway/server'); // API Gateway Express app

describe('End-to-End Test', () => {
  it('should complete a user journey from API Gateway to CRM, Inventory, and Support', async () => {
    // Step 1: Get customers from CRM
    const crmResponse = await request(app).get('/api/crm/customers');
    expect(crmResponse.status).toBe(200);
    expect(crmResponse.body).toHaveProperty('customers');

    // Step 2: Get products from Inventory
    const inventoryResponse = await request(app).get('/api/inventory/products');
    expect(inventoryResponse.status).toBe(200);
    expect(inventoryResponse.body).toHaveProperty('products');

    // Step 3: Create a new support ticket
    const supportTicket = {
      title: 'Issue with Product A',
      description: 'The product is broken',
      status: 'open',
    };
    const supportResponse = await request(app)
      .post('/api/support/tickets')
      .send(supportTicket);
    expect(supportResponse.status).toBe(201);
    expect(supportResponse.body).toHaveProperty('ticket');
  });
});
