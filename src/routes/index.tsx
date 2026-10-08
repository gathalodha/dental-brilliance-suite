import { BookingLink } from "@/components/site/BookingLink";
import { pageHead, jsonLd, dentistSchema, telHref as toTelHref } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Phone, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-clinic.jpg";
import { Reveal } from "@/components/site/Reveal";
import { useHeroContent, useHeroCarousel, useAboutContent, useTreatments, useTestimonials, useSiteSettings } from "@/hooks/useContent";
import { HeroImageCarousel } from "@/components/site/HeroImageCarousel";
import { ScrollExpandMedia } from "@/components/site/ScrollExpandMedia";

export const Route = createFileRoute("/")({
  head: () => ({ ...pageHead("/", "Dentist in Nashik | Dental Brilliance Suite – Dental Clinic", "Looking for a trusted dentist in Nashik? Dental Brilliance Suite offers teeth cleaning, dental implants, root canal treatment, orthodontics and cosmetic dentistry in Nashik, Maharashtra."), scripts: [jsonLd(dentistSchema)] }),
  component: HomePage,
});

const reasons = [
  { title: "Considered design", desc: "A quiet, sunlit space designed to slow your heart rate the moment you arrive." },
  { title: "Clinical excellence", desc: "Board-certified specialists using digital imaging and minimally invasive protocols." },
  { title: "Transparent pricing", desc: "Clear written treatment plans. No surprises. Financing available on request." },
  { title: "Concierge scheduling", desc: "Same-week appointments, private rooms, and end-to-end coordination." },
];

