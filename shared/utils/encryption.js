const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
    hashPassword: async (password) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    },
    comparePassword: async (password, hash) => {
        return bcrypt.compare(password, hash);
    },
    encrypt: (text, secret) => {
        const cipher = crypto.createCipher('aes-256-cbc', secret);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    },
    decrypt: (encrypted, secret) => {
        const decipher = crypto.createDecipher('aes-256-cbc', secret);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
};
