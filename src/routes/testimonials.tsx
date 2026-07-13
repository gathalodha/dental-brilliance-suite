import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Quote, Star } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Maison Dentaire" },
      { name: "description", content: "Real words from real patients — reflections on care, comfort and craft at Maison Dentaire." },
      { property: "og:title", content: "Testimonials — Maison Dentaire" },
      { property: "og:description", content: "Real words from real patients." },
    ],
  }),
  component: TestimonialsPage,
});

const testimonials = [
  { name: "Amelia R.", role: "Cosmetic patient", body: "The most calm I've ever felt in a dental chair. The veneers look like they've always been mine. It's the small choices — the music, the lighting, how they explain each step — that make it feel completely different.", stars: 5 },
  { name: "Julian K.", role: "Full-mouth restoration", body: "They took the time to plan properly. Two years in, everything still feels perfect. I had months of stalled treatment elsewhere before finding them — no regrets moving over.", stars: 5 },
  { name: "Priya S.", role: "Hygiene & preventive", body: "Even a cleaning here feels like a small ritual. I actually look forward to my visits, which I never thought I'd say about dental appointments.", stars: 5 },
  { name: "Marcus D.", role: "Invisalign", body: "Fifteen months, no fuss, and a result better than I imagined. Their planning up front made the whole process feel predictable.", stars: 5 },
  { name: "Chiara L.", role: "Cosmetic bonding", body: "I came in for one small fix and left with a plan I actually understood. Nothing was pushed on me. Six months later I asked for the rest — on my terms.", stars: 5 },
  { name: "Henry T.", role: "Implant patient", body: "Anxiety was my thing with dentists. IV sedation, a proper conversation beforehand, and a team that genuinely didn't rush. I'm a patient for life.", stars: 5 },
  { name: "Sofia B.", role: "Hygiene", body: "The studio itself is beautiful, but what stays with me is how thoughtful everyone is. My hygienist actually remembers my life between visits.", stars: 5 },
  { name: "Owen M.", role: "Veneers", body: "I researched cosmetic dentists for a year. This was the only practice where the consultation didn't feel like a sales meeting. That told me everything.", stars: 5 },
  { name: "Isla V.", role: "Family patient", body: "We bring the whole family here now. Kids, teens, adults — same quiet standard for everyone. Rare and worth it.", stars: 5 },
];

function TestimonialsPage() {
  return (
    <div>
      <section className="container-px mx-auto max-w-7xl pt-16 pb-12 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Testimonials</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl leading-[1.05] md:text-7xl">
            Patients, in their <em className="italic text-accent">own voice.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Unedited reflections from people who trust us with their care. Shared with permission.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24">
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 6) * 0.05}>
              <figure className="mb-5 break-inside-avoid rounded-[1.5rem] border border-border/60 bg-card p-7">
                <Quote className="size-6 text-accent" />
                <blockquote className="mt-4 text-base leading-relaxed md:text-lg">
                  {t.body}
                </blockquote>
                <div className="mt-5 flex items-center gap-1 text-accent">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <figcaption className="mt-3 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-muted-foreground"> — {t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        <Reveal>
          <div className="rounded-[2rem] border border-border/60 bg-[color-mix(in_oklab,var(--cocoa)_96%,var(--bronze))] px-8 py-14 text-ivory md:px-16 md:py-20">
            <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-balance text-4xl leading-[1.1] md:text-5xl">Come experience it for yourself.</h2>
                <p className="mt-4 max-w-xl text-ivory/70">
                  A complimentary consultation, on your schedule. No pressure, no plan you didn't ask for.
                </p>
              </div>
              <div className="md:justify-self-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--bronze)] px-8 py-4 text-sm font-medium text-primary-foreground hover:bg-[var(--bronze-soft)] hover:text-cocoa"
                >
                  Book a visit
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
