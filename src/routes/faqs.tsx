import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Maison Dentaire" },
      { name: "description", content: "Answers to the questions patients most often ask about visits, treatments, comfort, insurance and financing at Maison Dentaire." },
      { property: "og:title", content: "FAQs — Maison Dentaire" },
      { property: "og:description", content: "Common questions about visits, treatments, and financing." },
    ],
  }),
  component: FaqPage,
});

const groups = [
  {
    title: "Your first visit",
    items: [
      { q: "What happens at a first appointment?", a: "A relaxed 60-minute session: full exam, digital scans and X-rays, a conversation about your goals, and a written plan you can take home. Cosmetic consultations are complimentary." },
      { q: "How far in advance should I book?", a: "We hold same-week appointments for existing patients and typically 1–2 weeks for new patients. Cosmetic consultations often have earlier availability." },
      { q: "What should I bring?", a: "A list of current medications, any prior records or images if easy to share, and — if you have coverage — your insurance details. We'll take care of the rest." },
    ],
  },
  {
    title: "Comfort & experience",
    items: [
      { q: "Is dental treatment painful here?", a: "We design around comfort. Painless anaesthetic delivery, noise-cancelling headphones, weighted blankets and, for anxious patients, oral or IV sedation with a licensed anaesthetist." },
      { q: "Do you treat nervous patients?", a: "Absolutely — many of our patients come to us after difficult experiences elsewhere. We move at your pace and always explain what's next." },
      { q: "How long are appointments?", a: "Hygiene visits are 45–60 minutes. Restorative visits are 60–120 minutes. We never double-book." },
    ],
  },
  {
    title: "Cosmetic & restorative",
    items: [
      { q: "How long do veneers last?", a: "Well-designed porcelain veneers typically last 15–20 years with routine care. We plan each case for longevity, not just the first year." },
      { q: "Do you offer Invisalign?", a: "Yes — we're certified providers and often use short-course aligners before cosmetic work to give a stronger, more conservative result." },
      { q: "Are implants done in-house?", a: "Yes. Surgical placement, prosthetics and follow-up all happen under one roof, planned digitally end-to-end." },
    ],
  },
  {
    title: "Fees & financing",
    items: [
      { q: "Do you take insurance?", a: "We're an out-of-network provider and submit claims on your behalf so you receive the maximum reimbursement your plan allows." },
      { q: "Do you offer financing?", a: "Yes — interest-free plans up to 12 months for treatments over $1,500, through our financing partner. Approval takes minutes." },
      { q: "Will I get a written quote?", a: "Always. Every plan comes with an itemised, no-surprises estimate before we begin." },
    ],
  },
];

function FaqPage() {
  return (
    <div>
      <section className="container-px mx-auto max-w-7xl pt-16 pb-12 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">FAQs</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl leading-[1.05] md:text-7xl">
            The questions we're <em className="italic text-accent">most often</em> asked.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Can't find what you're looking for?{" "}
            <Link to="/contact" className="text-accent hover:underline">Get in touch</Link> — we're happy to talk it through.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-4xl pb-24 md:pb-32">
        <div className="space-y-14">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.05}>
              <div>
                <h2 className="text-2xl md:text-3xl">{g.title}</h2>
                <div className="mt-6 divide-y divide-border/60 rounded-[1.5rem] border border-border/60 bg-card">
                  {g.items.map((item, i) => (
                    <FaqItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

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
