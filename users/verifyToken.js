const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
    
    if (!token) {
        return res.status(401).json({
            message: "You must provide a token!"
        });
    }

    jwt.verify(token, "token is valid", (error, decode) => {
        if (error) {
            return res.status(401).json({
                message: "Token is not valid",
                error: error.message
            });
        }

        req.user = decode;
        next();
    });
};