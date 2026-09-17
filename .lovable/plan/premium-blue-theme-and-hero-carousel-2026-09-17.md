# Premium Blue Theme and Hero Carousel

## Goal
Keep the existing website and admin structure intact while applying a consistent blue-and-white dental theme and turning only the Home hero image area into an admin-managed carousel.

## Changes
- Replace the warm pearl/bronze theme tokens with a premium white, clinical-blue, and deep-navy palette so existing pages and admin controls update consistently without layout changes.
- Add an ordered `hero_carousel_images` collection in Supabase with public read access and admin-only management, preserving the current hero image as the fallback when no carousel rows exist.
- Reuse the existing private `media` storage upload flow for hero images rather than creating another storage system.
- Add a focused “Hero carousel images” manager within the existing Home — Hero admin section, with upload/add, preview, delete, and move-up/move-down controls.
- Add a public content hook for visible ordered hero images and invalidate the matching cache after admin changes.
- Convert the existing hero image box into a horizontally transitioning carousel with automatic advance, a bottom next-image arrow, optional dots, swipe support, reduced-motion handling, responsive `object-cover` images, and no controls for a single image.
- Keep the right-side hero content and all existing pages/functionality unchanged.

## Technical details
- Database columns: `id`, `image_url`, `alt_text`, `display_order`, `visible`, timestamps.
- Database access: explicit grants, RLS enabled, public visible-row reads, and `is_admin()`-guarded authenticated writes.
- The legacy `hero_content.image_url` remains supported as the default/fallback image, so existing content is never lost.
- Verify current diagnostics, TypeScript/build status, authenticated admin behavior where available, and desktop/mobile rendering at the end.
