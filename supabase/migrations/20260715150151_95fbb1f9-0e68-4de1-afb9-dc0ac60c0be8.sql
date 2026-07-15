
ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS short_description text,
  ADD COLUMN IF NOT EXISTS duration text,
  ADD COLUMN IF NOT EXISTS cta_text text,
  ADD COLUMN IF NOT EXISTS cta_link text,
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS benefits text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS procedure_details text;

ALTER TABLE public.doctors
  ADD COLUMN IF NOT EXISTS role_label text,
  ADD COLUMN IF NOT EXISTS focus text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS consultation_details text,
  ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '{}'::jsonb;

ALTER TABLE public.gallery_images
  ADD COLUMN IF NOT EXISTS category text;

ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS treatment_type text,
  ADD COLUMN IF NOT EXISTS review_date date;

ALTER TABLE public.faqs
  ADD COLUMN IF NOT EXISTS category text;
