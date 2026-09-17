import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { uploadMedia } from "@/lib/media";
import { Loader2, Upload, Trash2, Plus, ArrowUp, ArrowDown, ChevronDown } from "lucide-react";

type FieldType = "text" | "textarea" | "number" | "url" | "boolean" | "image" | "array" | "date";

export type FieldDef = {
  key: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
};

export type FieldGroup = { label: string; description?: string; fields: FieldDef[] };

/* ---------- Singleton editor (one-row tables) ---------- */
export function SingletonEditor({
  table,
  queryKey,
  fields,
  groups,
  title,
  description,
}: {
  table: string;
  queryKey: readonly string[];
  fields?: FieldDef[];
  groups?: FieldGroup[];
  title: string;
  description?: string;
}) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from(table as any).select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data as Record<string, any> | null;
    },
    staleTime: 30_000,
  });
  const [form, setForm] = useState<Record<string, any>>({});
  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const resolvedGroups: FieldGroup[] = groups ?? [{ label: "", fields: fields ?? [] }];

  const save = useMutation({
    mutationFn: async () => {
      const { id: _id, created_at: _c, updated_at: _u, ...rest } = form;
      const { error } = await supabase.from(table as any).update(rest).eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey });
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <Card className="p-5 md:p-6">
      <h2 className="font-display text-2xl">{title}</h2>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}

      <div className="mt-6 space-y-8">
        {resolvedGroups.map((g, gi) => (
          <div key={g.label || gi}>
            {g.label && (
              <div className="mb-4 border-b pb-2">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{g.label}</p>
                {g.description && <p className="mt-1 text-xs text-muted-foreground">{g.description}</p>}
              </div>
            )}
            <div className="grid gap-5 md:grid-cols-2">
              {g.fields.map((f) => (
                <FieldInput key={f.key} field={f} value={form[f.key]} onChange={(v) => setForm((p) => ({ ...p, [f.key]: v }))} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => save.mutate()} disabled={save.isPending} className="w-full sm:w-auto">
          {save.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </Card>
  );
}


/* ---------- List editor (many-row tables) ---------- */
export function ListEditor({
  table,
  queryKey,
  fields,
  title,
  emptyRow,
}: {
  table: string;
  queryKey: readonly string[];
  fields: FieldDef[];
  title: string;
  emptyRow: Record<string, any>;
}) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [...queryKey, "admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from(table as any).select("*").order("display_order");
      if (error) throw error;
      return (data ?? []) as Record<string, any>[];
    },
    staleTime: 30_000,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: [...queryKey, "admin"] });
    qc.invalidateQueries({ queryKey });
  };


  const add = useMutation({
    mutationFn: async () => {
      const nextOrder = ((data ?? []).reduce((m, r) => Math.max(m, r.display_order ?? 0), 0) ?? 0) + 1;
      const { error } = await supabase.from(table as any).insert({ ...emptyRow, display_order: nextOrder });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Added"); invalidate(); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Deleted"); invalidate(); },
    onError: (e: any) => toast.error(e.message),
  });

  const reorder = async (id: string, dir: -1 | 1) => {
    if (!data) return;
    const idx = data.findIndex((r) => r.id === id);
    const swap = data[idx + dir];
    if (!swap) return;
    const a = data[idx];
    await Promise.all([
      supabase.from(table as any).update({ display_order: swap.display_order }).eq("id", a.id),
      supabase.from(table as any).update({ display_order: a.display_order }).eq("id", swap.id),
    ]);

    invalidate();
  };

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">{title}</h2>
        <Button size="sm" onClick={() => add.mutate()}>
          <Plus className="mr-2 size-4" /> Add new
        </Button>
      </div>

      {(data ?? []).map((row, i) => (
        <RowEditor
          key={row.id}
          row={row}
          fields={fields}
          table={table}
          onSaved={invalidate}
          onDelete={() => { if (confirm("Delete this item?")) del.mutate(row.id); }}
          onUp={i > 0 ? () => reorder(row.id, -1) : undefined}
          onDown={i < (data!.length - 1) ? () => reorder(row.id, 1) : undefined}
        />
      ))}
      {(data ?? []).length === 0 && <p className="text-sm text-muted-foreground">No items yet.</p>}
    </div>
  );
}

