-- Enable RLS on contact_messages table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts on contact_messages
CREATE POLICY "Allow anonymous insert on contact_messages"
ON contact_messages
FOR INSERT
WITH CHECK (true);

-- Create policy to allow anonymous reads (optional, for future use)
CREATE POLICY "Allow anonymous read on contact_messages"
ON contact_messages
FOR SELECT
USING (true);

-- Enable RLS on project_inquiries table
ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts on project_inquiries
CREATE POLICY "Allow anonymous insert on project_inquiries"
ON project_inquiries
FOR INSERT
WITH CHECK (true);

-- Create policy to allow anonymous reads (optional, for future use)
CREATE POLICY "Allow anonymous read on project_inquiries"
ON project_inquiries
FOR SELECT
USING (true);

-- Enable RLS on company_stats table (admin only for updates)
ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read stats
CREATE POLICY "Allow public read on company_stats"
ON company_stats
FOR SELECT
USING (true);

-- Protect other tables from public access
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Blog posts - allow public read for published posts
CREATE POLICY "Allow public read published blog posts"
ON blog_posts
FOR SELECT
USING (status = 'published');

-- Blog categories - allow public read
CREATE POLICY "Allow public read blog categories"
ON blog_categories
FOR SELECT
USING (true);

-- Blog post categories - allow public read
CREATE POLICY "Allow public read blog post categories"
ON blog_post_categories
FOR SELECT
USING (true);
