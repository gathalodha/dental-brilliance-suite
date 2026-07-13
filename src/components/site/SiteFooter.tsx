import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[color-mix(in_oklab,var(--cocoa)_96%,var(--bronze))] text-ivory">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-[var(--bronze)] text-primary-foreground font-display text-lg leading-none">m</span>
              <span className="font-display text-xl">Maison Dentaire</span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-ivory/70">
              A boutique dental practice where clinical excellence meets calm,
              considered design. Modern dentistry, delivered with care.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-ivory/60">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[var(--bronze-soft)]">About</Link></li>
              <li><Link to="/treatments" className="hover:text-[var(--bronze-soft)]">Treatments</Link></li>
              <li><Link to="/doctors" className="hover:text-[var(--bronze-soft)]">Our Doctors</Link></li>
              <li><Link to="/gallery" className="hover:text-[var(--bronze-soft)]">Gallery</Link></li>
              <li><Link to="/testimonials" className="hover:text-[var(--bronze-soft)]">Testimonials</Link></li>
              <li><Link to="/blog" className="hover:text-[var(--bronze-soft)]">Journal</Link></li>
              <li><Link to="/faqs" className="hover:text-[var(--bronze-soft)]">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--bronze-soft)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-ivory/60">Visit</h4>
            <ul className="mt-5 space-y-3 text-sm text-ivory/80">
              <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /> 24 Bronzewood Lane, Suite 5<br />San Francisco, CA</li>
              <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0" /> (555) 123-4567</li>
              <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0" /> hello@maisondentaire.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-ivory/60">Hours</h4>
            <ul className="mt-5 space-y-2 text-sm text-ivory/80">
              <li className="flex justify-between gap-4"><span>Mon–Thu</span><span>8am — 6pm</span></li>
              <li className="flex justify-between gap-4"><span>Friday</span><span>8am — 4pm</span></li>
              <li className="flex justify-between gap-4"><span>Saturday</span><span>By appointment</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span>Closed</span></li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Instagram" className="grid size-9 place-items-center rounded-full border border-ivory/20 hover:border-[var(--bronze-soft)]"><Instagram className="size-4" /></a>
              <a href="#" aria-label="Facebook" className="grid size-9 place-items-center rounded-full border border-ivory/20 hover:border-[var(--bronze-soft)]"><Facebook className="size-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Maison Dentaire. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
