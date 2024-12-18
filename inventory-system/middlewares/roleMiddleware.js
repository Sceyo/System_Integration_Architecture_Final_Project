
const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role; 
        
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Access forbidden: You do not have the required role' });
        }

        next(); 
    };
};

module.exports = checkRole;
