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
import { Loader2, Upload, Trash2, Plus, ArrowUp, ArrowDown } from "lucide-react";

type FieldType = "text" | "textarea" | "number" | "url" | "boolean" | "image";

export type FieldDef = {
  key: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
};

/* ---------- Singleton editor (one-row tables) ---------- */
export function SingletonEditor({
  table,
  queryKey,
  fields,
  title,
}: {
  table: string;
  queryKey: readonly string[];
  fields: FieldDef[];
  title: string;
}) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from(table as any).select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data as Record<string, any> | null;
    },
  });
  const [form, setForm] = useState<Record<string, any>>({});
  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const { id: _id, created_at: _c, updated_at: _u, ...rest } = form;
      const { error } = await supabase.from(table as any).update(rest).eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey });
      qc.invalidateQueries();
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <Card className="p-6">
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {fields.map((f) => (
          <FieldInput key={f.key} field={f} value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} />
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={() => save.mutate()} disabled={save.isPending}>
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
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: [...queryKey, "admin"] });
    qc.invalidateQueries({ queryKey });
    qc.invalidateQueries();
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
    await supabase.from(table as any).update({ display_order: swap.display_order }).eq("id", a.id);
    await supabase.from(table as any).update({ display_order: a.display_order }).eq("id", swap.id);
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
  useEffect(() => setForm(row), [row]);
  const dirty = JSON.stringify(form) !== JSON.stringify(row);

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
    <Card className="p-5">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((f) => (
          <FieldInput key={f.key} field={f} value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1">
          <Button size="icon" variant="outline" disabled={!onUp} onClick={onUp}><ArrowUp className="size-4" /></Button>
          <Button size="icon" variant="outline" disabled={!onDown} onClick={onDown}><ArrowDown className="size-4" /></Button>
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
