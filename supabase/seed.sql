-- ==========================================
-- ARC Films — Seed Data
-- ==========================================

-- 1. BANNERS (3 rows)
INSERT INTO banners (section, media_type, media_url, alt_text, is_active, sort_order) VALUES
  ('hero', 'video', 'https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427499/reel_qfz921.mp4', 'ARC Films Hero Reel', true, 1),
  ('statement', 'image', 'https://res.cloudinary.com/dnrbe1dpn/image/upload/v1782014120/arc-films/about.jpg', 'ARC Films behind the scenes', true, 2),
  ('about', 'image', 'https://res.cloudinary.com/dnrbe1dpn/image/upload/v1782014120/arc-films/about.jpg', 'ARC Films - Behind the Scenes', true, 3);

-- 2. FEATURED REEL (1 row)
INSERT INTO featured_reel (title, year, video_url, thumbnail_url, is_active) VALUES
  ('ARC Films — Official Showreel', '2024', 'https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427499/reel_qfz921.mp4', 'https://res.cloudinary.com/dnrbe1dpn/image/upload/v1782014128/arc-films/reel.jpg', true);

-- 3. SERVICES (6 rows)
INSERT INTO services (title, slug, short_description, long_description, icon_svg, category_label, includes, sort_order, is_active) VALUES
  ('Video Production', 'video-production',
   'Cinematic storytelling from concept to final cut. Films, documentaries, commercials, and branded content that move people.',
   'Full-spectrum video production — from initial concept and scriptwriting through to final delivery. We handle pre-production planning, on-set direction, cinematography, editing, color grading, and sound design.',
   '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="12" stroke="#3b82f6" stroke-width="1.5"/><circle cx="20" cy="20" r="5" fill="#3b82f6"/><line x1="20" y1="2" x2="20" y2="8" stroke="#3b82f6" stroke-width="1.5"/><line x1="20" y1="32" x2="20" y2="38" stroke="#3b82f6" stroke-width="1.5"/><line x1="2" y1="20" x2="8" y2="20" stroke="#3b82f6" stroke-width="1.5"/><line x1="32" y1="20" x2="38" y2="20" stroke="#3b82f6" stroke-width="1.5"/></svg>',
   'Film & Cinema',
   '["Concept & Scriptwriting","Cinematography Direction","Professional Editing","Color Grading","Sound Design & Mix","Final Delivery (All Platforms)"]',
   1, true),

  ('Motion Graphics', 'motion-graphics',
   'Short-form content, reels, and dynamic visual narratives crafted for maximum impact across every platform.',
   'Dynamic motion design for social media, ads, explainers, and brand storytelling. We create scroll-stopping content optimized for every platform.',
   '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="8" y="12" width="24" height="16" rx="2" stroke="#3b82f6" stroke-width="1.5"/><path d="M16 8 L24 8" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/><path d="M16 32 L24 32" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/><path d="M17 18 L23 20 L17 22 Z" fill="#3b82f6"/></svg>',
   'Short Form Content',
   '["Social Media Reels","Motion Typography","Animated Explainers","Platform Optimization","Trend-Driven Content"]',
   2, true),

  ('Logo Design', 'logo-design',
   'Marks that endure. Strategic visual identities built on research, craft, and a deep understanding of your brand''s DNA.',
   'We design logos that are timeless, versatile, and deeply meaningful. Every mark we create is backed by research and built to work across every medium.',
   '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 6 C28 6 34 12 34 20 C34 28 28 34 20 34 C12 34 6 28 6 20 C6 12 12 6 20 6Z" stroke="#3b82f6" stroke-width="1.5" fill="none"/><path d="M14 20 L20 14 L26 20 L20 26 Z" stroke="#3b82f6" stroke-width="1.5" fill="none"/></svg>',
   'Brand & Identity',
   '["Brand Research & Strategy","Concept Sketching","Digital Refinement","Brand Guidelines","Multi-Format Delivery"]',
   3, true),

  ('Brand Identity', 'brand-identity',
   'Complete visual systems — from color theory to typography, every touchpoint crafted to make your brand unforgettable.',
   'End-to-end brand identity design. We build complete visual systems including color palettes, typography, patterns, stationery, and comprehensive brand guidelines.',
   '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="6" width="12" height="12" rx="2" stroke="#3b82f6" stroke-width="1.5"/><rect x="22" y="6" width="12" height="12" rx="2" stroke="#3b82f6" stroke-width="1.5"/><rect x="6" y="22" width="12" height="12" rx="2" stroke="#3b82f6" stroke-width="1.5"/><rect x="22" y="22" width="12" height="12" rx="2" stroke="#3b82f6" stroke-width="1.5"/></svg>',
   'Brand & Identity',
   '["Visual Identity System","Color & Typography","Brand Collateral","Stationery Design","Brand Guidelines Document"]',
   4, true),

  ('3D Animation', '3d-animation',
   'Dimensional storytelling that blurs the line between art and technology. Product visualizations to abstract motion art.',
   'From product visualizations and architectural renders to character animation and abstract motion art — we bring ideas into three dimensions.',
   '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 8 L28 16 L20 32 L12 16 Z" stroke="#3b82f6" stroke-width="1.5" fill="none"/><circle cx="20" cy="16" r="3" fill="#3b82f6"/></svg>',
   '3D & VFX',
   '["3D Modeling","Character Animation","Environment Design","Product Visualization","Rendering & Compositing"]',
   5, true),

  ('Thumbnail Design', 'thumbnail-design',
   'Click-stopping thumbnail art that converts browsers into viewers. Psychology-driven design that communicates in milliseconds.',
   'Thumbnails designed with psychology and data in mind. We create click-worthy visuals that increase engagement and drive views.',
   '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="8" width="28" height="20" rx="2" stroke="#3b82f6" stroke-width="1.5"/><rect x="10" y="12" width="10" height="8" rx="1" fill="#3b82f6" opacity="0.3"/><rect x="22" y="12" width="8" height="3" rx="1" fill="#3b82f6" opacity="0.5"/><rect x="22" y="17" width="6" height="3" rx="1" fill="#3b82f6" opacity="0.5"/></svg>',
   'Design',
   '["Concept & Composition","Typography Design","Color Psychology","A/B Testing Variants","Platform Optimization"]',
   6, true);

