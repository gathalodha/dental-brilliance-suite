import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeroCarouselEditor, SingletonEditor, ListEditor, type FieldDef } from "@/components/admin/Editors";
import { contentKeys } from "@/hooks/useContent";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { listMedia, deleteMedia, uploadMedia } from "@/lib/media";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, ExternalLink, Loader2, Trash2, Upload, Copy, Menu, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Maison Dentaire" }] }),
  component: AdminPage,
});

type Section =
  | "Overview"
  | "Bookings"
  | "Hero"
  | "About"
  | "Site Settings"
  | "Footer"
  | "Navigation"
  | "Treatments"
  | "Doctors"
  | "Gallery"
  | "Testimonials"
  | "FAQs"
  | "Page Visibility"
  | "Social Links"
  | "Footer Links"
  | "Media Library"
  | "Admins";

type NavGroup = { label: string; items: { label: string; section: Section }[] };

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Dashboard",
    items: [
      { label: "Overview", section: "Overview" },
      { label: "Bookings", section: "Bookings" },
    ],
  },
  {
    label: "Website",
    items: [
      { label: "Clinic Name & Contact", section: "Site Settings" },
      { label: "Home — Hero", section: "Hero" },
      { label: "About", section: "About" },
      { label: "Doctors", section: "Doctors" },
      { label: "Treatments", section: "Treatments" },
      { label: "Gallery", section: "Gallery" },
      { label: "Testimonials", section: "Testimonials" },
      { label: "FAQs", section: "FAQs" },
      { label: "Page Visibility", section: "Page Visibility" },
    ],
  },
  {
    label: "Menus & Footer",
    items: [
      { label: "Navigation Menu", section: "Navigation" },
      { label: "Footer Content", section: "Footer" },
      { label: "Footer Links", section: "Footer Links" },
      { label: "Social Links", section: "Social Links" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Media Library", section: "Media Library" },
      { label: "Admins", section: "Admins" },
    ],
  },
];

