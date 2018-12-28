const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {

    if (req.method === 'OPTIONS') { 
        res.writeHead(200) 
        res.end() 
        return 
    
    }

    const token = req.body.authorization || req.params.token;

    if (!token) {
        res.status(401).json({
            message: "You must provide a token"
        });
        return;
    }
    
         jwt.verify(token, "i love Jon's cat!!! meow!!", (error, decode) => {
            if (error) {
                res.status(500).json({
                    message: "Token is not valid"
                });
                return;
            }

           
            req.user = decode;

           
            next();
        });
    
};