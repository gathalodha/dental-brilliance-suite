CREATE TABLE public.hero_carousel_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt_text text NOT NULL DEFAULT 'Dental clinic',
  display_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.hero_carousel_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.hero_carousel_images TO authenticated;
GRANT ALL ON public.hero_carousel_images TO service_role;

ALTER TABLE public.hero_carousel_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read visible hero carousel images"
ON public.hero_carousel_images
FOR SELECT
TO anon, authenticated
USING (visible = true OR public.is_admin());

CREATE POLICY "Admins manage hero carousel images"
ON public.hero_carousel_images
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE TRIGGER trg_hero_carousel_images_updated
BEFORE UPDATE ON public.hero_carousel_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();