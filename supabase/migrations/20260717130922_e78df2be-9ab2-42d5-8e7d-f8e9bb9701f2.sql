
-- Add emergency phone to shared site settings
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS emergency_phone text;

-- Page visibility table (toggles pages on/off across the site)
CREATE TABLE IF NOT EXISTS public.page_visibility (
  slug text PRIMARY KEY,
  label text NOT NULL,
  visible boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.page_visibility TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_visibility TO authenticated;
GRANT ALL ON public.page_visibility TO service_role;

ALTER TABLE public.page_visibility ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read page visibility"
  ON public.page_visibility FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins manage page visibility"
  ON public.page_visibility FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TRIGGER trg_page_visibility_updated_at
  BEFORE UPDATE ON public.page_visibility
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.page_visibility (slug, label, display_order) VALUES
  ('about', 'About', 10),
  ('treatments', 'Treatments', 20),
  ('doctors', 'Doctors', 30),
  ('gallery', 'Gallery', 40),
  ('testimonials', 'Testimonials', 50),
  ('faqs', 'FAQs', 60),
  ('blog', 'Journal', 70),
  ('contact', 'Contact', 80)
ON CONFLICT (slug) DO NOTHING;