export function HeroCarouselEditor() {
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const queryKey = ["hero_carousel_images", "admin"] as const;
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from("hero_carousel_images").select("*").order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const refresh = () => {
    qc.invalidateQueries({ queryKey });
    qc.invalidateQueries({ queryKey: ["hero_carousel_images"] });
  };

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("hero_carousel_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Image removed"); refresh(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const reorder = async (id: string, direction: -1 | 1) => {
    if (!data) return;
    const index = data.findIndex((item) => item.id === id);
    const current = data[index];
    const swap = data[index + direction];
    if (!current || !swap) return;
    const [{ error: currentError }, { error: swapError }] = await Promise.all([
      supabase.from("hero_carousel_images").update({ display_order: swap.display_order }).eq("id", current.id),
      supabase.from("hero_carousel_images").update({ display_order: current.display_order }).eq("id", swap.id),
    ]);
    if (currentError || swapError) {
      toast.error(currentError?.message ?? swapError?.message ?? "Could not reorder images");
      return;
    }
    refresh();
  };

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl">Hero carousel images</h2>
          <p className="mt-2 text-sm text-muted-foreground">Upload images and use the arrows to choose their display order.</p>
        </div>
        <Button asChild disabled={busy}>
          <label className="cursor-pointer">
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Add images
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={async (event) => {
                const files = Array.from(event.target.files ?? []);
                if (!files.length) return;
                setBusy(true);
                try {
                  const urls = await Promise.all(files.map(uploadMedia));
                  const firstOrder = (data?.reduce((max, item) => Math.max(max, item.display_order), 0) ?? 0) + 1;
                  const rows = urls.map((imageUrl, index) => ({
                    image_url: imageUrl,
                    alt_text: "Dental clinic",
                    display_order: firstOrder + index,
                    visible: true,
                  }));
                  const { error } = await supabase.from("hero_carousel_images").insert(rows);
                  if (error) throw error;
                  toast.success(files.length === 1 ? "Image added" : `${files.length} images added`);
                  refresh();
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Could not add images");
                } finally {
                  setBusy(false);
                  event.target.value = "";
                }
              }}
            />
          </label>
        </Button>
      </div>

      {isLoading ? <Loader2 className="mt-6 animate-spin" /> : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {(data ?? []).map((image, index) => (
            <div key={image.id} className="overflow-hidden rounded-lg border bg-card">
              <img src={image.image_url} alt={image.alt_text || "Hero carousel"} className="aspect-[4/3] w-full object-cover" />
              <div className="flex items-center justify-between gap-2 p-3">
                <span className="text-xs text-muted-foreground">Image {index + 1}</span>
                <div className="flex gap-1">
                  <Button aria-label="Move image up" size="icon" variant="outline" disabled={index === 0} onClick={() => reorder(image.id, -1)}><ArrowUp className="size-4" /></Button>
                  <Button aria-label="Move image down" size="icon" variant="outline" disabled={index === data.length - 1} onClick={() => reorder(image.id, 1)}><ArrowDown className="size-4" /></Button>
                  <Button aria-label="Delete image" size="icon" variant="outline" disabled={remove.isPending} onClick={() => { if (confirm("Remove this hero image?")) remove.mutate(image.id); }}><Trash2 className="size-4" /></Button>
                </div>
              </div>
            </div>
          ))}
          {(data ?? []).length === 0 && <p className="text-sm text-muted-foreground sm:col-span-2">No carousel images yet. The existing hero image remains visible until you add one.</p>}
        </div>
      )}
    </Card>
  );
}

function RowEditor({
  row, fields, table, onSaved, onDelete, onUp, onDown,
}: {
  row: Record<string, any>;
  fields: FieldDef[];
  table: string;
  onSaved: () => void;
  onDelete: () => void;
  onUp?: () => void;
  onDown?: () => void;
}) {
  const [form, setForm] = useState(row);
  const [open, setOpen] = useState(false);
  useEffect(() => setForm(row), [row]);
  const dirty = JSON.stringify(form) !== JSON.stringify(row);
  const itemTitle = row.name ?? row.label ?? row.patient_name ?? row.question ?? row.caption ?? row.platform ?? "Untitled item";

  const save = useMutation({
    mutationFn: async () => {
      const { id, created_at: _c, updated_at: _u, ...rest } = form;
      const { error } = await supabase.from(table as any).update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Saved"); onSaved(); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <Card className="overflow-hidden p-0">
      <Button
        type="button"
        variant="ghost"
        className="h-auto w-full justify-between rounded-none px-5 py-4 text-left"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="min-w-0 truncate">{itemTitle}</span>
        <span className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
          {typeof row.visible === "boolean" && (row.visible ? "Visible" : "Hidden")}
          <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </Button>
      {open && (
        <div className="border-t p-5">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((f) => (
              <FieldInput key={f.key} field={f} value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1">
              <Button aria-label="Move up" size="icon" variant="outline" disabled={!onUp} onClick={onUp}><ArrowUp className="size-4" /></Button>
              <Button aria-label="Move down" size="icon" variant="outline" disabled={!onDown} onClick={onDown}><ArrowDown className="size-4" /></Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onDelete}>
                <Trash2 className="mr-2 size-4" /> Delete
              </Button>
              <Button size="sm" disabled={!dirty || save.isPending} onClick={() => save.mutate()}>
                {save.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

/* ---------- Field input ---------- */
function FieldInput({ field, value, onChange }: { field: FieldDef; value: any; onChange: (v: any) => void }) {
  const t = field.type ?? "text";
  const wrap = (children: ReactNode) => (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      {children}
    </div>
  );
  if (t === "textarea") return wrap(<Textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} rows={4} />);
  if (t === "boolean")
    return (
      <div className="flex items-center justify-between rounded-lg border p-3">
        <Label>{field.label}</Label>
        <Switch checked={Boolean(value)} onCheckedChange={onChange} />
      </div>
    );
  if (t === "number") return wrap(<Input type="number" value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} />);
  if (t === "image") return wrap(<ImageInput value={value} onChange={onChange} />);
  if (t === "date") return wrap(<Input type="date" value={value ?? ""} onChange={(e) => onChange(e.target.value || null)} />);
  if (t === "array") {
    const str = Array.isArray(value) ? value.join(", ") : (value ?? "");
    return wrap(<Input value={str} placeholder={field.placeholder ?? "comma, separated, values"} onChange={(e) => {
      const arr = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
      onChange(arr);
    }} />);
  }
  return wrap(<Input type={t === "url" ? "url" : "text"} value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />);
}

function ImageInput({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-2">
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value || null)} placeholder="https://… or upload below" />
      <div className="flex items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-secondary">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setBusy(true);
              try {
                const url = await uploadMedia(file);
                onChange(url);
                toast.success("Uploaded");
              } catch (err: any) {
                toast.error(err.message);
              } finally {
                setBusy(false);
                e.target.value = "";
              }
            }}
          />
        </label>
        {value && <img src={value} alt="" className="size-16 rounded object-cover" />}
      </div>
    </div>
  );
}
