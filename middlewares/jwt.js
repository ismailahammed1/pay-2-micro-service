const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken; // Assuming the token is in a cookie

  if (!token) {
    return next(createError(401,"You are not authenticated!"))
  }

  jwt.verify(token,process.env.SERECT_KEY, (err, payload) => {
    if (err) {
      console.error("Token verification error:", err);
      return next(createError(401,"Token is not valid!"))
    }
    
    // Token is valid, continue with the request
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};

module.exports = {verifyToken};
