const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    
    const token = req.body.authorization || req.params.token;

    if (!token) {
    
        jwt.verify(token, "HEY BEAUTIFUL PEOPLE!!", (error, decode) => {
            if (error) {
                res.status(500).json({
                    message: "Token is not valid"
                });
                return;
            }

           
            req.user = decode;

           
            next();
        });
    }
};