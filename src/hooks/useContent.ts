import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const contentKeys = {
  settings: ["site_settings"] as const,
  hero: ["hero_content"] as const,
  about: ["about_content"] as const,
  footer: ["footer_content"] as const,
  navigation: ["navigation_items"] as const,
  treatments: ["treatments"] as const,
  doctors: ["doctors"] as const,
  gallery: ["gallery_images"] as const,
  testimonials: ["testimonials"] as const,
  faqs: ["faqs"] as const,
  socialLinks: ["social_links"] as const,
  footerLinks: ["footer_links"] as const,
  appointments: ["appointments"] as const,
};

function singleton<T>(table: "site_settings" | "hero_content" | "about_content" | "footer_content", key: readonly string[]) {
  return () =>
    useQuery({
      queryKey: key,
      queryFn: async () => {
        const { data, error } = await supabase.from(table).select("*").eq("id", 1).maybeSingle();
        if (error) throw error;
        return data as T | null;
      },
    });
}

export const useSiteSettings = singleton<any>("site_settings", contentKeys.settings);
export const useHeroContent = singleton<any>("hero_content", contentKeys.hero);
export const useAboutContent = singleton<any>("about_content", contentKeys.about);
export const useFooterContent = singleton<any>("footer_content", contentKeys.footer);

function list<T>(table: string, key: readonly string[], visibleOnly = true) {
  return () =>
    useQuery({
      queryKey: [...key, { visibleOnly }],
      queryFn: async () => {
        let q = supabase.from(table as any).select("*").order("display_order", { ascending: true });
        if (visibleOnly) q = q.eq("visible", true);
        const { data, error } = await q;
        if (error) throw error;
        return (data ?? []) as T[];
      },
    });
}

export const useNavigation = list<any>("navigation_items", contentKeys.navigation);
export const useTreatments = list<any>("treatments", contentKeys.treatments);
export const useDoctors = list<any>("doctors", contentKeys.doctors);
export const useGallery = list<any>("gallery_images", contentKeys.gallery);
export const useTestimonials = list<any>("testimonials", contentKeys.testimonials);
export const useFaqs = list<any>("faqs", contentKeys.faqs);
export const useSocialLinks = list<any>("social_links", contentKeys.socialLinks);
export const useFooterLinks = list<any>("footer_links", contentKeys.footerLinks);
