
-- =========================================================
-- Phase 3: CMS schema
-- =========================================================

-- Reusable updated_at trigger already exists as public.update_updated_at_column()

-- =========================================================
-- ADMIN AUTHORIZATION
-- =========================================================
CREATE TABLE public.admin_emails (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_emails TO authenticated;
GRANT ALL ON public.admin_emails TO service_role;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

-- Security-definer function: is the current auth user an admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_emails ae
    JOIN auth.users u ON lower(u.email) = lower(ae.email)
    WHERE u.id = auth.uid()
  );
$$;

-- Authenticated users can check their own admin status (needed for client gate)
CREATE POLICY "Authenticated can read admin_emails"
  ON public.admin_emails FOR SELECT
  TO authenticated USING (true);

-- =========================================================
-- SINGLETON: site_settings (brand, contact, seo, floating buttons)
-- =========================================================
CREATE TABLE public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  clinic_name TEXT NOT NULL DEFAULT 'Maison Dentaire',
  brand_line TEXT DEFAULT 'Boutique dental care',
  logo_url TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#B08968',
  secondary_color TEXT DEFAULT '#F5F1EA',
  phone TEXT DEFAULT '(555) 123-4567',
  email TEXT DEFAULT 'hello@maisondentaire.com',
  address TEXT DEFAULT '24 Bronzewood Lane, Suite 5, San Francisco, CA',
  google_maps_link TEXT,
  google_maps_embed TEXT,
  whatsapp_number TEXT,
  whatsapp_message TEXT DEFAULT 'Hi, I would like to book a consultation.',
  telegram_link TEXT,
  call_button_link TEXT,
  show_whatsapp BOOLEAN NOT NULL DEFAULT true,
  show_call BOOLEAN NOT NULL DEFAULT true,
  show_telegram BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT DEFAULT 'Maison Dentaire — Boutique Dental Care',
  meta_description TEXT DEFAULT 'Modern dentistry delivered with calm, considered care.',
  meta_keywords TEXT,
  og_image_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
GRANT INSERT, UPDATE ON public.site_settings TO authenticated;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins write site_settings" ON public.site_settings FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.site_settings (id) VALUES (1);

-- =========================================================
-- SINGLETON: hero_content
-- =========================================================
CREATE TABLE public.hero_content (
  id INT PRIMARY KEY DEFAULT 1,
  brand_line TEXT DEFAULT 'Boutique dental care',
  heading TEXT NOT NULL DEFAULT 'Considered dentistry, crafted around you.',
  subheading TEXT DEFAULT 'A calm, modern practice where advanced care meets warm hospitality.',
  image_url TEXT,
  background_video_url TEXT,
  cta_text TEXT DEFAULT 'Book a visit',
  cta_link TEXT DEFAULT '/contact',
  cta_enabled BOOLEAN NOT NULL DEFAULT true,
  secondary_cta_text TEXT DEFAULT 'Explore treatments',
  secondary_cta_link TEXT DEFAULT '/treatments',
  secondary_cta_enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT hero_single_row CHECK (id = 1)
);
GRANT SELECT ON public.hero_content TO anon, authenticated;
GRANT ALL ON public.hero_content TO service_role;
GRANT INSERT, UPDATE ON public.hero_content TO authenticated;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hero" ON public.hero_content FOR SELECT USING (true);
CREATE POLICY "Admins write hero" ON public.hero_content FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_hero_updated BEFORE UPDATE ON public.hero_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.hero_content (id) VALUES (1);

-- =========================================================
-- SINGLETON: about_content
-- =========================================================
CREATE TABLE public.about_content (
  id INT PRIMARY KEY DEFAULT 1,
  title TEXT NOT NULL DEFAULT 'A practice built on trust',
  description TEXT DEFAULT 'We combine clinical excellence with a considered, gentle approach.',
  image_url TEXT,
  stat_years INT DEFAULT 20,
  stat_patients INT DEFAULT 5000,
  stat_treatments INT DEFAULT 30,
  cta_text TEXT DEFAULT 'Learn more',
  cta_link TEXT DEFAULT '/about',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT about_single_row CHECK (id = 1)
);
GRANT SELECT ON public.about_content TO anon, authenticated;
GRANT ALL ON public.about_content TO service_role;
GRANT INSERT, UPDATE ON public.about_content TO authenticated;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read about" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Admins write about" ON public.about_content FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_about_updated BEFORE UPDATE ON public.about_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.about_content (id) VALUES (1);

-- =========================================================
-- SINGLETON: footer_content
-- =========================================================
CREATE TABLE public.footer_content (
  id INT PRIMARY KEY DEFAULT 1,
  description TEXT DEFAULT 'A boutique dental practice where clinical excellence meets calm, considered design.',
  address TEXT DEFAULT '24 Bronzewood Lane, Suite 5, San Francisco, CA',
  phone TEXT DEFAULT '(555) 123-4567',
  email TEXT DEFAULT 'hello@maisondentaire.com',
  google_maps_link TEXT,
  hours_mon_thu TEXT DEFAULT '8am — 6pm',
  hours_fri TEXT DEFAULT '8am — 4pm',
  hours_sat TEXT DEFAULT 'By appointment',
  hours_sun TEXT DEFAULT 'Closed',
  copyright_text TEXT DEFAULT '© Maison Dentaire. All rights reserved.',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT footer_single_row CHECK (id = 1)
);
GRANT SELECT ON public.footer_content TO anon, authenticated;
GRANT ALL ON public.footer_content TO service_role;
GRANT INSERT, UPDATE ON public.footer_content TO authenticated;
ALTER TABLE public.footer_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read footer" ON public.footer_content FOR SELECT USING (true);
CREATE POLICY "Admins write footer" ON public.footer_content FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_footer_updated BEFORE UPDATE ON public.footer_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.footer_content (id) VALUES (1);

