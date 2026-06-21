-- ==========================================
-- ARC Films — Supabase Database Schema
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';


-- 1. BANNERS
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,             -- 'hero' | 'statement' | 'about'
  media_type TEXT NOT NULL,          -- 'image' | 'video'
  media_url TEXT NOT NULL,           -- Cloudinary URL
  alt_text TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 2. SERVICES
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,               -- 'Video Production'
  slug TEXT UNIQUE NOT NULL,         -- 'video-production'
  short_description TEXT NOT NULL,   -- Card description (home page)
  long_description TEXT,             -- Full description (services page)
  icon_svg TEXT,                     -- SVG markup for the service icon
  category_label TEXT,               -- 'Film & Cinema', 'Short Form Content'
  includes JSONB DEFAULT '[]',       -- ["Concept & Scriptwriting", "Cinematography Direction", ...]
  preview_media_type TEXT,           -- 'image' | 'video' | 'youtube'
  preview_media_url TEXT,            -- Cloudinary URL or YouTube embed URL
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 3. WORK CATEGORIES
CREATE TABLE work_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                -- 'Film & Video'
  slug TEXT UNIQUE NOT NULL,         -- 'film-video'
  display_name TEXT NOT NULL,        -- Filter tab label: 'Film & Video'
  section_title TEXT,                -- Section header: 'Film & Video'
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  item_count INT DEFAULT 0,          -- Cached count shown in section divider
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER update_work_categories_updated_at BEFORE UPDATE ON work_categories 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 4. WORK ITEMS
CREATE TABLE work_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES work_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,               -- 'Featured Production'
  subtitle TEXT,                     -- Optional category label like 'Cinematic Film'
  slug TEXT UNIQUE NOT NULL,
  media_type TEXT NOT NULL,          -- 'image' | 'video' | 'youtube'
  media_url TEXT NOT NULL,           -- Cloudinary URL or YouTube embed URL
  thumbnail_url TEXT,                -- Optional thumbnail for video items
  alt_text TEXT,
  aspect_ratio TEXT DEFAULT '16/9',  -- '16/9' | '4/3' | '1/1' | '9/16'
  is_featured BOOLEAN DEFAULT false, -- Show on home page
  is_home_showcase BOOLEAN DEFAULT false, -- Show in home work showcase carousel
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER update_work_items_updated_at BEFORE UPDATE ON work_items 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 5. FEATURED REEL
CREATE TABLE featured_reel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT DEFAULT 'ARC Films — Official Showreel',
  year TEXT DEFAULT '2024',
  video_url TEXT NOT NULL,           -- Cloudinary video URL
  thumbnail_url TEXT,                -- Poster/thumbnail image
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER update_featured_reel_updated_at BEFORE UPDATE ON featured_reel 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 6. CONTACT SUBMISSIONS
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  service TEXT,                      -- Selected service interest
  budget TEXT,                       -- Budget range
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,     -- Admin can mark as read
  is_archived BOOLEAN DEFAULT false, -- Admin can archive
  created_at TIMESTAMPTZ DEFAULT now()
);


-- 7. TOOLS
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                -- 'Premiere Pro'
  category TEXT NOT NULL,            -- 'Video Edit'
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_reel ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- 1. BANNERS POLICIES
CREATE POLICY "Allow public SELECT on active banners" ON banners
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated admin full control on banners" ON banners
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 2. SERVICES POLICIES
CREATE POLICY "Allow public SELECT on active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated admin full control on services" ON services
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 3. WORK CATEGORIES POLICIES
CREATE POLICY "Allow public SELECT on active categories" ON work_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated admin full control on categories" ON work_categories
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 4. WORK ITEMS POLICIES
CREATE POLICY "Allow public SELECT on active work items" ON work_items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated admin full control on work items" ON work_items
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 5. FEATURED REEL POLICIES
CREATE POLICY "Allow public SELECT on active featured reels" ON featured_reel
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated admin full control on featured reels" ON featured_reel
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 6. CONTACT SUBMISSIONS POLICIES
CREATE POLICY "Allow public INSERT into contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated admin full control on contact submissions" ON contact_submissions
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 7. TOOLS POLICIES
CREATE POLICY "Allow public SELECT on active tools" ON tools
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated admin full control on tools" ON tools
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
