const request = require('supertest');
const app = require('../app'); // The main CRM server file
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect('mongodb://localhost:27017/test_crm', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    // Clean up and close database connection
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('CRM System API Tests', () => {
    it('should create a new customer', async () => {
        const response = await request(app).post('/customers').send({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('John Doe');
    });

    it('should fetch all customers', async () => {
        const response = await request(app).get('/customers');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should fetch a single customer by ID', async () => {
        const customer = await Customer.create({ name: 'Jane Doe', email: 'jane@example.com', phone: '9876543210' });
        const response = await request(app).get(`/customers/${customer._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Jane Doe');
    });

    it('should update a customer', async () => {
        const customer = await Customer.create({ name: 'Old Name', email: 'old@example.com', phone: '5555555555' });
        const response = await request(app)
            .put(`/customers/${customer._id}`)
            .send({ name: 'New Name' });
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('New Name');
    });

    it('should delete a customer', async () => {
        const customer = await Customer.create({ name: 'Delete Me', email: 'delete@example.com', phone: '4444444444' });
        const response = await request(app).delete(`/customers/${customer._id}`);
        expect(response.statusCode).toBe(204);
    });
});
