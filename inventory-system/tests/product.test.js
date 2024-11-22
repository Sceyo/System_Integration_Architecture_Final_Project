const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Product = require('../models/Product');

beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect('mongodb://localhost:27017/test_inventory', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    // Clean up and close database connection
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Inventory System API Tests', () => {
    it('should create a new product', async () => {
        const response = await request(app).post('/products').send({
            name: 'Test Product',
            description: 'A sample product',
            price: 100.0,
            quantity: 10,
            supplier: 'Test Supplier',
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Test Product');
    });

    it('should fetch all products', async () => {
        const response = await request(app).get('/products');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should fetch a single product by ID', async () => {
        const product = await Product.create({
            name: 'Sample Product',
            description: 'Sample description',
            price: 50.0,
            quantity: 5,
            supplier: 'Sample Supplier',
        });
        const response = await request(app).get(`/products/${product._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Sample Product');
    });

    it('should update a product', async () => {
        const product = await Product.create({
            name: 'Old Product',
            description: 'Old description',
            price: 40.0,
            quantity: 3,
            supplier: 'Old Supplier',
        });
        const response = await request(app)
            .put(`/products/${product._id}`)
            .send({ name: 'Updated Product' });
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Updated Product');
    });

    it('should delete a product', async () => {
        const product = await Product.create({
            name: 'Delete Me',
            description: 'To be deleted',
            price: 20.0,
            quantity: 2,
            supplier: 'Delete Supplier',
        });
        const response = await request(app).delete(`/products/${product._id}`);
        expect(response.statusCode).toBe(204);
    });
});
