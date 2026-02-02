# Admin Setup Guide & Default Credentials

## Quick Start - Admin Access

### Login URL
```
/admin/login
```

### Default Admin Account
**Email:** admin@novaedge.com
**Password:** (You need to create this - see setup instructions below)

---

## Creating Your First Admin User

Since the database is initially empty, create your admin user using SQL in Supabase:

### Step 1: Generate Bcrypt Hash
Use one of these methods:
- **Online Tool:** https://bcrypt.online/
- **Node.js Command:**
  ```bash
  npx bcrypt-cli hash "yourpassword"
  ```
- **Just use this for testing:** `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i` (password: "admin")

### Step 2: Insert Admin User
Go to your Supabase dashboard → SQL Editor and run:

```sql
INSERT INTO admin_users (email, password_hash, created_at)
VALUES (
  'admin@novaedge.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/R1i',
  NOW()
);
```

### Step 3: Login
- Navigate to `/admin/login`
- Email: `admin@novaedge.com`
- Password: `admin` (or your custom password)

---

## Admin Dashboard Features

### 1. Dashboard (`/admin/dashboard`)
- Main admin hub with quick links to all features
- Overview cards showing system status
- Navigation to all management sections

### 2. Contact Messages (`/admin/contact-messages`)
- View all contact form submissions from homepage
- Mark messages as read/unread
- Archive messages
- Delete messages
- View full message details including name, email, subject, and message
- Search and filter capabilities

### 3. Project Inquiries (`/admin/project-inquiries`)
- Manage project inquiry submissions from "Get Started" page
- Track inquiry status: **New** → **Reviewing** → **Quoted** → **Completed**
- View full project details:
  - Client name, email, company
  - Project description
  - Budget range
  - Timeline
  - Contact information
- Update status for each inquiry
- Archive or delete inquiries

### 4. Blog Management (`/admin/blog`)
- **List View:** See all blog posts with their status
- **Create New:** `/admin/blog/new` to write a new post
- **Edit Post:** `/admin/blog/[id]` to edit existing post
- **Publish/Unpublish:** Control which posts appear publicly
- **Delete:** Remove posts from the system

**Blog Post Fields:**
- Title (required)
- Slug (auto-generated from title)
- Content/Body (full HTML editor)
- Excerpt (short description)
- Author name
- Status: Draft or Published

**Public Blog Pages:**
- `/blog` - Lists all published posts
- `/blog/[slug]` - Individual blog post view

### 5. Company Stats (`/admin/stats`)
Manage statistics displayed on the homepage:
- **Clients Satisfied** (percentage, e.g., 98%)
- **Projects Delivered** (count, e.g., 500+)
- **Team Members** (count, e.g., 50+)
- **Years of Experience** (count, e.g., 10+)

These stats appear in the About section of the homepage automatically.

---

## Email Configuration

### Contact Form Emails
When someone submits the contact form:
1. **They receive:** Confirmation email with their message
2. **You receive:** Notification email at `hello@novaedge.com`

### Project Inquiry Emails
When someone submits a project inquiry:
1. **They receive:** Confirmation with project details
2. **You receive:** Notification with full project details

### Update Email Address
Edit these files to change recipient email:
- `/app/api/contact/route.ts` - Line: `to: 'hello@novaedge.com'`
- `/app/api/project-inquiry/route.ts` - Line: `to: 'hello@novaedge.com'`

**Email Service:** Resend
**API Key:** Set `RESEND_API_KEY` environment variable

---

## Environment Variables Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email
RESEND_API_KEY=your_resend_api_key
```

---

## Database Schema

### admin_users
```
id (UUID, primary key)
email (TEXT, unique)
password_hash (TEXT)
created_at (TIMESTAMP)
```

### admin_sessions
```
id (UUID, primary key)
user_id (UUID, foreign key to admin_users)
token (TEXT, unique)
expires_at (TIMESTAMP)
created_at (TIMESTAMP)
```

### contact_messages
```
id (UUID, primary key)
name (TEXT)
email (TEXT)
subject (TEXT)
message (TEXT)
read (BOOLEAN)
archived (BOOLEAN)
created_at (TIMESTAMP)
```

### project_inquiries
```
id (UUID, primary key)
name (TEXT)
email (TEXT)
company (TEXT)
phone (TEXT)
project_description (TEXT)
budget (TEXT)
timeline (TEXT)
status (TEXT: 'new', 'reviewing', 'quoted', 'completed')
created_at (TIMESTAMP)
```

### blog_posts
```
id (UUID, primary key)
title (TEXT)
slug (TEXT, unique)
content (TEXT)
excerpt (TEXT)
author (TEXT)
status (TEXT: 'draft', 'published')
published_at (TIMESTAMP)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### company_stats
```
id (UUID, primary key)
stat_key (TEXT, unique)
stat_value (TEXT)
updated_at (TIMESTAMP)
```

---

## Session & Security

- **Session Duration:** 30 days
- **Storage:** HTTP-only cookies (secure, inaccessible to JavaScript)
- **Password:** Bcrypt hashed (never stored in plain text)
- **API Access:** Requires valid admin session token

---

## Public Pages with Navigation Links

All these pages have navigation links in the header and footer:

- `/about` - About Us page
- `/careers` - Careers & Job opportunities
- `/blog` - Blog listing page
- `/press` - Press & media page
- `/faq` - FAQ (Frequently Asked Questions)
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service
- `/contact` - Contact page
- `/get-started` - Get Started (Multi-step project inquiry form)

---

## Troubleshooting

### Can't Login?
- ✓ Check Supabase is connected
- ✓ Verify admin_users table has entry
- ✓ Confirm password hash is correct
- ✓ Clear browser cookies

### Emails Not Sending?
- ✓ Check `RESEND_API_KEY` is set
- ✓ Verify recipient email is valid
- ✓ Check Resend dashboard for logs

### Blog Posts Not Showing?
- ✓ Ensure status = 'published'
- ✓ Check slug is URL-friendly
- ✓ Verify posts in blog_posts table

### Stats Not Updating?
- ✓ Refresh browser
- ✓ Check company_stats table
- ✓ Verify database connection