function AdminPage() {
  const { user, signOut } = useAuth();
  const [section, setSection] = useState<Section>("Overview");
  const [menuOpen, setMenuOpen] = useState(false);

  const navList = (
    <nav className="flex flex-col gap-5">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <p className="px-3 pb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {group.label}
          </p>
          {group.items.map((item) => (
            <button
              key={item.section}
              onClick={() => {
                setSection(item.section);
                setMenuOpen(false);
              }}
              className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                section === item.section ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Admin</p>
          <h1 className="font-display text-2xl md:text-3xl">Content Management</h1>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden text-muted-foreground sm:inline">{user?.email}</span>
          <Button variant="outline" size="sm" asChild>
            <Link to="/"><ExternalLink className="mr-2 size-4" /> <span className="hidden sm:inline">View site</span></Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            <LogOut className="mr-2 size-4" /> <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>

      {/* Mobile section switcher */}
      <div className="mb-4 md:hidden">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Menu className="size-4" />
                {section}
              </span>
              <ChevronDown className="size-4 opacity-60" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto p-6">
            <SheetHeader className="p-0 pb-4 text-left">
              <SheetTitle className="font-display text-lg">Sections</SheetTitle>
              <SheetDescription className="text-xs">Pick the part of the site you want to edit.</SheetDescription>
            </SheetHeader>
            {navList}
          </SheetContent>

        </Sheet>
      </div>

      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <div className="hidden md:block">{navList}</div>

        <div className="min-w-0">

          {section === "Overview" && <Overview />}
          {section === "Bookings" && <Bookings />}
          {section === "Hero" && (
            <div className="space-y-6">
              <HeroCarouselEditor />
              <SingletonEditor
                table="hero_content"
                queryKey={contentKeys.hero}
                title="Hero text and buttons"
                fields={[
                  { key: "brand_line", label: "Brand line / tagline" },
                  { key: "heading", label: "Main heading" },
                  { key: "subheading", label: "Subheading", type: "textarea" },
                  { key: "image_url", label: "Fallback image", type: "image" },
                  { key: "background_video_url", label: "Background video URL", type: "url" },
                  { key: "cta_text", label: "Primary CTA text" },
                  { key: "cta_link", label: "Primary CTA link", type: "url" },
                  { key: "cta_enabled", label: "Show primary CTA", type: "boolean" },
                  { key: "secondary_cta_text", label: "Secondary CTA text" },
                  { key: "secondary_cta_link", label: "Secondary CTA link", type: "url" },
                  { key: "secondary_cta_enabled", label: "Show secondary CTA", type: "boolean" },
                ]}
              />
            </div>
          )}
          {section === "About" && (
            <SingletonEditor
              table="about_content"
              queryKey={contentKeys.about}
              title="About Section"
              fields={[
                { key: "title", label: "Title" },
                { key: "description", label: "Description", type: "textarea" },
                { key: "image_url", label: "Image", type: "image" },
                { key: "stat_years", label: "Years of experience", type: "number" },
                { key: "stat_patients", label: "Patients", type: "number" },
                { key: "stat_treatments", label: "Treatments offered", type: "number" },
                { key: "cta_text", label: "CTA text" },
                { key: "cta_link", label: "CTA link", type: "url" },
              ]}
            />
          )}
          {section === "Site Settings" && (
            <SingletonEditor
              table="site_settings"
              queryKey={contentKeys.settings}
              title="Clinic Name & Contact"
              description="Manage the clinic identity and the contact details used throughout the website."
              groups={[
                {
                  label: "Clinic identity",
                  fields: [
                    { key: "clinic_name", label: "Clinic name" },
                    { key: "brand_line", label: "Brand line" },
                    { key: "logo_url", label: "Logo", type: "image" },
                    { key: "favicon_url", label: "Favicon URL", type: "url" },
                    { key: "primary_color", label: "Primary brand color" },
                    { key: "secondary_color", label: "Secondary brand color" },
                  ],
                },
                {
                  label: "Contact details",
                  description: "These details appear on the home, contact, header and footer areas.",
                  fields: [
                    { key: "phone", label: "Phone" },
                    { key: "emergency_phone", label: "Emergency phone" },
                    { key: "email", label: "Email" },
                    { key: "address", label: "Address", type: "textarea" },
                  ],
                },
                {
                  label: "Google Maps",
                  fields: [
                    { key: "google_maps_link", label: "Google Maps link", placeholder: "https://maps.google.com/…", type: "url" },
                    { key: "google_maps_embed", label: "Google Maps embed URL", placeholder: "https://www.google.com/maps/embed?pb=…", type: "url" },
                  ],
                },
                {
                  label: "Quick contact buttons",
                  description: "Choose which contact shortcuts appear at the bottom-right of the website.",
                  fields: [
                    { key: "show_call", label: "Show call button", type: "boolean" },
                    { key: "call_button_link", label: "Call link (leave empty to use phone)", type: "url" },
                    { key: "show_whatsapp", label: "Show WhatsApp button", type: "boolean" },
                    { key: "whatsapp_number", label: "WhatsApp number" },
                    { key: "whatsapp_message", label: "Default WhatsApp message", type: "textarea" },
                    { key: "show_telegram", label: "Show Telegram button", type: "boolean" },
                    { key: "telegram_link", label: "Telegram link", type: "url" },
                  ],
                },
                {
                  label: "Search & social sharing",
                  fields: [
                    { key: "meta_title", label: "Default SEO title" },
                    { key: "meta_description", label: "Default SEO description", type: "textarea" },
                    { key: "meta_keywords", label: "SEO keywords" },
                    { key: "og_image_url", label: "Social share image", type: "image" },
                  ],
                },
              ]}
            />
          )}

          {section === "Footer" && (
            <SingletonEditor
              table="footer_content"
              queryKey={contentKeys.footer}
              title="Footer Content"
              fields={[
                { key: "description", label: "Footer description", type: "textarea" },
                { key: "hours_mon_thu", label: "Hours Mon–Thu" },
                { key: "hours_fri", label: "Hours Fri" },
                { key: "hours_sat", label: "Hours Sat" },
                { key: "hours_sun", label: "Hours Sun" },
                { key: "copyright_text", label: "Copyright text" },
              ]}
            />
          )}
          {section === "Navigation" && (
            <ListEditor
              table="navigation_items"
              queryKey={contentKeys.navigation}
              title="Navigation Menu"
              emptyRow={{ label: "New link", href: "/", visible: true }}
              fields={[
                { key: "label", label: "Label" },
                { key: "href", label: "URL" },
                { key: "visible", label: "Visible", type: "boolean" },
              ]}
            />
          )}
          {section === "Treatments" && (
            <ListEditor
              table="treatments"
              queryKey={contentKeys.treatments}
              title="Treatments"
              emptyRow={{ name: "New treatment", description: "", visible: true }}
              fields={treatmentFields}
            />
          )}
          {section === "Doctors" && (
            <ListEditor
              table="doctors"
              queryKey={contentKeys.doctors}
              title="Doctors"
              emptyRow={{ name: "New doctor", visible: true }}
              fields={doctorFields}
            />
          )}
          {section === "Gallery" && (
            <ListEditor
              table="gallery_images"
              queryKey={contentKeys.gallery}
              title="Gallery"
              emptyRow={{ image_url: "", caption: "", category: "", visible: true }}
              fields={[
                { key: "image_url", label: "Image", type: "image" },
                { key: "caption", label: "Caption" },
                { key: "category", label: "Category (e.g. studio, smiles, moments)" },
                { key: "visible", label: "Visible", type: "boolean" },
              ]}
            />
          )}
          {section === "Testimonials" && (
            <ListEditor
              table="testimonials"
              queryKey={contentKeys.testimonials}
              title="Testimonials"
              emptyRow={{ patient_name: "New patient", review: "", rating: 5, visible: true }}
              fields={[
                { key: "patient_name", label: "Patient name" },
                { key: "review", label: "Review", type: "textarea" },
                { key: "rating", label: "Rating (1–5)", type: "number" },
                { key: "image_url", label: "Patient image", type: "image" },
                { key: "treatment_type", label: "Treatment type" },
                { key: "review_date", label: "Review date", type: "date" },
                { key: "visible", label: "Visible", type: "boolean" },
              ]}
            />
          )}
          {section === "FAQs" && (
            <ListEditor
              table="faqs"
              queryKey={contentKeys.faqs}
              title="FAQs"
              emptyRow={{ question: "New question", answer: "", visible: true }}
              fields={[
                { key: "question", label: "Question" },
                { key: "answer", label: "Answer", type: "textarea" },
                { key: "category", label: "Category (groups FAQs on the page)" },
                { key: "visible", label: "Visible", type: "boolean" },
              ]}
            />
          )}
          {section === "Social Links" && (
            <ListEditor
              table="social_links"
              queryKey={contentKeys.socialLinks}
              title="Social Links"
              emptyRow={{ platform: "instagram", url: "", visible: true }}
              fields={[
                { key: "platform", label: "Platform (instagram, facebook, x, youtube, linkedin, telegram, whatsapp)" },
                { key: "url", label: "URL", type: "url" },
                { key: "visible", label: "Visible", type: "boolean" },
              ]}
            />
          )}
          {section === "Footer Links" && (
            <ListEditor
              table="footer_links"
              queryKey={contentKeys.footerLinks}
              title="Footer Links"
              emptyRow={{ label: "New link", href: "/", visible: true }}
              fields={[
                { key: "label", label: "Label" },
                { key: "href", label: "URL" },
                { key: "visible", label: "Visible", type: "boolean" },
              ]}
            />
          )}
          {section === "Page Visibility" && <PageVisibilityEditor />}
          {section === "Media Library" && <MediaLibrary />}
          {section === "Admins" && <Admins />}
        </div>
      </div>
    </div>
  );
}

const treatmentFields: FieldDef[] = [
  { key: "name", label: "Name" },
  { key: "short_description", label: "Short description" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "image_url", label: "Featured image", type: "image" },
  { key: "duration", label: "Duration (e.g. 60 min, 2–3 visits)" },
  { key: "tags", label: "Tags", type: "array", placeholder: "Cosmetic, 60 min" },
  { key: "benefits", label: "Benefits", type: "array", placeholder: "Comma separated" },
  { key: "procedure_details", label: "Procedure details", type: "textarea" },
  { key: "cta_text", label: "CTA button text" },
  { key: "cta_link", label: "CTA button link", type: "url" },
  { key: "visible", label: "Visible", type: "boolean" },
];

const doctorFields: FieldDef[] = [
  { key: "name", label: "Name" },
  { key: "role_label", label: "Role / specialization (shown on card)" },
  { key: "qualification", label: "Qualification" },
  { key: "experience", label: "Experience" },
  { key: "bio", label: "Bio", type: "textarea" },
  { key: "focus", label: "Focus areas", type: "array", placeholder: "Veneers, Smile Design" },
  { key: "consultation_details", label: "Consultation details" },
  { key: "image_url", label: "Profile image", type: "image" },
  { key: "visible", label: "Visible", type: "boolean" },
];

function Overview() {
  return (
    <Card className="p-6">
      <h2 className="font-display text-2xl">Welcome</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Choose a section from the menu, make your changes, then select Save. Changes appear on the website immediately.
      </p>
      <p className="mt-5 text-sm text-muted-foreground">Start with <strong className="text-foreground">Clinic Name & Contact</strong> for your shared clinic details, or choose a website page to edit its content.</p>
    </Card>
  );
}

function Bookings() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: contentKeys.appointments,
    queryFn: async () => {
      const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: contentKeys.appointments }); },
  });
  if (isLoading) return <Loader2 className="animate-spin" />;
  return (
    <Card className="p-6">
      <h2 className="font-display text-2xl">Booking Requests</h2>
      <div className="mt-6 space-y-3">
        {(data ?? []).map((a: any) => (
          <div key={a.id} className="rounded-lg border p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <strong>{a.name}</strong> · {a.email} · {a.phone}
                {a.treatment && <> · <span className="text-muted-foreground">{a.treatment}</span></>}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{new Date(a.created_at).toLocaleString()}</span>
                <Button size="icon" variant="ghost" onClick={() => del.mutate(a.id)}><Trash2 className="size-4" /></Button>
              </div>
            </div>
            {a.preferred_date && <div className="mt-1 text-xs text-muted-foreground">Preferred: {a.preferred_date}</div>}
            {a.message && <p className="mt-2 text-muted-foreground">{a.message}</p>}
          </div>
        ))}
        {(data ?? []).length === 0 && <p className="text-sm text-muted-foreground">No bookings yet.</p>}
      </div>
    </Card>
  );
}

