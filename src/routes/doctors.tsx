import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Our Doctors — Maison Dentaire" },
      { name: "description", content: "Meet the board-certified specialists behind Maison Dentaire — cosmetic, restorative, orthodontic and surgical expertise under one roof." },
      { property: "og:title", content: "Our Doctors — Maison Dentaire" },
      { property: "og:description", content: "Meet the specialists behind Maison Dentaire." },
    ],
  }),
  component: DoctorsPage,
});

const doctors = [
  {
    name: "Dr. Elena Chen",
    role: "Founder · Cosmetic & Restorative",
    creds: "DDS, MSD — Harvard School of Dental Medicine",
    bio: "Elena founded Maison Dentaire on a belief that a dental visit should feel like a moment of care. She's known for her hand-layered porcelain veneers and calm chairside manner.",
    focus: ["Veneers", "Smile Design", "Ceramic Crowns"],
    initials: "EC",
  },
  {
    name: "Dr. Marcus Whitfield",
    role: "Surgical & Implants",
    creds: "DMD, Oral Surgery Residency — UCSF",
    bio: "A specialist in full-arch and guided implant surgery, Marcus is meticulous about planning and known for gentle, patient-first surgical technique.",
    focus: ["Implants", "Bone Grafting", "Extractions"],
    initials: "MW",
  },
  {
    name: "Dr. Priya Anand",
    role: "Orthodontics",
    creds: "DDS, MS Orthodontics — NYU",
    bio: "Priya blends Invisalign expertise with a designer's eye for facial harmony. She's worked with patients from ages 8 to 78.",
    focus: ["Invisalign", "Aligners", "Bite Correction"],
    initials: "PA",
  },
  {
    name: "Dr. Julien Rossi",
    role: "Endodontics",
    creds: "DDS, Endo Residency — University of Michigan",
    bio: "Microscope-assisted root canal therapy with a reputation for making the notoriously feared procedure quietly comfortable.",
    focus: ["Root Canals", "Retreatment", "Microsurgery"],
    initials: "JR",
  },
  {
    name: "Dr. Sofia Delacroix",
    role: "Pediatric & Family",
    creds: "DDS, Pediatric Dentistry — Boston University",
    bio: "Sofia leads our family program with unhurried appointments and a knack for turning first visits into a favorite outing.",
    focus: ["Pediatrics", "Family Care", "Prevention"],
    initials: "SD",
  },
  {
    name: "Dr. Idris Okafor",
    role: "Periodontics & Hygiene",
    creds: "DDS, MS Periodontology — Columbia",
    bio: "Idris oversees our hygiene program and gum health protocols, championing minimally invasive periodontal care.",
    focus: ["Periodontics", "Hygiene", "Gum Grafting"],
    initials: "IO",
  },
];

function DoctorsPage() {
  return (
    <div>
      <section className="container-px mx-auto max-w-7xl pt-16 pb-16 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Our Doctors</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl leading-[1.05] md:text-7xl">
            Six specialists. <em className="italic text-accent">One team.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Every treatment plan at Maison is reviewed by more than one specialist.
            Nothing is outsourced — we do the work, together, under one roof.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_color-mix(in_oklab,var(--cocoa)_35%,transparent)]">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-[var(--bronze-soft)] to-[color-mix(in_oklab,var(--bronze)_30%,var(--pearl))]">
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-[8rem] leading-none text-ivory/60 transition-transform duration-700 group-hover:scale-105">
                      {d.initials}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/50 to-transparent p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-ivory/80">{d.role}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl">{d.name}</h3>
                  <p className="mt-1 flex items-start gap-2 text-xs text-muted-foreground">
                    <GraduationCap className="mt-0.5 size-3.5 shrink-0" /> {d.creds}
                  </p>
                  <p className="mt-4 flex-1 text-sm text-muted-foreground">{d.bio}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {d.focus.map((f) => (
                      <span key={f} className="flex items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground">
                        <Award className="size-3 text-accent" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        <Reveal>
          <div className="rounded-[2.5rem] border border-border/60 bg-card p-10 md:p-16">
            <div className="grid gap-6 md:grid-cols-[1.4fr_auto] md:items-center">
              <h2 className="text-balance text-4xl md:text-5xl">
                Meet your specialist at a <em className="italic text-accent">complimentary consult.</em>
              </h2>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground hover:bg-accent"
              >
                Book now <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
