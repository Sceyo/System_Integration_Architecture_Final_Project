module.exports = {
    jwtSecret: 'your_jwt_secret_key', // Replace with a secure secret key
    encryptionSecret: 'your_encryption_secret', // Replace with a secure secret key
    database: {
        host: 'localhost',
        port: 27017,
        crmDb: 'crm_database',
        inventoryDb: 'inventory_database',
        supportDb: 'support_database'
    },
    apiGateway: {
        port: 3000
    }
};
