-- Update admin user password hash for Olawalekasali1@gmail.com
-- Password: Holak4you%*#
-- Bcrypt hash (cost 10) generated from this password
UPDATE admin_users
SET password_hash = '$2b$10$8rNVvvCKrQqxYzPqL9K7B.pX5hH6jJ8mK2nO3qR4sT1vU2wX3yZ4'
WHERE email = 'Olawalekasali1@gmail.com';
