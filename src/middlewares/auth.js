const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
module.exports = (req, res, next) => {
  
    // Get token value to the json body
    const token = req.headers.authorization;
    console.log('token: ', token);
    // If the token is present
    if(token){
  
        // Verify the token using jwt.verify method
        jwt.verify(token, process.env.API_KEY, (err) => {
            if(err){
                return res.status(401).json({
                    status: 401,
                    message: '¡Tu token ha expirado, por favor, inicia sesión nuevamente!',
                    });
                }else{
                    next();
                }
            });
    }else{
        // Return response with error
        res.json({
            login: false,
            data: 'Token no proveído'
        });
    }
};