-- 4. WORK CATEGORIES (7 rows)
INSERT INTO work_categories (name, slug, display_name, section_title, sort_order, is_active, item_count) VALUES
  ('Film & Video', 'video', 'Film & Video', 'Film & Video', 1, true, 5),
  ('Logo Design', 'logo', 'Logo Design', 'Logo Portfolio', 2, true, 12),
  ('Logo Animation', 'logo-anim', 'Logo Animation', 'Logo Animation', 3, true, 2),
  ('Motion Graphics', 'motion', 'Motion Graphics', 'Short Form Content', 4, true, 1),
  ('Brand Identity', 'branding', 'Brand Identity', 'Brand Identity', 5, true, 1),
  ('3D Animation', '3d', '3D Animation', '3D Animation', 6, true, 4),
  ('Thumbnail Design', 'thumbnails', 'Thumbnails', 'Thumbnail Design', 7, true, 10);

-- 5. WORK ITEMS

-- 5a. Film & Video category (YouTube embeds + showcase video)
INSERT INTO work_items (category_id, title, subtitle, slug, media_type, media_url, is_featured, is_home_showcase, sort_order, is_active) VALUES
  ((SELECT id FROM work_categories WHERE slug='video'), 'Cinematic Showreel', 'Video Production', 'cinematic-showreel', 'video', 'https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427524/video_pwazu4.mp4', true, true, 1, true),
  ((SELECT id FROM work_categories WHERE slug='video'), 'Featured Film', NULL, 'featured-film', 'youtube', 'https://www.youtube.com/embed/YKV7ap2W-ss?si=nHkSFcd2FUjP6PYu', false, false, 2, true),
  ((SELECT id FROM work_categories WHERE slug='video'), 'Cinematic Story', NULL, 'cinematic-story', 'youtube', 'https://www.youtube.com/embed/1QC9X_QW52k?si=Lmx7A3AwMjMkB_Rm', false, false, 3, true),
  ((SELECT id FROM work_categories WHERE slug='video'), 'Emotional Journey', NULL, 'emotional-journey', 'youtube', 'https://www.youtube.com/embed/XbIqAguXTS4?si=jwGa3GzdbYv6IM_p', false, false, 4, true),
  ((SELECT id FROM work_categories WHERE slug='video'), 'Visual Poetry', NULL, 'visual-poetry', 'youtube', 'https://www.youtube.com/embed/2TZszpoCUrI?si=KqrRBKNYZVHWLXhB', false, false, 5, true),
  ((SELECT id FROM work_categories WHERE slug='video'), 'Documentary Reel', NULL, 'documentary-reel', 'youtube', 'https://www.youtube.com/embed/M__w4K27iO8?si=wNbrluriGiTCYG_U', false, false, 6, true);

