import type { AnchorHTMLAttributes } from "react";
import { useSiteSettings } from "@/hooks/useContent";
import { whatsappHref } from "@/lib/seo";

/** Every booking CTA opens the clinic's WhatsApp chat from the shared site settings. */
export function useBookingHref(): string {
  const { data } = useSiteSettings();
  return whatsappHref(data?.whatsapp_number || data?.phone) ?? "#";
}

export function BookingLink(props: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const href = useBookingHref();
  return <a {...props} href={href} target="_blank" rel="noopener noreferrer" />;
}
