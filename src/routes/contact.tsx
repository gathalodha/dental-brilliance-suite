import { pageHead, jsonLd, dentistSchema } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { BookingLink } from "@/components/site/BookingLink";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/hooks/useContent";
import { PageGate } from "@/components/site/PageGate";

export const Route = createFileRoute("/contact")({
  head: () => ({ ...pageHead("/contact", "Book a Dentist Appointment in Nashik | Dental Brilliance Suite", "Book an appointment with Dental Brilliance Suite in Nashik, Maharashtra. Book on WhatsApp or call and our team will confirm your visit."), scripts: [jsonLd(dentistSchema)] }),
  component: () => (
    <PageGate slug="contact">
      <ContactPage />
    </PageGate>
  ),
});

function ContactPage() {
  const { data: settings } = useSiteSettings();
  const address = settings?.address ?? "";
  const phone = settings?.phone ?? "";
  const email = settings?.email ?? "";
  const emergency = settings?.emergency_phone ?? "";
  const mapEmbed = settings?.google_maps_embed as string | null | undefined;
  const mapLink = settings?.google_maps_link as string | null | undefined;

  return (
    <div>
      <section className="container-px mx-auto max-w-7xl pt-16 pb-12 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Contact</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl leading-[1.05] md:text-7xl">
            Let's plan your <em className="italic text-accent">first visit.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Message us on WhatsApp to book your appointment. Cosmetic consultations are complimentary.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="rounded-[2rem] border border-border/60 bg-card p-8 md:p-12">
              <div className="flex flex-col items-start py-6">
                <h2 className="text-2xl">Book an appointment</h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Message us on WhatsApp and our team will confirm your visit.
                </p>
                <BookingLink className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent">
                  Book on WhatsApp <MessageCircle className="size-4" />
                </BookingLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-[2rem] border border-border/60 bg-card p-8">
                <h3 className="text-xl">Visit us</h3>
                <ul className="mt-5 space-y-4 text-sm">
                  {address && (
                    <li className="flex gap-3">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                      {mapLink ? (
                        <a href={mapLink} target="_blank" rel="noreferrer" className="whitespace-pre-line hover:text-accent">{address}</a>
                      ) : (
                        <span className="whitespace-pre-line">{address}</span>
                      )}
                    </li>
                  )}
                  {phone && (
                    <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-accent" /><a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-accent">{phone}</a></li>
                  )}
                  {emergency && (
                    <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-destructive" /><a href={`tel:${emergency.replace(/\s/g, "")}`} className="hover:text-accent">{emergency} <span className="text-xs text-muted-foreground">(emergency)</span></a></li>
                  )}
                  {email && (
                    <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-accent" /><a href={`mailto:${email}`} className="hover:text-accent">{email}</a></li>
                  )}
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

              {mapEmbed && (
                <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card">
                  <div className="aspect-[4/3] w-full bg-secondary">
                    <iframe
                      title="Clinic location"
                      src={mapEmbed}
                      className="size-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

