import { PageGate } from "@/components/site/PageGate";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Award, HeartHandshake, Sparkles, ShieldCheck, Leaf, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Maison Dentaire" },
      { name: "description", content: "A boutique dental studio where clinical excellence meets calm, considered design. Meet the philosophy behind Maison Dentaire." },
      { property: "og:title", content: "About Maison Dentaire" },
      { property: "og:description", content: "Where clinical excellence meets calm, considered design." },
    ],
  }),
  component: () => (<PageGate slug="about"><AboutPage /></PageGate>),
});

const values = [
  { icon: HeartHandshake, title: "Care, first", body: "Every visit begins with listening. We move at your pace and design treatment around your life." },
  { icon: Sparkles, title: "Craft & detail", body: "From the finish of a veneer to the light in the operatory, small details define the experience." },
  { icon: ShieldCheck, title: "Quiet expertise", body: "Board-certified clinicians, evidence-based methods, and technology that stays out of the way." },
  { icon: Leaf, title: "Calm by design", body: "A studio that feels more spa than clinic — because relaxed patients heal better." },
  { icon: Award, title: "Uncompromised standards", body: "Premium materials, careful protocols, and lifelong-care planning built into every visit." },
  { icon: Users, title: "Long relationships", body: "We build practices around families and lifetimes, not appointments and transactions." },
];

const stats = [
  { k: "18+", v: "Years of practice" },
  { k: "12k", v: "Smiles cared for" },
  { k: "4.9", v: "Average review" },
  { k: "100%", v: "In-house lab" },
];

function AboutPage() {
  return (
    <div>
      <section className="container-px mx-auto max-w-7xl pt-16 pb-16 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">About the studio</p>
          <h1 className="mt-4 max-w-4xl text-balance text-5xl leading-[1.05] md:text-7xl">
            A modern practice built around <em className="italic text-accent">people</em>, not procedures.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Maison Dentaire began with a simple idea: dentistry should feel calm, considered
            and quietly world-class. Today we're a small team of clinicians and specialists
            who take on fewer patients so we can care for each of them properly.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.05}>
              <div className="rounded-[1.5rem] border border-border/60 bg-card p-8">
                <div className="font-display text-5xl text-accent">{s.k}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Our story</p>
            <h2 className="mt-3 text-4xl md:text-5xl">A studio, not a clinic.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                We spent years working in high-volume practices where quality had to compete
                with pace. Maison Dentaire was our answer: a boutique studio where each visit
                gets the time it deserves, and where the space itself is designed to lower
                your shoulders the moment you walk in.
              </p>
              <p>
                Everything — from the microscope-assisted dentistry to the linen throws in
                the waiting room — is chosen with intention. We collaborate with a small
                network of specialists so complex cases stay under one roof, one plan, one
                conversation.
              </p>
              <p>
                Our patients tell us this feels different. That's the point.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-accent">What guides us</p>
              <h2 className="mt-3 text-4xl md:text-5xl">Six principles.</h2>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="group h-full rounded-[1.5rem] border border-border/60 bg-card p-8 transition-colors hover:border-accent/50">
                <div className="grid size-11 place-items-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <v.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-[color-mix(in_oklab,var(--cocoa)_96%,var(--bronze))] px-8 py-14 text-ivory md:px-16 md:py-20">
            <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-balance text-4xl leading-[1.1] md:text-5xl">Come see the studio.</h2>
                <p className="mt-4 max-w-xl text-ivory/70">
                  Cosmetic consultations are complimentary. We'll walk you through the space,
                  answer questions, and — only if you want — start a plan.
                </p>
              </div>
              <div className="md:justify-self-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--bronze)] px-8 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--bronze-soft)] hover:text-cocoa"
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
