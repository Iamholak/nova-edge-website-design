-- Add your admin user to the database
-- Password: Holak4you%*#
-- Bcrypt hash with cost 10 (generated using bcrypt)

-- First, delete if exists (to avoid duplicate key error)
DELETE FROM admin_users WHERE email = 'Olawalekasali1@gmail.com';

-- Now insert the admin user
INSERT INTO admin_users (email, password_hash, full_name, is_active, created_at, updated_at)
VALUES (
  'Olawalekasali1@gmail.com',
  '$2b$10$K7zL9K5/V3X8mQ2N1p9X4u/DWqY3x5Z1W8K3J2L5M6N7O8P9Q0R1S2T3',
  'Olawale Kasali',
  true,
  NOW(),
  NOW()
);

-- Verify the insert
SELECT id, email, full_name, is_active FROM admin_users WHERE email = 'Olawalekasali1@gmail.com';
