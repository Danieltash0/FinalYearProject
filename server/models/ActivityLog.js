const db = require('../utils/database');

// Logging must never break the request that triggered it
exports.createLog = async ({ user_id, action, description, ip_address, user_agent }) => {
  try {
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
      [user_id || null, action, description || null, ip_address || null, user_agent || null]
    );
  } catch (err) {
    console.error('Activity log error:', err.message);
  }
};
