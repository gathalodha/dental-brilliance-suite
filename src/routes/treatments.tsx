import { PageGate } from "@/components/site/PageGate";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useTreatments } from "@/hooks/useContent";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — Maison Dentaire" },
      { name: "description", content: "Cosmetic, restorative, preventive and specialty dental treatments delivered by a boutique team of board-certified specialists." },
      { property: "og:title", content: "Treatments — Maison Dentaire" },
      { property: "og:description", content: "Cosmetic, restorative, preventive and specialty dental treatments in a calm, boutique setting." },
    ],
  }),
  component: () => (<PageGate slug="treatments"><TreatmentsPage /></PageGate>),
});

function TreatmentsPage() {
  const { data: treatments, isLoading } = useTreatments();

  return (
    <div>
      <section className="container-px mx-auto max-w-7xl pt-16 pb-16 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Treatments</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl leading-[1.05] md:text-7xl">
            Considered care, from <em className="italic text-accent">hygiene to whole-smile design.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Every treatment plan is co-authored by our specialists and tailored to your
            face, your bite and your goals. Nothing off-the-shelf.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-accent" /></div>
        ) : !treatments || treatments.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No treatments to show yet.</p>
        ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {treatments.map((c: any, i: number) => {
            const tags: string[] = [
              ...(Array.isArray(c.tags) ? c.tags : []),
              ...(c.duration ? [c.duration] : []),
            ];
            return (
            <Reveal key={c.id} delay={(i % 3) * 0.06}>
              <div className="group flex h-full flex-col rounded-3xl border border-border/60 bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_color-mix(in_oklab,var(--cocoa)_35%,transparent)]">
                {c.image_url ? (
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                    <img src={c.image_url} alt={c.name} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className="grid size-12 place-items-center rounded-2xl bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Sparkles className="size-5" />
                  </div>
                )}
                <h3 className="mt-6 text-2xl">{c.name}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{c.short_description || c.description}</p>
                {Array.isArray(c.benefits) && c.benefits.length > 0 && (
                  <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                    {c.benefits.map((b: string) => (
                      <li key={b} className="flex gap-2"><span className="text-accent">•</span>{b}</li>
                    ))}
                  </ul>
                )}
                {tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                )}
                {c.cta_text && (
                  <Link to={c.cta_link || "/contact"} className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline">
                    {c.cta_text} <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
            </Reveal>
          );})}
        </div>
        )}
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[color-mix(in_oklab,var(--cocoa)_96%,var(--bronze))] p-10 text-ivory md:p-16">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--bronze-soft)]">Not sure where to begin?</p>
                <h2 className="mt-4 text-balance text-4xl md:text-5xl">Book a complimentary consultation.</h2>
                <p className="mt-4 max-w-lg text-ivory/70">
                  A 30-minute conversation with one of our specialists — no obligation.
                </p>
              </div>
              <div className="md:justify-self-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--bronze)] px-7 py-4 text-sm font-medium text-ivory transition-colors hover:bg-[var(--bronze-soft)] hover:text-cocoa"
                >
                  Book now <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
