# Admin Setup Guide

## Default Admin Credentials

After setting up your Supabase database, create an admin user using the following SQL in Supabase SQL Editor:

```sql
-- Insert default admin user (Password: Admin@12345)
INSERT INTO admin_users (email, password_hash, name, created_at)
VALUES (
  'admin@novaedge.com',
  '$2a$10$YOUR_BCRYPT_HASH_HERE', -- Replace with bcrypt hash of your password
  'Admin User',
  NOW()
);
```

## How to Generate Bcrypt Hash

To create your own admin user with a custom password:

1. Use an online bcrypt generator: https://bcrypt.online/
2. Enter your desired password (e.g., "MySecurePassword123")
3. Use hash rounds: 10
4. Copy the generated hash
5. Replace `YOUR_BCRYPT_HASH_HERE` in the SQL above with the hash
6. Run the SQL in Supabase

## Accessing Admin Panel

### URL
```
/admin/login
```

### Login Steps
1. Navigate to `https://yourdomain.com/admin/login`
2. Enter your email: `admin@novaedge.com`
3. Enter your password: (the one you hashed above)
4. Click "Login"

### Admin Dashboard
Once logged in, you'll have access to:
- **Contact Messages** - View and manage contact form submissions
- **Project Inquiries** - View and manage project inquiry submissions with budget and timeline
- **Blog Posts** - Create, edit, and delete blog posts
- **Company Stats** - Update client satisfaction, projects delivered, team members, and years of experience

## Email Configuration

All emails are sent via Resend. Update email addresses in:
- `/app/api/contact/route.ts` - Change `hello@novaedge.com` to your actual email
- `/app/api/project-inquiry/route.ts` - Change `hello@novaedge.com` to your actual email

## Database Tables

The system uses the following Supabase tables:
- `admin_users` - Admin user accounts
- `admin_sessions` - Admin login sessions
- `contact_messages` - Contact form submissions
- `project_inquiries` - Project inquiry submissions
- `blog_posts` - Blog post content
- `company_stats` - Company statistics (clients, projects, team, experience)

## Troubleshooting

### Can't login?
- Make sure Supabase is connected and the database migration ran
- Verify the admin_users table has an entry
- Check that the password hash is correct

### Emails not sending?
- Verify RESEND_API_KEY is set in environment variables
- Check the email address is valid
- Look at server logs for error messages

### 404 on admin pages?
- Make sure you're logged in first
- Clear browser cache and cookies
- Check browser console for errors
