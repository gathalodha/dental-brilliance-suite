import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFaqs } from "@/hooks/useContent";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Maison Dentaire" },
      { name: "description", content: "Answers to the questions patients most often ask about visits, treatments, comfort, insurance and financing at Maison Dentaire." },
      { property: "og:title", content: "FAQs — Maison Dentaire" },
      { property: "og:description", content: "Common questions about visits, treatments, and financing." },
    ],
  }),
  component: () => (<PageGate slug="faqs"><FaqPage /></PageGate>),
});

function FaqPage() {
  const { data, isLoading } = useFaqs();
  const faqs = (data ?? []) as any[];

  const groups = useMemo(() => {
    const map = new Map<string, any[]>();
    faqs.forEach((f) => {
      const key = f.category || "Questions";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(f);
    });
    return Array.from(map.entries()).map(([title, items]) => ({ title, items }));
  }, [faqs]);

  return (
    <div>
      <section className="container-px mx-auto max-w-7xl pt-16 pb-12 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">FAQs</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl leading-[1.05] md:text-7xl">
            Questions, <em className="italic text-accent">gently answered.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Everything you might want to know about visiting us — and a few things we wish more people asked.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-4xl pb-24 md:pb-32">
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-accent" /></div>
        ) : groups.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No FAQs yet.</p>
        ) : (
          <div className="space-y-14">
            {groups.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 0.05}>
                <div>
                  <h2 className="text-2xl md:text-3xl">{g.title}</h2>
                  <div className="mt-6 divide-y divide-border/60 rounded-[1.5rem] border border-border/60 bg-card">
                    {g.items.map((item: any) => (
                      <FaqItem key={item.id} q={item.question} a={item.answer} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-16 rounded-[2rem] border border-border/60 bg-card p-8 text-center md:p-12">
            <h3 className="text-2xl md:text-3xl">Still curious?</h3>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Book a complimentary cosmetic consultation and we'll answer everything in person.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-accent"
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-secondary/40"
      >
        <span className="text-base md:text-lg">{q}</span>
        <ChevronDown className={cn("size-5 shrink-0 text-accent transition-transform", open && "rotate-180")} />
      </button>
      <div
        className={cn(
          "grid overflow-hidden px-6 text-sm text-muted-foreground transition-all duration-300",
          open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 leading-relaxed">{a}</div>
      </div>
    </div>
  );
}
