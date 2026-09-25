const db = require('../utils/database');

const getUserByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0] || null;
};

const getUserById = async (userId) => {
  const [rows] = await db.execute(
    'SELECT user_id, name, email, role, status, last_login, created_at FROM users WHERE user_id = ?',
    [userId]
  );
  return rows[0] || null;
};

const createUser = async ({ name, email, password_hash, role }) => {
  const [result] = await db.execute(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, password_hash, role]
  );
  return result.insertId;
};

const updateLastLogin = async (userId) => {
  await db.execute(
    'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?',
    [userId]
  );
};

module.exports = { getUserByEmail, getUserById, createUser, updateLastLogin };
