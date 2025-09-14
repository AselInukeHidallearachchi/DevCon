const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const secret = process.env.JWT_SECRET || (config.has("jwtSecret") ? config.get("jwtSecret") : undefined);
    if (!secret) {
      return res.status(500).json({ msg: "Server misconfiguration: missing JWT secret" });
    }
    const decoded = jwt.verify(token, secret);

    // Add user from payload to request object
    req.user = decoded.user;

    next(); // Call the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
