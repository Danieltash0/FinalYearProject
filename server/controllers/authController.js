const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const { comparePassword } = require('../utils/bcrypt');
const { getSecret } = require('../middleware/auth');

// DB role value -> label shown in the UI
const roleMapping = {
  manager: 'Farm Manager',
  vet: 'Veterinarian',
  worker: 'Worker',
  admin: 'Admin'
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.getUserByEmail(email.trim().toLowerCase());
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    if (user.status === 'inactive') {
      return res.status(401).json({ error: 'Account is deactivated. Please contact the administrator.' });
    }

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    await User.updateLastLogin(user.user_id);
    await ActivityLog.createLog({
      user_id: user.user_id,
      action: 'login',
      description: `${user.name} logged in`,
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    });

    const token = jwt.sign(
      { userId: user.user_id, email: user.email, role: user.role },
      getSecret(),
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    const { password_hash, ...safeUser } = user;
    res.json({
      token,
      user: { ...safeUser, role: roleMapping[user.role] || user.role, roleKey: user.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.logout = async (req, res) => {
  await ActivityLog.createLog({
    user_id: req.user.userId,
    action: 'logout',
    description: 'User logged out',
    ip_address: req.ip,
    user_agent: req.get('User-Agent')
  });
  res.json({ message: 'Logged out successfully' });
};

// Returns the current user; lets the client re-validate a stored token
exports.me = async (req, res) => {
  try {
    const user = await User.getUserById(req.user.userId);
    if (!user || user.status === 'inactive') {
      return res.status(401).json({ error: 'Account not available' });
    }
    res.json({ ...user, role: roleMapping[user.role] || user.role, roleKey: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Could not load profile' });
  }
};