function MediaLibrary() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["media-lib"], queryFn: listMedia });
  const [busy, setBusy] = useState(false);
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Media Library</h2>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-secondary">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setBusy(true);
              try { await uploadMedia(f); toast.success("Uploaded"); qc.invalidateQueries({ queryKey: ["media-lib"] }); }
              catch (err: any) { toast.error(err.message); }
              finally { setBusy(false); e.target.value = ""; }
            }}
          />
        </label>
      </div>
      {isLoading ? <Loader2 className="mt-6 animate-spin" /> : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {(data ?? []).map((m) => (
            <div key={m.name} className="group relative overflow-hidden rounded-lg border">
              <img src={m.url} alt={m.name} className="aspect-square w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-background/90 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button size="icon" variant="ghost" onClick={() => { navigator.clipboard.writeText(m.url); toast.success("URL copied"); }}>
                  <Copy className="size-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={async () => {
                  if (!confirm("Delete this file?")) return;
                  await deleteMedia(m.name); toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["media-lib"] });
                }}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
          {(data ?? []).length === 0 && <p className="col-span-full text-sm text-muted-foreground">No files yet.</p>}
        </div>
      )}
    </Card>
  );
}

function Admins() {
  const { data } = useQuery({
    queryKey: ["admin_emails"],
    queryFn: async () => {
      const { data, error } = await supabase.from("admin_emails").select("*").order("created_at");
      if (error) throw error;
      return data ?? [];
    },
  });
  return (
    <Card className="p-6">
      <h2 className="font-display text-2xl">Admins</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        To grant admin access, add an email to the <code>admin_emails</code> table in the Supabase SQL editor.
        Then the user signs up at <code>/auth</code> with that same email.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-secondary p-4 text-xs">
{`INSERT INTO public.admin_emails (email)
VALUES ('new-admin@example.com');`}
      </pre>
      <div className="mt-6 space-y-2">
        {(data ?? []).map((r: any) => (
          <div key={r.email} className="rounded border p-3 text-sm">{r.email}</div>
        ))}
      </div>
    </Card>
  );
}

