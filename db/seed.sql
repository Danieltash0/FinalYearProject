-- Seed data for local development.
-- Keep enough milking history per cow (3+ records) to exercise the
-- recommender's moving-average path, not just the cold-start fallback.

INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@dairydan.com', 'CHANGE_ME_HASHED', 'admin');
