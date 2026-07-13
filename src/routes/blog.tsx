import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Quote, Star } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Maison Dentaire" },
      { name: "description", content: "Notes on modern dentistry, cosmetic craft, and calm patient experiences from the Maison Dentaire studio." },
      { property: "og:title", content: "Journal — Maison Dentaire" },
      { property: "og:description", content: "Notes on modern dentistry from our studio." },
    ],
  }),
  component: BlogPage,
});

const featured = {
  tag: "Cosmetic",
  title: "How we design a veneer smile — one shade, one edge, one millimeter at a time.",
  excerpt:
    "Behind every quiet, natural-looking smile is a stack of small decisions. Here's how our clinicians and ceramist collaborate on a case from consult to seat.",
  date: "Jul 2, 2026",
  read: "8 min read",
  hue: "from-[#efe6d6] to-[#b08968]",
};

const posts = [
  { tag: "Preventive", title: "The 20-minute hygiene visit we don't offer — and why.", date: "Jun 18, 2026", read: "5 min", hue: "from-[#eadfcb] to-[#c9b79c]" },
  { tag: "Restorative", title: "Choosing between a crown and an onlay in 2026.", date: "Jun 4, 2026", read: "6 min", hue: "from-[#e6d8bf] to-[#8d6e52]" },
  { tag: "Wellness", title: "Sleep, jaw tension and the quiet epidemic we screen for.", date: "May 22, 2026", read: "7 min", hue: "from-[#f4ecdb] to-[#a48664]" },
  { tag: "Materials", title: "Why we chose lithium disilicate as our house material.", date: "May 8, 2026", read: "4 min", hue: "from-[#ecdfc6] to-[#6b4f38]" },
  { tag: "Studio", title: "Designing an operatory that lowers your shoulders.", date: "Apr 26, 2026", read: "5 min", hue: "from-[#f0e6d1] to-[#b08968]" },
  { tag: "Cosmetic", title: "Bleaching without the burn: a gentler whitening protocol.", date: "Apr 12, 2026", read: "6 min", hue: "from-[#e0d0b5] to-[#7f5f45]" },
];

function BlogPage() {
  return (
    <div>
      <section className="container-px mx-auto max-w-7xl pt-16 pb-12 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Journal</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl leading-[1.05] md:text-7xl">
            Notes from the <em className="italic text-accent">studio.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Field notes, clinical thinking and quiet observations on the craft of modern dentistry.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-16">
        <Reveal>
          <article className="group grid overflow-hidden rounded-[2rem] border border-border/60 bg-card md:grid-cols-[1.1fr_1fr]">
            <div className={`aspect-[4/3] bg-gradient-to-br md:aspect-auto ${featured.hue}`} />
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-accent">
                <span>{featured.tag}</span>
                <span className="text-muted-foreground">Featured</span>
              </div>
              <h2 className="mt-5 text-balance text-3xl leading-tight md:text-4xl">{featured.title}</h2>
              <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span>{featured.date}</span><span>•</span><span>{featured.read}</span>
              </div>
              <div className="mt-8">
                <span className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm">Read the article →</span>
              </div>
            </div>
          </article>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="group h-full overflow-hidden rounded-[1.5rem] border border-border/60 bg-card transition-colors hover:border-accent/50">
                <div className={`aspect-[4/3] bg-gradient-to-br transition-transform duration-700 group-hover:scale-105 ${p.hue}`} />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-accent">{p.tag}</p>
                  <h3 className="mt-3 text-xl leading-snug">{p.title}</h3>
                  <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{p.date}</span><span>•</span><span>{p.read}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        <Reveal>
          <div className="rounded-[2rem] border border-border/60 bg-card px-8 py-12 text-center md:px-16">
            <h2 className="text-3xl md:text-4xl">A quiet monthly note.</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              One considered article, sent once a month. No promotions, no noise.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-input bg-background px-5 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-accent">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              Prefer to talk? <Link to="/contact" className="text-accent hover:underline">Get in touch</Link>.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

const testimonials = [
  { name: "Amelia R.", role: "Cosmetic patient", body: "The most calm I've ever felt in a dental chair. The veneers look like they've always been mine.", stars: 5 },
  { name: "Julian K.", role: "Restorative", body: "They took the time to plan properly. Two years in, everything still feels perfect.", stars: 5 },
  { name: "Priya S.", role: "Hygiene", body: "Even a cleaning here feels like a small ritual. I actually look forward to my visits.", stars: 5 },
];

function Testimonials() {
  return (
    <section className="container-px mx-auto max-w-7xl pb-16">
      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Kind words</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Patients, in their own voice.</h2>
          </div>
        </div>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.05}>
            <figure className="h-full rounded-[1.5rem] border border-border/60 bg-card p-8">
              <Quote className="size-6 text-accent" />
              <blockquote className="mt-4 text-lg leading-relaxed">{t.body}</blockquote>
              <div className="mt-6 flex items-center gap-1 text-accent">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <figcaption className="mt-4 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="text-muted-foreground"> — {t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
