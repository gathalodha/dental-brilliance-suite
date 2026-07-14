import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Phone, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-clinic.jpg";
import { Reveal } from "@/components/site/Reveal";
import { useHeroContent, useAboutContent, useTreatments, useTestimonials } from "@/hooks/useContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Dentaire — Boutique Luxury Dental Care" },
      { name: "description", content: "Boutique dental practice blending clinical excellence with a calm, spa-like experience. Cosmetic, restorative and preventive dentistry." },
      { property: "og:title", content: "Maison Dentaire — Boutique Luxury Dental Care" },
      { property: "og:description", content: "Boutique dental practice blending clinical excellence with a calm, spa-like experience." },
    ],
  }),
  component: HomePage,
});

const reasons = [
  { title: "Considered design", desc: "A quiet, sunlit space designed to slow your heart rate the moment you arrive." },
  { title: "Clinical excellence", desc: "Board-certified specialists using digital imaging and minimally invasive protocols." },
  { title: "Transparent pricing", desc: "Clear written treatment plans. No surprises. Financing available on request." },
  { title: "Concierge scheduling", desc: "Same-week appointments, private rooms, and end-to-end coordination." },
];

function HomePage() {
  const { data: hero } = useHeroContent();
  const { data: about } = useAboutContent();
  const { data: treatments } = useTreatments();
  const { data: testimonials } = useTestimonials();

  const brandLine = hero?.brand_line ?? "Boutique Dental Practice";
  const heading = hero?.heading ?? "A quieter kind of dentistry.";
  const subheading = hero?.subheading ?? "Clinical excellence meets considered design.";
  const heroImg = hero?.image_url || heroImage;
  const primary = { text: hero?.cta_text ?? "Book a consultation", link: hero?.cta_link ?? "/contact", show: hero?.cta_enabled ?? true };
  const secondary = { text: hero?.secondary_cta_text ?? "Explore treatments", link: hero?.secondary_cta_link ?? "/treatments", show: hero?.secondary_cta_enabled ?? true };

  const stats = [
    { value: `${about?.stat_years ?? 18}+`, label: "Years of practice" },
    { value: `${(about?.stat_patients ?? 12000).toLocaleString()}`, label: "Smiles cared for" },
    { value: "4.9★", label: "Patient rating" },
    { value: `${about?.stat_treatments ?? 6}`, label: "Board specialists" },
  ];


  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="container-px mx-auto grid max-w-7xl gap-12 pb-20 pt-10 md:grid-cols-[1.05fr_1fr] md:pt-16 md:pb-32">
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.35em] text-accent"
            >
              {brandLine}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-balance text-5xl leading-[1.02] md:text-7xl"
            >
              {heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg text-muted-foreground"
            >
              {subheading}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              {primary.show && (
                <a
                  href={primary.link}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-accent"
                >
                  {primary.text}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
              {secondary.show && (
                <a
                  href={secondary.link}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {secondary.text}
                </a>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2"><Award className="size-4 text-accent" /> Board-certified specialists</span>
              <span className="flex items-center gap-2"><Clock className="size-4 text-accent" /> Same-week appointments</span>
              <span className="flex items-center gap-2"><Phone className="size-4 text-accent" /> 24/7 emergency line</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--cocoa)_45%,transparent)]">
              <img
                src={heroImage}
                alt="Serene modern dental clinic interior"
                className="h-[520px] w-full object-cover md:h-[640px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/25 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="glass absolute -bottom-6 -left-6 hidden max-w-[260px] rounded-2xl p-5 md:block"
            >
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-sm text-foreground/85">
                "Genuinely the most beautiful clinic I've walked into."
              </p>
              <p className="mt-2 text-xs text-muted-foreground">— Verified patient review</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-ivory/60">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div>
                <div className="font-display text-4xl text-accent md:text-5xl">{s.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="container-px mx-auto max-w-7xl py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-accent">The Maison</p>
            <h2 className="mt-4 text-balance text-4xl leading-tight md:text-5xl">
              Dentistry, reimagined as a <em className="italic text-accent">quiet ritual.</em>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Founded in 2007, Maison Dentaire is a small, independent practice built
              around a simple belief: exceptional care should feel like a moment for yourself.
              Our team of specialists works together on every plan — nothing is outsourced.
            </p>
            <Link
              to="/doctors"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent"
            >
              Meet the team <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
                <img src={heroImage} alt="" className="size-full object-cover" />
              </div>
              <div className="mt-10 aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
                <img src={heroImage} alt="" className="size-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="bg-[color-mix(in_oklab,var(--ivory)_60%,var(--background))] py-24 md:py-32">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.35em] text-accent">Treatments</p>
                <h2 className="mt-4 text-balance text-4xl md:text-5xl">A complete range of care.</h2>
              </div>
              <Link to="/treatments" className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent">
                View all treatments <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {treatments.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex h-full flex-col rounded-3xl border border-border/60 bg-card p-8 transition-shadow hover:shadow-[0_20px_50px_-25px_color-mix(in_oklab,var(--cocoa)_35%,transparent)]"
                >
                  <div className="grid size-12 place-items-center rounded-2xl bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <t.icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-2xl">{t.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{t.desc}</p>
                  <Link to="/treatments" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent">
                    Learn more <ArrowRight className="size-4" />
                  </Link>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-px mx-auto max-w-7xl py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Why Maison</p>
            <h2 className="mt-4 text-balance text-4xl md:text-5xl">
              Four things you'll <em className="italic text-accent">notice</em> first.
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              We've obsessed over every touchpoint — from the greeting at the door
              to the follow-up note the next morning.
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <div className="h-full bg-card p-7">
                  <div className="font-display text-3xl text-accent">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-3 text-xl">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[color-mix(in_oklab,var(--cocoa)_96%,var(--bronze))] py-24 text-ivory md:py-32">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--bronze-soft)]">In their words</p>
            <h2 className="mt-4 max-w-2xl text-balance text-4xl md:text-5xl">
              Small details, remembered by <em className="italic text-[var(--bronze-soft)]">the people who matter.</em>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-3xl border border-ivory/10 bg-ivory/[0.03] p-8 backdrop-blur">
                  <div className="flex gap-1 text-[var(--bronze-soft)]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 flex-1 font-display text-xl leading-snug text-ivory/95">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 border-t border-ivory/10 pt-4">
                    <div className="text-sm text-ivory">{t.author}</div>
                    <div className="text-xs text-ivory/60">{t.meta}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-7xl py-24 md:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-card p-10 md:p-16">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="text-balance text-4xl leading-tight md:text-5xl">
                  Ready for a <em className="italic text-accent">quieter</em> dental visit?
                </h2>
                <p className="mt-4 max-w-lg text-muted-foreground">
                  Same-week appointments. Complimentary consultations for new cosmetic patients.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
                >
                  Book a consultation <ArrowRight className="size-4" />
                </Link>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-medium hover:bg-secondary"
                >
                  <Phone className="size-4" /> (555) 123-4567
                </a>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/20 blur-3xl" />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
