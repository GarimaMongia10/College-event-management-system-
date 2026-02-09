const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

module.exports = { auth, authorizeRole };