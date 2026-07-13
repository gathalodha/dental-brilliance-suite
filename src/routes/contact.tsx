import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Book — Maison Dentaire" },
      { name: "description", content: "Book a consultation or reach the Maison Dentaire team. Same-week appointments and complimentary cosmetic consultations." },
      { property: "og:title", content: "Contact & Book — Maison Dentaire" },
      { property: "og:description", content: "Book a consultation or contact our team." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(6, "Please enter a phone number").max(30),
  treatment: z.string().max(80).optional(),
  date: z.string().max(20).optional(),
  message: z.string().trim().max(1000).optional(),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errs[issue.path[0] as string] = issue.message;
      }
      setErrors(errs);
      setSubmitting(false);
      return;
    }
    setErrors({});
    // TODO: persist to Supabase in phase 2
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <div>
      <section className="container-px mx-auto max-w-7xl pt-16 pb-12 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Contact</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl leading-[1.05] md:text-7xl">
            Let's plan your <em className="italic text-accent">first visit.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Tell us a little about yourself and we'll reach out within one business day
            to confirm your appointment. Cosmetic consultations are complimentary.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="rounded-[2rem] border border-border/60 bg-card p-8 md:p-12">
              {submitted ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <div className="grid size-16 place-items-center rounded-full bg-accent/15 text-accent">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h2 className="mt-6 text-3xl">Request received</h2>
                  <p className="mt-3 max-w-md text-muted-foreground">
                    Thank you — our concierge team will reach out within one business day to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid gap-5">
                  <h2 className="text-2xl">Book an appointment</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" name="name" error={errors.name} required />
                    <Field label="Email" name="email" type="email" error={errors.email} required />
                    <Field label="Phone" name="phone" type="tel" error={errors.phone} required />
                    <Field label="Preferred date" name="date" type="date" error={errors.date} />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Treatment interest</label>
                    <select
                      name="treatment"
                      defaultValue=""
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    >
                      <option value="">Select an option (optional)</option>
                      <option>Cosmetic consultation</option>
                      <option>Hygiene / cleaning</option>
                      <option>Veneers</option>
                      <option>Invisalign</option>
                      <option>Implants</option>
                      <option>Restorative</option>
                      <option>Something else</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Anything we should know?"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : (<>Send request <Send className="size-4" /></>)}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-[2rem] border border-border/60 bg-card p-8">
                <h3 className="text-xl">Visit us</h3>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-accent" /><span>24 Bronzewood Lane, Suite 5<br />San Francisco, CA 94110</span></li>
                  <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-accent" /><a href="tel:+15551234567" className="hover:text-accent">(555) 123-4567</a></li>
                  <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-accent" /><a href="mailto:hello@maisondentaire.com" className="hover:text-accent">hello@maisondentaire.com</a></li>
                </ul>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-card p-8">
                <h3 className="flex items-center gap-2 text-xl"><Clock className="size-5 text-accent" /> Hours</h3>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between"><span>Monday – Thursday</span><span className="text-foreground">8am — 6pm</span></li>
                  <li className="flex justify-between"><span>Friday</span><span className="text-foreground">8am — 4pm</span></li>
                  <li className="flex justify-between"><span>Saturday</span><span className="text-foreground">By appointment</span></li>
                  <li className="flex justify-between"><span>Sunday</span><span className="text-foreground">Closed</span></li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card">
                <div className="aspect-[4/3] w-full bg-secondary">
                  <iframe
                    title="Clinic location"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-122.42%2C37.75%2C-122.40%2C37.77&layer=mapnik"
                    className="size-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({
  label, name, type = "text", error, required,
}: { label: string; name: string; type?: string; error?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}{required && <span className="text-accent"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