-- =========================================================
-- GENERIC LIST TABLES
-- =========================================================

-- Navigation items
CREATE TABLE public.navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.navigation_items TO anon, authenticated;
GRANT ALL ON public.navigation_items TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.navigation_items TO authenticated;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read nav" ON public.navigation_items FOR SELECT USING (true);
CREATE POLICY "Admins write nav" ON public.navigation_items FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_nav_updated BEFORE UPDATE ON public.navigation_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.navigation_items (label, href, display_order) VALUES
  ('Home','/',1),('About','/about',2),('Treatments','/treatments',3),
  ('Doctors','/doctors',4),('Gallery','/gallery',5),('Journal','/blog',6),
  ('FAQs','/faqs',7),('Contact','/contact',8);

-- Treatments
CREATE TABLE public.treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.treatments TO anon, authenticated;
GRANT ALL ON public.treatments TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.treatments TO authenticated;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read treatments" ON public.treatments FOR SELECT USING (true);
CREATE POLICY "Admins write treatments" ON public.treatments FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_treatments_updated BEFORE UPDATE ON public.treatments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.treatments (name, description, display_order) VALUES
  ('Cosmetic Dentistry','Veneers, whitening, and smile design.',1),
  ('Orthodontics','Clear aligners and modern braces.',2),
  ('Implants','Permanent restorations built to last.',3),
  ('Hygiene','Preventive care and periodontal health.',4),
  ('Endodontics','Gentle, precise root canal therapy.',5),
  ('Pediatric','Warm, calm care for the youngest patients.',6);

-- Doctors
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  qualification TEXT,
  specialization TEXT,
  experience TEXT,
  bio TEXT,
  image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.doctors TO anon, authenticated;
GRANT ALL ON public.doctors TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.doctors TO authenticated;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Admins write doctors" ON public.doctors FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_doctors_updated BEFORE UPDATE ON public.doctors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.doctors (name, qualification, specialization, experience, bio, display_order) VALUES
  ('Dr. Amelia Rose','DDS, MSc','Cosmetic & Restorative','15 years','Founder of Maison Dentaire, dedicated to considered aesthetic dentistry.',1),
  ('Dr. Julien Marchand','DDS','Orthodontics','12 years','Specialist in clear aligner therapy and adult orthodontics.',2),
  ('Dr. Sofia Chen','DDS, MPH','Implants & Surgery','10 years','Focused on minimally invasive implant restoration.',3);

-- Gallery
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_images TO anon, authenticated;
GRANT ALL ON public.gallery_images TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Admins write gallery" ON public.gallery_images FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_gallery_updated BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  image_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.testimonials TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins write testimonials" ON public.testimonials FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_testimonials_updated BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.testimonials (patient_name, review, rating, display_order) VALUES
  ('Isabelle M.','Truly the most calming dental experience I have ever had.',5,1),
  ('Marcus D.','Beautiful space and phenomenal care. Highly recommended.',5,2),
  ('Priya S.','My veneers look natural and the whole process felt effortless.',5,3);

-- FAQs
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT ALL ON public.faqs TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Admins write faqs" ON public.faqs FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_faqs_updated BEFORE UPDATE ON public.faqs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.faqs (question, answer, display_order) VALUES
  ('Do you accept new patients?','Yes — we welcome new patients and offer complimentary consultations.',1),
  ('What insurance do you accept?','We work with most major PPO plans; contact us for specifics.',2),
  ('How do I book an appointment?','Use the booking form on our Contact page, or call us directly.',3);

-- Social links
CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.social_links TO anon, authenticated;
GRANT ALL ON public.social_links TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.social_links TO authenticated;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read socials" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Admins write socials" ON public.social_links FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_socials_updated BEFORE UPDATE ON public.social_links
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.social_links (platform, url, display_order) VALUES
  ('instagram','https://instagram.com',1),
  ('facebook','https://facebook.com',2);

-- Footer navigation links
CREATE TABLE public.footer_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.footer_links TO anon, authenticated;
GRANT ALL ON public.footer_links TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.footer_links TO authenticated;
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read footer_links" ON public.footer_links FOR SELECT USING (true);
CREATE POLICY "Admins write footer_links" ON public.footer_links FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_footer_links_updated BEFORE UPDATE ON public.footer_links
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.footer_links (label, href, display_order) VALUES
  ('About','/about',1),('Treatments','/treatments',2),('Contact','/contact',3),
  ('Privacy Policy','/privacy',4),('Terms','/terms',5);

-- Lock down appointments so only admins can read them (currently no SELECT policy)
CREATE POLICY "Admins read appointments" ON public.appointments FOR SELECT
  TO authenticated USING (public.is_admin());
CREATE POLICY "Admins update appointments" ON public.appointments FOR UPDATE
  TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete appointments" ON public.appointments FOR DELETE
  TO authenticated USING (public.is_admin());
