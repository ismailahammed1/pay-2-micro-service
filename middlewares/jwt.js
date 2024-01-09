
const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "You are not authenticated!" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Token has expired, implement token refresh here
        const newToken = generateNewToken(payload); // Your function to generate a new token
        res.cookie("accessToken", newToken, { httpOnly: true, secure: true });
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        return next();
      } else {
        console.error("Token verification error:", err);
        return res.status(401).json({ error: "Token is not valid!" });
      }
    }

    // Token is valid, continue with the request
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};

module.exports = { verifyToken };
