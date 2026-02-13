const jwt = require("jsonwebtoken");
const { logAuthAttempt } = require("../utils/logger");

function auth(req, res, next) {
  const authHeader = req.headers && req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // must include role in payload
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

// Middleware factory for role-based authorization
function authMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers && req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
      // Check role if allowedRoles is specified
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        // Log unauthorized access attempts for auditing (console and file)
        try {
          const userId = decoded.id || decoded._id || "unknown";
          const msg = `Forbidden access attempt by user=${userId} role=${decoded.role} route=${req.method} ${req.originalUrl}`;
          console.warn(`[AUTH] ${msg} time=${new Date().toISOString()}`);
          logAuthAttempt(msg);
        } catch (e) {
          const msg = `Forbidden access attempt role=${decoded.role} route=${req.method} ${req.originalUrl}`;
          console.warn(`[AUTH] ${msg}`);
          logAuthAttempt(msg);
        }
        return res.status(403).json({ error: "Insufficient permissions" });
      }
      
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  };
}

module.exports = { auth, authMiddleware };
module.exports.default = authMiddleware;