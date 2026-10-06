export const SITE_URL = "https://premium-patient-web.lovable.app";
export const CLINIC_NAME = "Dental Brilliance Suite";
export const CLINIC_PHONE = "+919209429989";
export const CLINIC_LOCALITY = "Nashik";

/** Normalises an Indian phone number to digits with country code (e.g. 919209429989). */
export function toIntlDigits(raw: string | null | undefined): string {
  const digits = (raw ?? "").replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export function telHref(raw: string | null | undefined): string | null {
  const value = (raw ?? "").trim();
  if (!value) return null;
  if (/^tel:/i.test(value)) return value.replace(/\s/g, "");
  const digits = toIntlDigits(value);
  return digits ? `tel:+${digits}` : null;
}

export const WHATSAPP_BOOKING_MESSAGE =
  "Info to book an appointment\n\nName :\nAge :\nTreatment :\nPhone no:\nDate:\nTime:";

export function whatsappHref(raw: string | null | undefined): string | null {
  const digits = toIntlDigits(raw);
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP_BOOKING_MESSAGE)}`;
}

export function pageHead(path: string, title: string, description: string) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const OPENING_HOURS = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "18:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "16:00" },
];

export const dentistSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}/#dentist`,
  name: CLINIC_NAME,
  url: SITE_URL,
  telephone: CLINIC_PHONE,
  email: "lodhalaksh@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    postalCode: "422006",
    addressCountry: "IN",
  },
  hasMap: "https://maps.app.goo.gl/ntwTSorqPA8Pwi2J9",
  areaServed: { "@type": "City", name: "Nashik" },
  openingHoursSpecification: OPENING_HOURS,
  medicalSpecialty: ["Dentistry"],
  availableService: [
    "Cosmetic Dentistry",
    "Orthodontics",
    "Dental Implants",
    "Teeth Cleaning and Hygiene",
    "Root Canal Treatment",
    "Pediatric Dentistry",
  ].map((name) => ({ "@type": "MedicalProcedure", name })),
};

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}
