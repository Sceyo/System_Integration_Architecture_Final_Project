module.exports = (req, res, next) => {
    // Simple authentication logic
    const token = req.headers['authorization'];
    if (!token || token !== 'Bearer secure-token') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};
