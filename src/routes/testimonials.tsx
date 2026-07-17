import { PageGate } from "@/components/site/PageGate";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Quote, Star, Loader2 } from "lucide-react";
import { useTestimonials } from "@/hooks/useContent";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Maison Dentaire" },
      { name: "description", content: "Real words from real patients — reflections on care, comfort and craft at Maison Dentaire." },
      { property: "og:title", content: "Testimonials — Maison Dentaire" },
      { property: "og:description", content: "Real words from real patients." },
    ],
  }),
  component: () => (<PageGate slug="testimonials"><TestimonialsPage /></PageGate>),
});

function TestimonialsPage() {
  const { data, isLoading } = useTestimonials();
  const testimonials = (data ?? []) as any[];

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
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-accent" /></div>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No testimonials yet.</p>
        ) : (
          <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
            {testimonials.map((t: any, i: number) => {
              const stars = Math.max(0, Math.min(5, Number(t.rating ?? 5)));
              return (
              <Reveal key={t.id} delay={(i % 6) * 0.05}>
                <figure className="mb-5 break-inside-avoid rounded-[1.5rem] border border-border/60 bg-card p-7">
                  <Quote className="size-6 text-accent" />
                  <blockquote className="mt-4 text-base leading-relaxed md:text-lg">
                    {t.review}
                  </blockquote>
                  <div className="mt-5 flex items-center gap-1 text-accent">
                    {Array.from({ length: stars }).map((_, j) => (
                      <Star key={j} className="size-4 fill-current" />
                    ))}
                  </div>
                  <figcaption className="mt-3 flex items-center gap-3 text-sm">
                    {t.image_url && (
                      <img src={t.image_url} alt={t.patient_name} className="size-9 rounded-full object-cover" />
                    )}
                    <div>
                      <div>
                        <span className="font-medium">{t.patient_name}</span>
                        {t.treatment_type && <span className="text-muted-foreground"> — {t.treatment_type}</span>}
                      </div>
                      {t.review_date && (
                        <div className="text-xs text-muted-foreground">
                          {new Date(t.review_date).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
                        </div>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            );})}
          </div>
        )}
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
