const Customer = require('../models/Customer');

class CustomerService {
    static async getAllCustomers() {
        return await Customer.find();
    }

    static async getCustomerById(customerId) {
        return await Customer.findById(customerId);
    }

    static async createCustomer(data) {
        const customer = new Customer(data);
        return await customer.save();
    }

    static async updateCustomer(customerId, data) {
        return await Customer.findByIdAndUpdate(customerId, data, { new: true });
    }

    static async deleteCustomer(customerId) {
        return await Customer.findByIdAndDelete(customerId);
    }
}

module.exports = CustomerService;
