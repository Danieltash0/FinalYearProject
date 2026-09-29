const jwt = require('jsonwebtoken');

const getSecret = () => process.env.JWT_SECRET || 'dev-only-secret';

// Verifies the Bearer token and attaches { userId, email, role } to req.user
const authenticateToken = (req, res, next) => {
  const header = req.header('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
    req.user = jwt.verify(token, getSecret());
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// RBAC guard. Roles are the DB values: 'admin' | 'manager' | 'vet' | 'worker'
const requireRole = (allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
  }
  next();
};

module.exports = { authenticateToken, requireRole, getSecret };
