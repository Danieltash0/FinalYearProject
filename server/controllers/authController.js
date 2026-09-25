const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

const ROLE_DISPLAY_NAMES = {
  manager: 'Farm Manager',
  vet: 'Veterinarian',
  worker: 'Worker',
  admin: 'Admin'
};

const VALID_ROLES = Object.keys(ROLE_DISPLAY_NAMES);

const toFrontendUser = (user) => {
  const { password_hash, ...safeUser } = user;
  return { ...safeUser, roleLabel: ROLE_DISPLAY_NAMES[user.role] || user.role };
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'name, email, password, and role are required.' });
    }
    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: `role must be one of: ${VALID_ROLES.join(', ')}` });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const existing = await User.getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with that email already exists.' });
    }

    const password_hash = await hashPassword(password);
    const userId = await User.createUser({ name, email, password_hash, role });

    res.status(201).json({ userId, message: 'Account created successfully.' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Failed to create account.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required.' });
    }

    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if (user.status === 'inactive') {
      return res.status(401).json({ error: 'Account is deactivated. Please contact an administrator.' });
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    await User.updateLastLogin(user.user_id);

    const token = jwt.sign(
      { userId: user.user_id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ user: toFrontendUser(user), token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
};

exports.logout = async (req, res) => {
  // Stateless JWTs: nothing to invalidate server-side yet (no token blocklist table).
  // The client clearing its stored token is what actually logs the user out.
  res.json({ message: 'Logged out successfully.' });
};

exports.me = async (req, res) => {
  try {
    const user = await User.getUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ user: toFrontendUser(user) });
  } catch (err) {
    console.error('Get current user error:', err);
    res.status(500).json({ error: 'Failed to fetch current user.' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'email is required.' });
    }
    // Always respond the same way whether or not the account exists, so this
    // endpoint can't be used to enumerate registered emails.
    // TODO: wire up real email delivery once a mail provider is chosen.
    await User.getUserByEmail(email);
    res.json({ message: 'If an account with that email exists, password reset instructions have been sent.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Failed to process request.' });
  }
};