function PageVisibilityEditor() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: contentKeys.pageVisibility,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_visibility" as any)
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });
  const toggle = useMutation({
    mutationFn: async ({ slug, visible }: { slug: string; visible: boolean }) => {
      const { error } = await supabase
        .from("page_visibility" as any)
        .update({ visible })
        .eq("slug", slug);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: contentKeys.pageVisibility });
    },
    onError: (e: any) => toast.error(e.message),
  });
  if (isLoading) return <Loader2 className="animate-spin" />;
  return (
    <Card className="p-6">
      <h2 className="font-display text-2xl">Page Visibility</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Toggle whether a page is reachable on the public site. Hidden pages are removed
        from the header / footer navigation, and direct visits redirect to Home.
      </p>
      <div className="mt-6 space-y-2">
        {(data ?? []).map((row: any) => (
          <div key={row.slug} className="flex items-center justify-between rounded-lg border p-3 text-sm">
            <div>
              <div className="font-medium">{row.label}</div>
              <div className="text-xs text-muted-foreground">/{row.slug}</div>
            </div>
            <label className="inline-flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{row.visible ? "Visible" : "Hidden"}</span>
              <input
                type="checkbox"
                className="size-5 accent-[var(--accent)]"
                checked={Boolean(row.visible)}
                onChange={(e) => toggle.mutate({ slug: row.slug, visible: e.target.checked })}
              />
            </label>
          </div>
        ))}
        {(data ?? []).length === 0 && (
          <p className="text-sm text-muted-foreground">
            No pages found. Seed the <code>page_visibility</code> table to enable this control.
          </p>
        )}
      </div>
    </Card>
  );
}
