-- Create admin_users table ONLY
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON public.admin_users(email);

-- Insert admin user (password: admin)
INSERT INTO public.admin_users (email, password_hash, full_name, is_active)
VALUES (
  'admin@novaedge.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i',
  'Admin User',
  true
)
ON CONFLICT (email) DO UPDATE SET 
  password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i',
  is_active = true;
