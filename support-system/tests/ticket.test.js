const request = require('supertest');
const app = require('../app'); // Import the app for testing

describe('Support System API', () => {
    it('should create a new ticket', async () => {
        const response = await request(app)
            .post('/tickets')
            .send({ customerId: '61a8a95b4e4d1f001f76d123', issue: 'Test Issue' });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.issue).toBe('Test Issue');
    });

    it('should fetch all tickets', async () => {
        const response = await request(app).get('/tickets');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