function HomePage() {
  const { data: hero, isPending: heroPending } = useHeroContent();
  const { data: carouselImages, isPending: carouselPending } = useHeroCarousel();
  const { data: about, isPending: aboutPending } = useAboutContent();
  const { data: treatments, isPending: treatmentsPending } = useTreatments();
  const { data: testimonials, isPending: testimonialsPending } = useTestimonials();
  const { data: settings, isPending: settingsPending } = useSiteSettings();

  const phone = settings?.phone ?? "";
  const emergencyPhone = settings?.emergency_phone ?? "";
  const telHref = toTelHref(settings?.call_button_link || phone) ?? "/contact";


  const brandLine = hero?.brand_line ?? "Boutique Dental Practice";
  const heading = hero?.heading ?? "A quieter kind of dentistry.";
  const subheading = hero?.subheading ?? "Clinical excellence meets considered design.";
  const heroImg = hero?.image_url || heroImage;
  const heroImages = carouselImages?.length
    ? carouselImages
    : [{ id: "default-hero", image_url: heroImg, alt_text: "Serene modern dental clinic interior" }];
  const primary = { text: hero?.cta_text ?? "Book a consultation", show: hero?.cta_enabled ?? true };
  const secondary = { text: hero?.secondary_cta_text ?? "Explore treatments", link: hero?.secondary_cta_link ?? "/treatments", show: hero?.secondary_cta_enabled ?? true };

  const stats = [
    { value: `${about?.stat_years ?? 18}+`, label: "Years of practice" },
    { value: `${(about?.stat_patients ?? 12000).toLocaleString()}`, label: "Smiles cared for" },
    { value: "4.9★", label: "Patient rating" },
    { value: `${about?.stat_treatments ?? 6}`, label: "Board specialists" },
  ];

  if (heroPending || carouselPending || aboutPending || treatmentsPending || testimonialsPending || settingsPending) {
    return <div className="min-h-[70vh]" aria-hidden="true" />;
  }


  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative md:hidden">
        <div className="container-px mx-auto flex max-w-7xl flex-col gap-8 pb-14 pt-8">
          <HeroCopy brandLine={brandLine} heading={heading} subheading={subheading} primary={primary} secondary={secondary} emergencyPhone={emergencyPhone} />
          <HeroImageCarousel images={heroImages} />
        </div>
      </section>

      <ScrollExpandMedia
        startWidth={50}
        startHeight={70}
        startRadius={28}
        endRadius={0}
        mediaZoom={1.2}
        scrollDistance={1}
        holdDistance={0.25}
        sideContent={<HeroCopy brandLine={brandLine} heading={heading} subheading={subheading} primary={primary} secondary={secondary} emergencyPhone={emergencyPhone} />}
      >
        <HeroImageCarousel images={heroImages} expanded />
      </ScrollExpandMedia>

      {/* STATS */}
      <section className="border-y border-border/60 bg-ivory/60">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-8 py-10 md:grid-cols-4 md:gap-8 md:py-12">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div>
                <div className="font-display text-3xl text-accent md:text-5xl">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground md:mt-2 md:text-sm">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="container-px mx-auto max-w-7xl py-16 md:py-32">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-accent md:tracking-[0.35em]">Our Commitment to Excellence</p>
            <h2 className="mt-4 text-balance text-4xl leading-tight md:text-5xl">
              Dentistry, reimagined as a <em className="italic text-accent">quiet ritual.</em>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground md:mt-6">
              Founded in 2007, Our Clininc is a small, independent practice built
              around a simple belief: exceptional care should feel like a moment for yourself.
              Our team of specialists works together on every plan — nothing is outsourced.
            </p>
            <Link
              to="/doctors"
              className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground hover:text-accent md:mt-8"
            >
              Meet the team <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-secondary shadow-sm">
                <img src={about?.image_url || heroImage} alt="Inside our dental clinic in Nashik" className="size-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="mt-7 aspect-[3/4] overflow-hidden rounded-2xl bg-secondary shadow-sm md:mt-10">
                <img src={about?.image_url || heroImage} alt="Inside our dental clinic in Nashik" className="size-full object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="bg-[color-mix(in_oklab,var(--ivory)_60%,var(--background))] py-16 md:py-32">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between sm:gap-6">
              <div className="min-w-0 max-w-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-accent md:tracking-[0.35em]">Treatments</p>
                <h2 className="mt-4 text-balance text-4xl md:text-5xl">A complete range of care.</h2>
              </div>
              <Link to="/treatments" aria-label="View all treatments" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm hover:text-accent sm:size-auto sm:border-0 sm:bg-transparent sm:shadow-none">
                <span className="sr-only sm:not-sr-only">View all treatments</span><ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-7 md:mt-14 md:grid-cols-3 md:gap-6">
            {(treatments ?? []).slice(0, 3).map((t: any, i: number) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-[0_20px_50px_-25px_color-mix(in_oklab,var(--primary)_35%,transparent)]">
                  {t.image_url ? (
                    <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
                      <img src={t.image_url} alt={t.name} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                  ) : null}
                  <div className={`relative z-10 flex flex-1 flex-col bg-card p-6 md:p-8 ${t.image_url ? "-mt-6 mx-3 rounded-t-2xl shadow-[0_-12px_28px_-24px_color-mix(in_oklab,var(--primary)_40%,transparent)] md:mx-0 md:mt-0 md:rounded-none md:shadow-none" : ""}`}>
                    {!t.image_url && <div className="grid size-12 place-items-center rounded-2xl bg-secondary text-accent"><Sparkles className="size-5" /></div>}
                    <h3 className="text-2xl">{t.name}</h3>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">{t.short_description || t.description}</p>
                    <Link to="/treatments" className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent">Learn more <ArrowRight className="size-4" /></Link>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-px mx-auto max-w-7xl py-16 md:py-32">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-accent md:tracking-[0.35em]">Why Us</p>
            <h2 className="mt-4 text-balance text-4xl md:text-5xl">Four things you'll <em className="italic text-accent">notice</em> first.</h2>
            <p className="mt-5 max-w-md text-muted-foreground md:mt-6">We've obsessed over every touchpoint — from the greeting at the door to the follow-up note the next morning.</p>
          </Reveal>
          <div className="grid overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 md:rounded-3xl">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}><div className="h-full border-b border-border/60 bg-card p-6 last:border-b-0 sm:border-b-0 md:p-7"><div className="font-display text-3xl text-accent">{String(i + 1).padStart(2, "0")}</div><h3 className="mt-3 text-xl">{r.title}</h3><p className="mt-2 text-sm text-muted-foreground">{r.desc}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[color-mix(in_oklab,var(--cocoa)_96%,var(--bronze))] py-16 text-ivory md:py-32">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal><p className="text-xs uppercase tracking-[0.2em] text-[var(--bronze-soft)] md:tracking-[0.35em]">In their words</p><h2 className="mt-4 max-w-2xl text-balance text-4xl md:text-5xl">Small details, remembered by <em className="italic text-[var(--bronze-soft)]">the people who matter.</em></h2></Reveal>
          <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
            {(testimonials ?? []).slice(0, 3).map((t: any, i: number) => (
              <Reveal key={t.id} delay={i * 0.08}><div className="flex h-full flex-col rounded-2xl border border-ivory/10 bg-ivory/[0.03] p-6 backdrop-blur md:rounded-3xl md:p-8"><div className="flex gap-1 text-[var(--bronze-soft)]">{Array.from({ length: t.rating ?? 5 }).map((_, j) => <Star key={j} className="size-4 fill-current" />)}</div><p className="mt-5 flex-1 font-display text-xl leading-snug text-ivory/95">"{t.review}"</p><div className="mt-6 border-t border-ivory/10 pt-4"><div className="text-sm text-ivory">{t.patient_name}</div></div></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-7xl py-16 md:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:rounded-[2.5rem] md:p-16">
            <div className="grid gap-7 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-8">
              <div><h2 className="text-balance text-4xl leading-tight md:text-5xl">Ready for a <em className="italic text-accent">quieter</em> dental visit?</h2><p className="mt-4 max-w-lg text-muted-foreground">Visit our dental clinic in Nashik for check-ups, teeth cleaning, implants and root canal treatment. Same-week appointments. Complimentary consultations for new cosmetic patients.</p></div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end"><BookingLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent">Book a consultation <ArrowRight className="size-4" /></BookingLink>{phone && <a href={telHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-medium hover:bg-secondary"><Phone className="size-4" /> {phone}</a>}</div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function HeroCopy({ brandLine, heading, subheading, primary, secondary, emergencyPhone }: {
  brandLine: string;
  heading: string;
  subheading: string;
  primary: { text: string; show: boolean };
  secondary: { text: string; link: string; show: boolean };
  emergencyPhone: string;
}) {
  return (
    <div className="flex min-w-0 flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.2em] text-accent md:tracking-[0.35em]"
            >
              {brandLine}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-balance text-[2.75rem] leading-[1.02] md:mt-5 md:text-7xl"
            >
              {heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 max-w-lg text-base text-muted-foreground md:mt-6 md:text-lg"
            >
              {subheading}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-7 grid gap-3 sm:flex sm:flex-wrap sm:items-center md:mt-9"
            >
              {primary.show && (
                <BookingLink
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-accent"
                >
                  {primary.text}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </BookingLink>
              )}
              {secondary.show && (
                <a
                  href={secondary.link}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {secondary.text}
                </a>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-7 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 md:mt-10"
            >
              <span className="flex items-center gap-2"><Award className="size-4 text-accent" /> Board-certified specialists</span>
              <span className="flex items-center gap-2"><Clock className="size-4 text-accent" /> Same-week appointments</span>
              <span className="flex items-center gap-2"><Phone className="size-4 text-accent" /> {emergencyPhone ? `Emergency line ${emergencyPhone}` : "24/7 emergency line"}</span>
            </motion.div>
    </div>
  );
}
