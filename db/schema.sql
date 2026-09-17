-- DairyDan database schema
-- Add CREATE TABLE statements here as each module is built.
-- Keep this file as the single source of truth; track incremental changes
-- as dated files under db/migrations/.

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role ENUM('manager', 'vet', 'worker', 'admin') NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
