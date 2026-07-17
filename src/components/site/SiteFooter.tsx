import { Instagram, Facebook, Twitter, Youtube, Linkedin, Send, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { useFooterContent, useFooterLinks, useSocialLinks, useSiteSettings, usePageVisibility, slugFromHref, isPageVisible } from "@/hooks/useContent";

const SOCIAL_ICONS: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  x: Twitter,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  telegram: Send,
  whatsapp: MessageCircle,
};

export function SiteFooter() {
  const { data: footer } = useFooterContent();
  const { data: links } = useFooterLinks();
  const { data: socials } = useSocialLinks();
  const { data: settings } = useSiteSettings();
  const { data: pageVis } = usePageVisibility();

  const clinicName = settings?.clinic_name ?? "Maison Dentaire";
  const logo = settings?.logo_url as string | null | undefined;
  const address = settings?.address ?? "";
  const phone = settings?.phone ?? "";
  const email = settings?.email ?? "";

  const visibleLinks = (links ?? []).filter((l: any) => {
    const slug = slugFromHref(l.href);
    if (!slug) return true;
    return isPageVisible(pageVis, slug);
  });

  return (
    <footer className="mt-24 border-t border-border/60 bg-[color-mix(in_oklab,var(--cocoa)_96%,var(--bronze))] text-ivory">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              {logo ? (
                <img src={logo} alt={clinicName} className="size-9 rounded-full object-cover" />
              ) : (
                <span className="grid size-9 place-items-center rounded-full bg-[var(--bronze)] text-primary-foreground font-display text-lg leading-none">
                  {clinicName.slice(0, 1).toLowerCase()}
                </span>
              )}
              <span className="font-display text-xl">{clinicName}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-ivory/70">
              {footer?.description ?? ""}
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-ivory/60">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {visibleLinks.map((l: any) => (
                <li key={l.id}><a href={l.href} className="hover:text-[var(--bronze-soft)]">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-ivory/60">Visit</h4>
            <ul className="mt-5 space-y-3 text-sm text-ivory/80">
              {address && <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /> {address}</li>}
              {phone && <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0" /> <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-[var(--bronze-soft)]">{phone}</a></li>}
              {email && <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0" /> <a href={`mailto:${email}`} className="hover:text-[var(--bronze-soft)]">{email}</a></li>}
            </ul>
          </div>


          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-ivory/60">Hours</h4>
            <ul className="mt-5 space-y-2 text-sm text-ivory/80">
              <li className="flex justify-between gap-4"><span>Mon–Thu</span><span>{footer?.hours_mon_thu}</span></li>
              <li className="flex justify-between gap-4"><span>Friday</span><span>{footer?.hours_fri}</span></li>
              <li className="flex justify-between gap-4"><span>Saturday</span><span>{footer?.hours_sat}</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span>{footer?.hours_sun}</span></li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              {(socials ?? []).map((s: any) => {
                const Icon = SOCIAL_ICONS[s.platform?.toLowerCase()] ?? Send;
                return (
                  <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.platform} className="grid size-9 place-items-center rounded-full border border-ivory/20 hover:border-[var(--bronze-soft)]">
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/50 md:flex-row md:items-center">
          <p>{footer?.copyright_text ?? `© ${new Date().getFullYear()} ${clinicName}`}</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
