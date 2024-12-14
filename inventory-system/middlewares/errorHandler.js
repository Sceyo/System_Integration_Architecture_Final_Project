// Generic error handler middleware
module.exports = (err, req, res, next) => {
    // Log the error stack to the console for debugging
    console.error(err.stack);

    // Check for specific error types and handle them accordingly
    if (err.name === 'UnauthorizedError') {
        // Handle cases where authentication failed (JWT error)
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    if (err.name === 'ForbiddenError') {
        // Handle cases where user does not have the right role
        return res.status(403).json({ message: 'Forbidden: Insufficient role to access this resource' });
    }

    if (err.name === 'ValidationError') {
        // Handle validation errors (e.g., missing required fields, invalid data format)
        return res.status(400).json({ message: 'Bad Request: ' + err.message });
    }

    if (err.message && err.message.includes('Not Found')) {
        // Handle 'Not Found' errors (e.g., when a resource is not found)
        return res.status(404).json({ message: 'Not Found: ' + err.message });
    }

    // Default case for unexpected errors (500 Internal Server Error)
    res.status(500).json({ message: 'Internal Server Error' });
};
