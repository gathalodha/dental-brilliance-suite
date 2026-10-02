import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigation, useSiteSettings, usePageVisibility, slugFromHref, isPageVisible } from "@/hooks/useContent";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: nav, isPending: navPending } = useNavigation();
  const { data: pageVis, isPending: visibilityPending } = usePageVisibility();
  const { data: settings, isPending: settingsPending } = useSiteSettings();

  const visibleNav = (nav ?? []).filter((n: any) => {
    const slug = slugFromHref(n.href);
    if (!slug) return true;
    return isPageVisible(pageVis, slug);
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clinicName = settings?.clinic_name ?? "";
  const phone = settings?.phone ?? "";
  const logo = settings?.logo_url as string | null | undefined;

  if (settingsPending || navPending || visibilityPending) {
    return <div className="h-20" aria-hidden="true" />;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-[0_10px_35px_-30px_color-mix(in_oklab,var(--primary)_45%,transparent)]" : "bg-transparent"
      )}
    >
      <div className="container-px mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:h-20 lg:flex lg:justify-between">
        <Link to="/" className="group flex min-w-0 items-center gap-2">
          {logo ? (
            <img src={logo} alt={clinicName} className="size-9 rounded-full object-cover" />
          ) : (
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg leading-none">
              {clinicName.slice(0, 1).toLowerCase()}
            </span>
          )}
          <span className="truncate font-display text-xl">{clinicName}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {visibleNav.map((n: any) => (
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
          className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-secondary lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 shadow-lg backdrop-blur lg:hidden">
          <div className="container-px mx-auto max-w-7xl py-3">
            <div className="flex flex-col gap-1">
              {visibleNav.map((n: any) => (
                <a
                  key={n.id}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-3 py-3 text-base transition-colors hover:bg-secondary"
                >
                  {n.label}
                </a>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
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