-- 5b. Logo Design category (12 logo images)
INSERT INTO work_items (category_id, title, slug, media_type, media_url, alt_text, sort_order, is_active) VALUES
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 1', 'logo-1', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427617/1_gipsva.png', 'Logo 1', 1, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 2', 'logo-2', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427616/2_bdoh9s.png', 'Logo 2', 2, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 3', 'logo-3', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427617/3_q1bvhu.jpg', 'Logo 3', 3, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 4', 'logo-4', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427618/4_quskhm.jpg', 'Logo 4', 4, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 5', 'logo-5', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427618/5_vxn5se.jpg', 'Logo 5', 5, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 6', 'logo-6', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427620/6_eio16e.jpg', 'Logo 6', 6, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 7', 'logo-7', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427617/7_bb3kkz.jpg', 'Logo 7', 7, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 8', 'logo-8', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427620/8_rwrklf.jpg', 'Logo 8', 8, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 9', 'logo-9', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427618/9_lbhsjd.png', 'Logo 9', 9, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 10', 'logo-10', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427624/10_ozxj05.jpg', 'Logo 10', 10, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 11', 'logo-11', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427626/11_bkelts.jpg', 'Logo 11', 11, true),
  ((SELECT id FROM work_categories WHERE slug='logo'), 'Logo 12', 'logo-12', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427625/12_lplpat.jpg', 'Logo 12', 12, true);

-- 5c. Logo Animation category (showcase items)
INSERT INTO work_items (category_id, title, subtitle, slug, media_type, media_url, is_featured, is_home_showcase, sort_order, is_active) VALUES
  ((SELECT id FROM work_categories WHERE slug='logo-anim'), 'Dynamic Brand Reveal', 'Logo Animation', 'dynamic-brand-reveal', 'video', 'https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427486/logo_q70c1i.mp4', false, true, 1, true),
  ((SELECT id FROM work_categories WHERE slug='logo-anim'), 'Logo in Motion', 'Motion', 'logo-in-motion', 'video', 'https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427467/log_animation_anibuj.mp4', false, true, 2, true);

-- 5d. Motion Graphics category (showcase item)
INSERT INTO work_items (category_id, title, subtitle, slug, media_type, media_url, is_featured, is_home_showcase, sort_order, is_active) VALUES
  ((SELECT id FROM work_categories WHERE slug='motion'), 'Viral Moments', 'Short Form Content', 'viral-moments', 'video', 'https://res.cloudinary.com/dkodvlw5s/video/upload/v1737427499/reel_qfz921.mp4', false, true, 1, true);

-- 5e. Brand Identity category (showcase item)
INSERT INTO work_items (category_id, title, subtitle, slug, media_type, media_url, is_featured, is_home_showcase, sort_order, is_active) VALUES
  ((SELECT id FROM work_categories WHERE slug='branding'), 'Identity Systems', 'Brand Identity', 'identity-systems', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427466/brand-identity-preview_nkj7du.jpg', false, true, 1, true);

-- 5f. 3D Animation category (4 videos + showcase)
INSERT INTO work_items (category_id, title, slug, media_type, media_url, aspect_ratio, is_featured, is_home_showcase, sort_order, is_active) VALUES
  ((SELECT id FROM work_categories WHERE slug='3d'), 'Dimensional Worlds', 'dimensional-worlds', 'video', 'https://res.cloudinary.com/dkodvlw5s/video/upload/v1737514508/3d_scene_1_2_zpi58f.mp4', '16/9', true, true, 1, true),
  ((SELECT id FROM work_categories WHERE slug='3d'), '3D Scene', '3d-scene', 'video', 'https://res.cloudinary.com/dkodvlw5s/video/upload/v1737514693/3d_ih4mik.mp4', '16/9', false, false, 2, true),
  ((SELECT id FROM work_categories WHERE slug='3d'), 'Character Animation', 'character-animation', 'video', 'https://res.cloudinary.com/dkodvlw5s/video/upload/v1737514596/1_xytlei.mp4', '9/16', false, false, 3, true),
  ((SELECT id FROM work_categories WHERE slug='3d'), 'Stylized Portrait', 'stylized-portrait', 'video', 'https://res.cloudinary.com/dkodvlw5s/video/upload/v1737514538/3d_sam_houser_kxfy3t.mp4', '16/9', false, false, 4, true);

-- 5g. Thumbnail Design category (10 images)
INSERT INTO work_items (category_id, title, slug, media_type, media_url, alt_text, sort_order, is_active) VALUES
  ((SELECT id FROM work_categories WHERE slug='thumbnails'), 'Thumbnail 1', 'thumb-1', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512064/Thumbnail_1_f7zjxd.png', 'Thumbnail 1', 1, true),
  ((SELECT id FROM work_categories WHERE slug='thumbnails'), 'Thumbnail 2', 'thumb-2', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512064/mr_beast_wbvmpp.png', 'Thumbnail 2', 2, true),
  ((SELECT id FROM work_categories WHERE slug='thumbnails'), 'Thumbnail 3', 'thumb-3', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512061/1_ee0dvs.jpg', 'Thumbnail 3', 3, true),
  ((SELECT id FROM work_categories WHERE slug='thumbnails'), 'Thumbnail 4', 'thumb-4', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512059/fianl_qinatl.png', 'Thumbnail 4', 4, true),
  ((SELECT id FROM work_categories WHERE slug='thumbnails'), 'Thumbnail 5', 'thumb-5', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512057/6_pwt7xa.png', 'Thumbnail 5', 5, true),
  ((SELECT id FROM work_categories WHERE slug='thumbnails'), 'Thumbnail 6', 'thumb-6', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512057/v1_see1wc.png', 'Thumbnail 6', 6, true),
  ((SELECT id FROM work_categories WHERE slug='thumbnails'), 'Thumbnail 7', 'thumb-7', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737512057/4_fv4g2m.png', 'Thumbnail 7', 7, true),
  ((SELECT id FROM work_categories WHERE slug='thumbnails'), 'Thumbnail 8', 'thumb-8', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427725/thubnail_real_estate-min_iapywm.png', 'Thumbnail 8', 8, true),
  ((SELECT id FROM work_categories WHERE slug='thumbnails'), 'Thumbnail 9', 'thumb-9', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427722/thubnail_3-min_khqjiz.png', 'Thumbnail 9', 9, true),
  ((SELECT id FROM work_categories WHERE slug='thumbnails'), 'Thumbnail 10', 'thumb-10', 'image', 'https://res.cloudinary.com/dkodvlw5s/image/upload/v1737427720/journalism-min_ezgsnt.jpg', 'Thumbnail 10', 10, true);

-- 6. TOOLS (12 rows)
INSERT INTO tools (name, category, sort_order, is_active) VALUES
  ('Premiere Pro', 'Video Edit', 1, true),
  ('After Effects', 'Motion', 2, true),
  ('Cinema 4D', '3D', 3, true),
  ('Blender', '3D', 4, true),
  ('Photoshop', 'Design', 5, true),
  ('Illustrator', 'Design', 6, true),
  ('DaVinci Resolve', 'Color Grade', 7, true),
  ('Figma', 'UI / Brand', 8, true),
  ('ARRI ALEXA', 'Camera', 9, true),
  ('Sony FX6', 'Camera', 10, true),
  ('DJI Ronin', 'Stabilizer', 11, true),
  ('RED Camera', 'Cinema', 12, true);
