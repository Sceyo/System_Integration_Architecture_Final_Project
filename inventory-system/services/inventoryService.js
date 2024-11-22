const Product = require('../models/Product');

class InventoryService {
    static async getAllProducts() {
        return await Product.find();
    }

    static async getProductById(productId) {
        return await Product.findById(productId);
    }

    static async createProduct(data) {
        const product = new Product(data);
        return await product.save();
    }

    static async updateProduct(productId, data) {
        return await Product.findByIdAndUpdate(productId, data, { new: true });
    }

    static async deleteProduct(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

module.exports = InventoryService;
