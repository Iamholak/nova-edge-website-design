# NovaEdge Solutions - Complete Backend System Setup

## Overview
This document explains the complete backend system that has been built for NovaEdge Solutions, including:
- Admin authentication and dashboard
- Contact form and email integration
- Project inquiry management
- Blog system with admin interface
- Company statistics management
- Static pages (About, Careers, FAQ, Privacy, Terms, Contact)

## Required Environment Variables

Make sure you have these environment variables set in your Vercel project:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
```

## Database Setup

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create a new project
- Copy your project URL and API keys
- Add them to your Vercel environment variables

### 2. Execute Database Migration
The database schema is defined in `/scripts/init-database.sql`. To set up your database:

**Option A: Using Supabase Dashboard**
1. Go to SQL Editor in your Supabase dashboard
2. Create a new query
3. Copy the contents of `/scripts/init-database.sql`
4. Run the query

**Option B: Using psql CLI**
```bash
psql postgresql://[user]:[password]@[host]/postgres < scripts/init-database.sql
```

### 3. Create Admin User
Currently, admin users must be created directly in the database. You can use the Supabase dashboard or psql:

```sql
INSERT INTO admin_users (email, password_hash, full_name, is_active)
VALUES (
  'admin@novaedge.com',
  '$2b$10$...', -- bcrypt hash of your password
  'Admin Name',
  true
);
```

Or use the API to create one via a setup endpoint (not yet implemented).

## Features & API Routes

### Admin System

**Authentication**
- `POST /api/admin/login` - Admin login
- `GET/POST /api/admin/auth` - Check auth status / logout
- Pages: `/admin/login`, `/admin/dashboard`

**Contact Messages**
- `GET /api/admin/contact-messages` - List all messages
- `PATCH /api/admin/contact-messages/[id]` - Update message status
- `DELETE /api/admin/contact-messages/[id]` - Delete message
- Page: `/admin/contact-messages`

**Project Inquiries**
- `GET /api/admin/project-inquiries` - List all inquiries
- `PATCH /api/admin/project-inquiries/[id]` - Update inquiry status
- `DELETE /api/admin/project-inquiries/[id]` - Delete inquiry
- Page: `/admin/project-inquiries`

**Blog Management**
- `GET /api/admin/blog` - List all posts
- `POST /api/admin/blog` - Create new post
- `GET /api/admin/blog/[id]` - Get post details
- `PATCH /api/admin/blog/[id]` - Update post
- `DELETE /api/admin/blog/[id]` - Delete post
- Pages: `/admin/blog`, `/admin/blog/[id]`, `/admin/blog/new`

**Company Statistics**
- `GET /api/admin/stats` - Get all stats
- `PATCH /api/admin/stats/[id]` - Update a stat
- Page: `/admin/stats`

### Public API

**Contact Form**
- `POST /api/contact` - Submit contact message
- Sends emails to user and admin

**Project Inquiry**
- `POST /api/project-inquiry` - Submit project inquiry
- Sends emails to user and admin

**Blog (Public)**
- `GET /api/blog` - List published posts
- `GET /api/blog/[slug]` - Get single post by slug

## Pages Overview

### Admin Pages
- `/admin/login` - Admin login
- `/admin/dashboard` - Main dashboard
- `/admin/contact-messages` - View contact messages
- `/admin/project-inquiries` - View project inquiries
- `/admin/blog` - Blog post management
- `/admin/blog/new` - Create new post
- `/admin/blog/[id]` - Edit post
- `/admin/stats` - Manage company statistics

### Public Pages
- `/` - Home page
- `/about` - About Us
- `/careers` - Careers
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post
- `/press` - Press
- `/contact` - Contact page
- `/faq` - FAQ
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service

## Email Integration with Resend

### Setup
1. Get API key from [resend.com](https://resend.com)
2. Add `RESEND_API_KEY` to environment variables
3. Update the `from` email address in `/app/api/contact/route.ts` and `/app/api/project-inquiry/route.ts`

### Email Templates
Emails are sent to both:
- **User**: Confirmation that their message was received
- **Admin**: Notification of new submission at `hello@novaedge.com`

You can customize the email templates in the API routes.

## Authentication Flow

1. User goes to `/admin/login`
2. Enters credentials
3. System verifies against `admin_users` table (bcrypt password comparison)
4. Creates a session in `admin_sessions` table
5. Sets HTTP-only cookie with session token
6. All protected routes check the cookie and verify the session

## Database Schema

### Tables
- `admin_users` - Admin user accounts
- `admin_sessions` - Admin sessions for authentication
- `contact_messages` - Contact form submissions
- `project_inquiries` - Project inquiry submissions
- `blog_posts` - Blog posts
- `blog_categories` - Blog categories
- `blog_post_categories` - Join table for posts and categories
- `company_stats` - Company statistics (clients, projects, team, experience)

## Security Considerations

1. ✅ Passwords are hashed with bcrypt (10 rounds)
2. ✅ Sessions use secure HTTP-only cookies
3. ✅ All admin endpoints require authentication
4. ✅ CSRF protection via cookie Same-Site policy
5. ⚠️ TODO: Add rate limiting on contact/inquiry endpoints
6. ⚠️ TODO: Add input validation and sanitization
7. ⚠️ TODO: Enable Row Level Security (RLS) on Supabase tables

## Common Tasks

### Add New Admin User
```sql
INSERT INTO admin_users (email, password_hash, full_name)
VALUES ('newadmin@novaedge.com', '$2b$10$...', 'New Admin');
```

### Reset Admin Password
Update the password_hash directly in the admin_users table with a new bcrypt hash.

### Publish Blog Post
1. Go to `/admin/blog`
2. Click on a post or create new
3. Fill in content
4. Click "Publish" button
5. Post will be visible at `/blog`

### Update Company Stats
1. Go to `/admin/dashboard`
2. Click "Company Stats"
3. Update the numbers
4. Click "Save All Changes"
5. Stats will display on home page

## Troubleshooting

**Login not working?**
- Check if admin user exists in `admin_users` table
- Verify password is correct (stored as bcrypt hash)
- Check browser cookies are enabled

**Emails not sending?**
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for bounce/failure logs
- Update the `from` email address in API routes

**Blog posts not showing?**
- Verify posts are published (status = 'published')
- Check posts have a valid slug
- Ensure published_at is set

**Database migration failed?**
- Check Supabase connection
- Verify all tables don't already exist
- Check for SQL syntax errors

## Next Steps

1. Run the database migration
2. Create an admin user
3. Test login at `/admin/login`
4. Add Resend API key for email functionality
5. Update email addresses (hello@novaedge.com) to your actual email
6. Create first blog post at `/admin/blog/new`
7. Update company stats at `/admin/stats`

## Support

For issues or questions, contact the development team or check the Supabase and Resend documentation.
