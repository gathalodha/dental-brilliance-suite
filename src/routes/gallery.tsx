import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Maison Dentaire" },
      { name: "description", content: "A quiet look at our studio, our craft, and the smiles we've had the privilege of shaping." },
      { property: "og:title", content: "Gallery — Maison Dentaire" },
      { property: "og:description", content: "The studio, the craft, and the smiles." },
    ],
  }),
  component: GalleryPage,
});

type Cat = "all" | "studio" | "smiles" | "moments";
const items: { id: number; cat: Exclude<Cat, "all">; title: string; hue: string }[] = [
  { id: 1, cat: "studio", title: "Reception, morning light", hue: "from-[#e8dbc7] to-[#c9b79c]" },
  { id: 2, cat: "smiles", title: "Porcelain veneers, case 042", hue: "from-[#efe6d6] to-[#b08968]" },
  { id: 3, cat: "moments", title: "Consultation room", hue: "from-[#f2ead9] to-[#8d6e52]" },
  { id: 4, cat: "studio", title: "Sterilisation lab", hue: "from-[#e0d0b5] to-[#6b4f38]" },
  { id: 5, cat: "smiles", title: "Composite bonding refresh", hue: "from-[#f5eedd] to-[#c9b79c]" },
  { id: 6, cat: "moments", title: "Post-treatment tea service", hue: "from-[#eadfcb] to-[#a48664]" },
  { id: 7, cat: "studio", title: "Operatory 3", hue: "from-[#ded0b6] to-[#7f5f45]" },
  { id: 8, cat: "smiles", title: "Whitening + hygiene", hue: "from-[#f0e6d1] to-[#b08968]" },
  { id: 9, cat: "moments", title: "Consult with Dr Vale", hue: "from-[#e6d8bf] to-[#8d6e52]" },
  { id: 10, cat: "studio", title: "Reading nook", hue: "from-[#f4ecdb] to-[#c9b79c]" },
  { id: 11, cat: "smiles", title: "Full-mouth rehabilitation", hue: "from-[#ecdfc6] to-[#6b4f38]" },
  { id: 12, cat: "moments", title: "Morning briefing", hue: "from-[#efe4cd] to-[#a48664]" },
];

const cats: { id: Cat; label: string }[] = [
  { id: "all", label: "All" },
  { id: "studio", label: "The studio" },
  { id: "smiles", label: "Smile work" },
  { id: "moments", label: "Moments" },
];

function GalleryPage() {
  const [active, setActive] = useState<Cat>("all");
  const filtered = active === "all" ? items : items.filter((i) => i.cat === active);

  return (
    <div>
      <section className="container-px mx-auto max-w-7xl pt-16 pb-10 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Gallery</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl leading-[1.05] md:text-7xl">
            The studio, the <em className="italic text-accent">craft</em>, the smiles.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A quiet look at the work we do and the space we do it in. Case photography shared
            with patient consent.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm transition-all",
                  active === c.id
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border/70 text-foreground/80 hover:border-accent hover:text-accent"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((it, i) => (
            <Reveal key={it.id} delay={(i % 8) * 0.04}>
              <figure
                className={cn(
                  "group relative overflow-hidden rounded-[1.25rem] border border-border/60",
                  it.id % 5 === 0 ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"
                )}
              >
                <div className={cn("size-full bg-gradient-to-br transition-transform duration-700 group-hover:scale-105", it.hue)} />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/70 to-transparent p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">{it.cat}</p>
                  <p className="mt-1 text-sm text-ivory">{it.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
