import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { useGallery } from "@/hooks/useContent";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Maison Dentaire" },
      { name: "description", content: "A quiet look at our studio, our craft, and the smiles we've had the privilege of shaping." },
      { property: "og:title", content: "Gallery — Maison Dentaire" },
      { property: "og:description", content: "The studio, the craft, and the smiles." },
    ],
  }),
  component: () => (<PageGate slug="gallery"><GalleryPage /></PageGate>),
});

function GalleryPage() {
  const { data, isLoading } = useGallery();
  const items = (data ?? []) as any[];

  const cats = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => { if (i.category) set.add(i.category); });
    return ["all", ...Array.from(set)];
  }, [items]);

  const [active, setActive] = useState<string>("all");
  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

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

        {cats.length > 1 && (
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm capitalize transition-all",
                    active === c
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border/70 text-foreground/80 hover:border-accent hover:text-accent"
                  )}
                >
                  {c === "all" ? "All" : c}
                </button>
              ))}
            </div>
          </Reveal>
        )}
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24 md:pb-32">
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-accent" /></div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No images to show yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((it, i) => (
              <Reveal key={it.id} delay={(i % 8) * 0.04}>
                <figure
                  className={cn(
                    "group relative overflow-hidden rounded-[1.25rem] border border-border/60",
                    i % 5 === 4 ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"
                  )}
                >
                  <img
                    src={it.image_url}
                    alt={it.caption ?? ""}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {(it.caption || it.category) && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/70 to-transparent p-4">
                      {it.category && <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">{it.category}</p>}
                      {it.caption && <p className="mt-1 text-sm text-ivory">{it.caption}</p>}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
