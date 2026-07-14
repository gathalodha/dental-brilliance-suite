import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigation, useSiteSettings } from "@/hooks/useContent";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: nav } = useNavigation();
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clinicName = settings?.clinic_name ?? "Maison Dentaire";
  const phone = settings?.phone ?? "";
  const logo = settings?.logo_url as string | null | undefined;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-[0_1px_0_0_color-mix(in_oklab,var(--bronze)_15%,transparent)]" : "bg-transparent"
      )}
    >
      <div className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          {logo ? (
            <img src={logo} alt={clinicName} className="size-9 rounded-full object-cover" />
          ) : (
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg leading-none">
              {clinicName.slice(0, 1).toLowerCase()}
            </span>
          )}
          <span className="font-display text-xl tracking-tight">{clinicName}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {(nav ?? []).map((n: any) => (
            <a
              key={n.id}
              href={n.href}
              className="text-sm text-foreground/80 transition-colors hover:text-accent"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-accent">
              <Phone className="size-4" />
              {phone}
            </a>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
          >
            Book a visit
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-full border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="container-px mx-auto max-w-7xl border-t border-border/60 py-4">
            <div className="flex flex-col gap-1">
              {(nav ?? []).map((n: any) => (
                <a
                  key={n.id}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base hover:bg-secondary"
                >
                  {n.label}
                </a>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                Book a visit
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
