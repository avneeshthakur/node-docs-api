const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secret = process.env.SECRET || 'docs-api-secret';

// middleware function to check the that user is authenticated 
 const authenticate = async (req, res, next) => {
       const token = req.headers.authorization ;
       if (token) {
       try {
       let decoded = await jwt.verify(token, secret);
       let user = await  User.findOne({ email:decoded.email, _id : decoded.id });
          if (user) {
              next(user)    
             return null;
           } else {
            return res.status(401).json({
              status:false,
              message: 'Authentication Failed'
            });
          }
       } catch (err) {
         return res.status(500).json({
              status:false,
              message: err.message
            });
       }
      } else {
         return res.status(401).json({
          status:false,
          message: 'Failed authentication: No Token Provided.'
        });
      }

   }

module.exports = { authenticate };